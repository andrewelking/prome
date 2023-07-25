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
import { SiteProps } from 'src/type';
import { inconsolata } from 'public/fonts/fonts';

export const getServerSideProps = async (
  ctx: GetServerSidePropsContext | { req: NextApiRequest; res: NextApiResponse }
) => {
  const supabase = createPagesServerClient(ctx);

  const { data } = await supabase.from('favorites').select(`sites(*)`);

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
  const favorites: any[] = [];
  data?.data.map((site: FavoriteSitesProps) => favorites.push(site!.sites));

  const cards = favorites?.map((site) => {
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
          Favorites ({favorites?.length ?? 0})
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
