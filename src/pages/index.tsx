import { Center, Group, Loader, Stack, Text, TextInput } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import { NavbarContext, NextPageWithLayout } from './_app';
import {
  ChangeEvent,
  ReactElement,
  useMemo,
  useState,
  useContext,
} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';

import CardsGrid from '@components/cards-grid/CardsGrid';
import CardSite from '@components/card-site/CardSite';
import Layout from '@components/layout/Layout';
import { inconsolata } from 'public/fonts/fonts';
import { SiteProps } from 'src/type';
import { useStyles } from '../styles/index_page';

const PAGE_COUNT = 20;

export async function getStaticProps() {
  const supabase = createPagesBrowserClient();
  const { data } = await supabase
    .from('sites')
    .select('*')
    .range(0, PAGE_COUNT - 1);

  function shuffleArray(array: any[]) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

  const randomizedArray = shuffleArray(data!);

  return { props: { sites: data } };
}

const IndexPage: NextPageWithLayout<{ sites: SiteProps[] }> = ({
  sites,
}: {
  sites: SiteProps[];
}) => {
  const { classes } = useStyles();

  const { isOpened } = useContext(NavbarContext);

  const supabase = createPagesBrowserClient();

  const [offset, setOffset] = useState<number>(1);
  const [loadedSites, setLoadedSites] = useState<SiteProps[]>(sites);
  const [hasMore, setHasMore] = useState<boolean>(sites.length === PAGE_COUNT);

  const [query, setQuery] = useState<string>('');
  const [debouncedQuery] = useDebouncedValue(query, 300);

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

    const { data } = await supabase.from('sites').select('*').range(from, to);

    return data as SiteProps[];
  }

  return (
    <>
      <Stack
        mb="xl"
        h="100%">
        <Group
          position="apart"
          className={isOpened ? classes.group : classes.groupWithoutNavbar}>
          <Text
            size={24}
            fw={700}
            className={inconsolata.className}>
            All ({cards.length})
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
          scrollThreshold={0.8}
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
