import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import {
  useState,
  type ReactElement,
  type ReactNode,
  createContext,
  Dispatch,
  SetStateAction,
} from 'react';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';

import { plusJakartaSans } from 'public/fonts/fonts';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const ScrollToTop = dynamic(
  () => import('src/components/scroll-to-top/ScrollToTop'),
  { ssr: false }
);

const RouterTransition = dynamic(
  () => import('src/components/router-transition/RouterTransition'),
  { ssr: false }
);

export const NavbarContext = createContext<{
  isOpened: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
}>({ isOpened: true, setIsOpened: () => {} });

export default function App(props: AppPropsWithLayout) {
  const { Component, pageProps } = props;
  const getLayout = Component.getLayout || ((page) => page);
  const [supabaseClient] = useState(() => createPagesBrowserClient());

  const [isOpened, setIsOpened] = useState(true);

  return (
    <>
      <Head>
        <title>Prome</title>
        <meta
          name={'description'}
          title={'description'}
          content={'Tổng hợp website cho phát triển và thiết kế web'}
        />
        <link
          rel="shortcut icon"
          href="/assets/favicon.png"
        />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta
          name={'og:title'}
          title={'og:title'}
          content={'Prome'}
        />
        <meta
          name={'og:description'}
          title={'og:description'}
          content={'Tổng hợp website cho phát triển và thiết kế web'}
        />
        <meta
          name={'og:image'}
          title={'og:image'}
          content={`https://prome-theus.vercel.app/assets/images/preview.png`}
        />
      </Head>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'dark',
          primaryColor: 'cyan',
          primaryShade: 9,
          globalStyles: (theme) => ({
            '&::-webkit-scrollbar': {
              backgroundColor: theme.colors.dark[7],
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: theme.colors.dark[4],
              borderRadius: theme.radius.lg,
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: theme.colors.dark[5],
            },
          }),
        }}>
        <RouterTransition />
        <Notifications
          limit={5}
          position="bottom-center"
          autoClose={1500}
        />
        <ScrollToTop />
        <SessionContextProvider
          supabaseClient={supabaseClient}
          initialSession={pageProps.initialSession}>
          <NavbarContext.Provider value={{ isOpened, setIsOpened }}>
            {getLayout(
              <Component
                {...pageProps}
                className={plusJakartaSans.className}
              />
            )}
          </NavbarContext.Provider>
        </SessionContextProvider>
      </MantineProvider>
    </>
  );
}
