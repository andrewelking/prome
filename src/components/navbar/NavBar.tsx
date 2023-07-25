import {
  Navbar,
  Text,
  Group,
  Avatar,
  Stack,
  ScrollArea,
  Badge,
  Divider,
  ActionIcon,
} from '@mantine/core';
import {
  IconArrowBarToRight,
  IconBookmark,
  IconHeart,
} from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';

import { useStyles } from './styles';
import { categories } from 'src/data/categories';
import { type Classes } from 'src/type';
import { NavbarContext } from 'src/pages/_app';

type FooterProps = {
  classes: Classes;
  userAvatar: string;
  userFullname: string;
  userEmail: string;
  isOpened: boolean;
};

export default function NavBar({ opened }: { opened: boolean }) {
  const { classes, theme } = useStyles();

  const { isOpened, setIsOpened } = useContext(NavbarContext);

  const router = useRouter();
  const pathname = router.asPath.toLowerCase().slice(10);
  const trimmedPath = pathname.toLowerCase().replace(/\s+/g, '');
  const currentIndex = categories.findIndex(
    ({ label }) => label.toLowerCase().replace(/\s+/g, '') === trimmedPath
  );
  const activeIndex = currentIndex === -1 ? 0 : currentIndex;

  const [favoritesLength, setFavoritesLength] = useState<number>(0);
  const [bookmarksLength, setBookmarksLength] = useState<number>(0);
  const [favoritesState, setFavoritesState] = useState(false);
  const [bookmarksState, setBookmarksState] = useState(false);

  const [active, setActive] = useState(activeIndex);

  const user = useUser();
  const supabase = useSupabaseClient();

  //Subscribe to channels to listen to their changes
  supabase
    .channel('favorites')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'favorites' },
      () => {
        setFavoritesState(!favoritesState);
      }
    )
    .subscribe();

  supabase
    .channel('bookmarks')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'bookmarks' },
      () => {
        setBookmarksState(!bookmarksState);
      }
    )
    .subscribe();

  //get number of notifications
  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const { count: favorites } = await supabase
          .from('favorites')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', user!.id);
        const { count: bookmarks } = await supabase
          .from('bookmarks')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', user!.id);

        setFavoritesLength(favorites!);
        setBookmarksLength(bookmarks!);
      };

      fetchData();
    }
  }, [user, supabase, favoritesState, bookmarksState]);

  const userAvatar: string = user?.user_metadata.avatar_url;
  const userFullname: string = user?.user_metadata.name || user?.email;
  const userEmail: string = user?.user_metadata.email || user?.email;

  const links = [
    {
      icon: IconHeart,
      label: 'Favorites',
      notifications: favoritesLength,
      href: '/favorites',
    },
    {
      icon: IconBookmark,
      label: 'Bookmarks',
      notifications: bookmarksLength,
      href: '/bookmarks',
    },
  ];

  const mainLinks = links.map((link) => {
    const badgeClassName = isOpened
      ? classes.mainLinkBadgeActive
      : classes.mainLinkBadge;

    const textClassName = isOpened
      ? classes.mainLinkTextActive
      : classes.mainLinkText;

    return (
      <Link
        href={link.href}
        prefetch={false}
        key={link.label}
        className={classes.mainLink}>
        <Group
          position="apart"
          noWrap>
          <Group
            noWrap
            aria-label={link.label}>
            <link.icon
              className={classes.icon}
              stroke="1.5"
            />
            {isOpened ? (
              <Text className={textClassName}>{link.label}</Text>
            ) : null}
          </Group>
          {link.notifications && (
            <Badge
              size="sm"
              variant="filled"
              className={badgeClassName}>
              {link.notifications}
            </Badge>
          )}
        </Group>
      </Link>
    );
  });

  const categoriesLinks = categories.map((category, index) => {
    const isActive = active === index;

    const linkStyle = isActive
      ? {
          backgroundColor: theme.colors.cyan[6],
          color: theme.colors.dark[6],
        }
      : /\brouter.asPath\b/.test(
          category.label.toLowerCase().replace(/\s+/g, '')
        )
      ? {
          backgroundColor: theme.colors.cyan[6],
          color: theme.colors.dark[6],
        }
      : undefined;

    const iconStyle = isActive
      ? { color: theme.colors.dark[6] }
      : /\brouter.asPath\b/.test(
          category.label.toLowerCase().replace(/\s+/g, '')
        )
      ? { color: theme.colors.dark[6] }
      : undefined;

    const textClassName = isOpened
      ? classes.categoriesLinkTextActive
      : classes.categoriesLinkText;

    return (
      <Link
        href={
          category.label === 'All'
            ? '/'
            : `/category/${category.label.toLowerCase().replace(/\s+/g, '')}`
        }
        prefetch={false}
        onClick={() => {
          setActive(index);
        }}
        key={category.label}
        className={classes.categoriesLink}
        style={linkStyle}>
        <Group
          noWrap
          aria-label={category.label}>
          <category.icon
            className={classes.icon}
            stroke="1.5"
            style={iconStyle}
          />
          {isOpened ? (
            <Text className={textClassName}>{category.label}</Text>
          ) : null}
        </Group>
      </Link>
    );
  });

  return (
    <Navbar
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: isOpened ? 300 : 60 }}
      p="md"
      withBorder={false}
      className={classes.navbar}>
      {/* <Navbar.Section>
        <TextInput
          placeholder="Search"
          size="xs"
          icon={<IconSearch size={16} />}
          rightSectionWidth={70}
          rightSection={<Code>Ctrl + K</Code>}
          styles={{ rightSection: { pointerEvents: 'none' } }}
          onChange={(event) => setQuery(event.target.value)}
          className={isOpened ? classes.searchActive : classes.search}
        />
        <ThemeIcon
          variant="light"
          color="gray.6"
          size={30}
          className={isOpened ? classes.themeIconActive : classes.themeIcon}>
          <IconSearch size={16} />
        </ThemeIcon>
      </Navbar.Section> */}

      <Navbar.Section className={classes.section}>
        <Stack
          spacing={0}
          className={classes.mainLinks}>
          {mainLinks}
        </Stack>
      </Navbar.Section>

      <Divider my="md" />

      <Navbar.Section className={classes.section}>
        <Group
          className={classes.categoriesHeader}
          position="apart"
          noWrap>
          <Text
            size="xs"
            fw={500}
            color="dimmed"
            className={
              isOpened
                ? classes.categoriesHeaderTextActive
                : classes.categoriesHeaderText
            }>
            Categories
          </Text>
          <ActionIcon
            className={
              isOpened
                ? classes.categoriesHeaderIconActive
                : classes.categoriesHeaderIcon
            }
            aria-label="collapse button"
            onClick={() => {
              setIsOpened(!isOpened);
            }}>
            <IconArrowBarToRight />
          </ActionIcon>
        </Group>
      </Navbar.Section>

      <Navbar.Section
        className={classes.section}
        grow
        component={ScrollArea}>
        <Stack
          spacing={0}
          className={classes.categoriesLinks}>
          {categoriesLinks}
        </Stack>
      </Navbar.Section>

      <Divider my="md" />

      <Navbar.Section className={classes.section}>
        <Footer
          classes={classes}
          userAvatar={userAvatar}
          userFullname={userFullname}
          userEmail={userEmail}
          isOpened={isOpened}
        />
      </Navbar.Section>
    </Navbar>
  );
}

function Footer({
  classes,
  userAvatar,
  userFullname,
  userEmail,
  isOpened,
}: FooterProps) {
  return (
    <Group
      className={classes.footer}
      noWrap>
      <Avatar
        src={userAvatar}
        size="sm"
        radius="xl"
        aria-label="user avatar"
      />
      <Stack
        spacing={0}
        mih={40}
        className={isOpened ? classes.userInfoActive : classes.userInfo}>
        {isOpened ? (
          <>
            <Text
              fz="sm"
              fw={700}
              truncate>
              {userFullname || 'Guest'}
            </Text>
            <Text
              fz="xs"
              color="dimmed"
              truncate>
              {userEmail || 'Logged out'}
            </Text>
          </>
        ) : null}
      </Stack>
    </Group>
  );
}
