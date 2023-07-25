import { Stack, Text } from '@mantine/core';
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import { NextPageWithLayout } from '../_app';
import { ReactElement } from 'react';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';

import CardsGrid from '@components/cards-grid/CardsGrid';
import CardSite from '@components/card-site/CardSite';
import Layout from '@components/layout/Layout';
import { inconsolata } from 'public/fonts/fonts';
import { SiteProps } from 'src/type';

export const getServerSideProps = async (
  ctx: GetServerSidePropsContext | { req: NextApiRequest; res: NextApiResponse }
) => {
  const supabase = createPagesServerClient(ctx);

  const { data } = await supabase.from('bookmarks').select(`sites(*)`);

  return {
    props: {
      data: data,
    },
  };
};

type FavoriteSitesProps = {
  sites: SiteProps
}

const IndexPage: NextPageWithLayout = (data: any) => {
  const bookmarks: any[] = [];
  data?.data.map((site: FavoriteSitesProps) => bookmarks.push(site.sites));

  const cards = bookmarks?.map((site) => {
    return (
      <CardSite
        key={site.id}
        {...site}
      />
    );
  });

  return (
    <>
      <Stack mb="xl">
        <Text
          size={24}
          fw={700}
          className={inconsolata.className}>
          Bookmarks ({bookmarks?.length ?? 0})
        </Text>
        <CardsGrid>{cards}</CardsGrid>
      </Stack>
    </>
  );
};

IndexPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default IndexPage;
