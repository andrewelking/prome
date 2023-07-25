import { Container } from '@mantine/core';
import { useState } from 'react';
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import { Auth } from '@supabase/auth-ui-react';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

import AuthenticationForm from '@components/auth/Auth';
import MainHeader from '@components/main-header/MainHeader';
import { useStyles } from './styles';
import supabase from '../../lib/supabaseClient';
import { plusJakartaSans } from 'public/fonts/fonts';

const links = [
  {
    link: '/blogs',
    label: 'Blogs',
  },
];

export const getServerSideProps = async (ctx: GetServerSidePropsContext | { req: NextApiRequest; res: NextApiResponse; }) => {
  const supabase = createPagesServerClient(ctx)
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }

  return {
    props: {
      initialSession: session,
    },
  }
}

export default function Login() {
  const { classes, cx } = useStyles();
  const supabaseClient = useSupabaseClient();

  const [opened, setOpened] = useState(false);

  const toggleNavbar = () => {
    setOpened(!opened);
  };

  return (
    <>
      <MainHeader
        toggleNavbar={toggleNavbar}
        links={links}
      />
      {/* <AuthenticationForm /> */}
      <Container className={cx(classes.container, plusJakartaSans.className)}>
        <Auth
          supabaseClient={supabaseClient}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                fonts: {
                  bodyFontFamily: '',
                  buttonFontFamily: '',
                  inputFontFamily: '',
                  labelFontFamily: '',
                },
              },
            },
          }}
          theme="dark"
          providers={['google', 'facebook', 'github']}
        />
      </Container>
    </>
  );
}
