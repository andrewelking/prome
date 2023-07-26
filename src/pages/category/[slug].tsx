import { Center, Group, Loader, Stack, Text, TextInput } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import { NextPageWithLayout } from '../_app';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ChangeEvent, ReactElement, useEffect, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ParsedUrlQuery } from 'querystring';
import { SupabaseClient } from '@supabase/auth-helpers-nextjs';

import { categories } from 'src/data/categories';
import CardSite from '@components/card-site/CardSite';
import CardsGrid from '@components/cards-grid/CardsGrid';
import Layout from '@components/layout/Layout';
import supabase from 'src/lib/supabaseClient';
import { inconsolata } from 'public/fonts/fonts';
import { SiteProps } from 'src/type';
import { useStyles } from '../../styles/category';

const PAGE_COUNT = 20;

interface Params extends ParsedUrlQuery {
  slug: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = categories.map((category) => ({
    params: { slug: category.label.toLowerCase().replace(/\s+/g, '') },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as Params;

  const supabaseClient: SupabaseClient = supabase;
  const { data: sites } = await supabaseClient
    .from('sites')
    .select('*')
    .contains('categories', [slug])
    .range(0, PAGE_COUNT - 1);

  return {
    props: {
      sites: sites,
      slug: slug,
    },
  };
};

const IndexPage: NextPageWithLayout<{ sites: SiteProps[]; slug: string }> = ({
  sites,
  slug,
}: {
  sites: SiteProps[];
  slug: string;
}) => {
  const { classes } = useStyles();

  const router = useRouter();

  const [offset, setOffset] = useState<number>(1);
  const [loadedSites, setLoadedSites] = useState<SiteProps[]>(sites);
  const [query, setQuery] = useState<string>('');
  const [debouncedQuery] = useDebouncedValue(query, 300);

  const category = categories.find(
    (category) => category.label.toLowerCase().replace(/\s+/g, '') === slug
  );

  const filteredSites = useMemo(() => {
    return loadedSites.filter((site) => {
      if (debouncedQuery === 'ec') {
        return site.editors_choice;
      }

      return (
        site.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        site.description.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        site.url.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        site.tags
          .toLocaleString()
          .toLowerCase()
          .includes(debouncedQuery.toLowerCase())
      );
    });
  }, [debouncedQuery, loadedSites]);

  const [hasMore, setHasMore] = useState<boolean>(
    filteredSites.length >= PAGE_COUNT
  );

  const cards = filteredSites.map((site) => (
    <CardSite
      key={site.id}
      query={debouncedQuery}
      {...site}
    />
  ));

  function handleQueryChange(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
    setHasMore(event.target.value.length === 0);
  }

  async function handleLoadMore() {
    setOffset((prev) => prev + 1);
    const newSites = await fetchSites(offset);
    setLoadedSites((prevSites) => [...prevSites, ...newSites]);
    setHasMore(newSites.length === PAGE_COUNT);
  }

  async function fetchSites(offset: number): Promise<SiteProps[]> {
    const from = offset * PAGE_COUNT;
    const to = from + PAGE_COUNT - 1;

    const { data } = await supabase
      .from('sites')
      .select('*')
      .contains('categories', [slug])
      .range(from, to);

    return data as SiteProps[];
  }

  useEffect(() => {
    setLoadedSites(sites);

    setQuery('');

    setHasMore(sites.length >= PAGE_COUNT);
  }, [router.query.slug, sites]);

  return (
    <>
      <Head>
        <title>{category!.label}</title>
      </Head>
      <Stack
        mb="xl"
        h="100%">
        <Group
          position="apart"
          className={classes.group}>
          <Text
            size={24}
            fw={700}
            className={inconsolata.className}>
            {category!.label} ({cards.length})
          </Text>
          <TextInput
            placeholder={`Try "ec"`}
            size="sm"
            variant="filled"
            icon={<IconSearch size={16} />}
            onChange={handleQueryChange}
          />
        </Group>
        <InfiniteScroll
          dataLength={loadedSites.length}
          next={handleLoadMore}
          hasMore={hasMore}
          scrollableTarget="stack"
          scrollThreshold={0.6}
          loader={
            <Center mt="sm">
              <Loader variant="dots" />
            </Center>
          }
          endMessage={<></>}
          className={classes.infiniteScroll}
          style={{ overflowX: 'hidden' }}>
          <CardsGrid>{cards}</CardsGrid>
        </InfiniteScroll>
      </Stack>
    </>
  );
};

IndexPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default IndexPage;
