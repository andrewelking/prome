import { Header, Group, Burger, Image, Text, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  Session,
  SupabaseClient,
  useSession,
  useSupabaseClient,
} from '@supabase/auth-helpers-react';
import Link from 'next/link';
import { useRouter } from 'next/router.js';

import { useStyles } from './styles.js';
import { type Classes, LinkProps } from 'src/type.js';
import { inconsolata } from 'public/fonts/fonts';

type HeaderProps = {
  links: LinkProps[];
  toggleNavbar?: () => void;
};

async function handleLogOut(supabase: SupabaseClient) {
  const { error } = await supabase.auth.signOut();
  location.reload();

  if (error) {
    console.log(error);
  }
}

export default function MainHeader({ links, toggleNavbar }: HeaderProps) {
  const { classes } = useStyles();

  const router = useRouter();

  const [opened, { toggle }] = useDisclosure(false);
  const label = opened ? 'Close navigation' : 'Open navigation';

  const supabase: SupabaseClient = useSupabaseClient();
  const session: Session | null = useSession();

  function handleBurgerClick() {
    toggle();

    if (!toggleNavbar) {
    } else {
      toggleNavbar();
    }
  }

  return (
    <Header
      height={56}
      className={classes.header}>
      <div className={classes.inner}>
        <Group>
          {router.pathname === '/login' ? null : (
            <Burger
              opened={opened}
              onClick={handleBurgerClick}
              size="sm"
              aria-label={label}
              className={classes.burger}
            />
          )}
          <Logo classes={classes} />
        </Group>

        <Group spacing={5}>
          <Links
            classes={classes}
            links={links}
          />
          <UserAuthentication
            session={session}
            supabase={supabase}
          />
        </Group>
      </div>
    </Header>
  );
}

function Logo({ classes }: { classes: Classes }) {
  return (
    <Link
      href="/"
      className={classes.logo}>
      <Group>
        <Image
          width={25}
          height={25}
          src="/assets/images/logo.png"
          alt="logo"
        />
        <Text
          aria-label="brand"
          className={inconsolata.className}>
          Prome
        </Text>
      </Group>
    </Link>
  );
}

function Links({ classes, links }: { classes: Classes; links: LinkProps[] }) {
  return (
    <>
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.link}
          className={classes.link}>
          {link.label}
        </Link>
      ))}
    </>
  );
}

function UserAuthentication({
  supabase,
  session,
}: {
  supabase: SupabaseClient<any, 'public', any>;
  session: Session | null;
}) {
  return <Group>{session ? <SignedIn /> : <SignedOut />}</Group>;
  

  function SignedIn() {
    return (
      <Button
        color="cyan"
        onClick={() => handleLogOut(supabase)}>
        Log out
      </Button>
    );
  }

  function SignedOut() {
    return (
      <Group spacing="xs">
        <Link href="login">
          <Button>Log in</Button>
        </Link>
      </Group>
    );
  }
}
