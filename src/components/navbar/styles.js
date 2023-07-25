import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  navbar: {
    transition: 'all 0.3s ease',

    paddingTop: 0,
  },

  search: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',

      marginBottom: theme.spacing.md,

      opacity: 0,
      transition: 'opacity 0.3s',
    },
  },

  searchActive: {
    display: 'block',

    marginBottom: theme.spacing.md,

    opacity: 1,
    transition: 'opacity 0.3s',
  },

  themeIcon: {
    marginBottom: theme.spacing.md,

    [theme.fn.largerThan('sm')]: {
      display: 'flex',

      border: `1px solid ${theme.colors.gray[8]}`,

      backgroundColor: theme.colors.gray[9],
    },

    display: 'none',
  },

  themeIconActive: {
    display: 'none',
  },

  section: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
  },

  mainLinks: {
    paddingLeft: `calc(${theme.spacing.md} - ${theme.spacing.xs})`,
    paddingRight: `calc(${theme.spacing.md} - ${theme.spacing.xs})`,
  },

  mainLink: {
    transition: 'transform 0.0.3s ease',

    borderRadius: theme.radius.sm,
    padding: `${rem(8)} ${theme.spacing.sm}`,

    textDecoration: 'none',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    '&:hover': {
      transform: 'scale(1.05)',

      boxShadow: `0px 16px 8px -8px ${theme.fn.rgba(
        theme.colors.dark[9],
        0.7
      )}`,

      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],

      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  mainLinkText: {
    fontSize: theme.fontSizes.sm,
    fontWeight: 400,

    [theme.fn.largerThan('sm')]: {
      transition: 'all 0.3s',
      opacity: 0,
      translate: rem(-100),
    },
  },

  mainLinkTextActive: {
    opacity: 1,
    translate: rem(0),
    transition: 'all 0.3s',

    fontSize: theme.fontSizes.sm,
    fontWeight: 400,
  },

  icon: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
  },

  mainLinkBadge: {
    [theme.fn.largerThan('sm')]: {
      transition: 'all 0.3s',
      opacity: 0,
      translate: rem(-100),
    },

    width: rem(20),
    height: rem(20),
    padding: 0,

    pointerEvents: 'none',
  },

  mainLinkBadgeActive: {
    opacity: 1,
    translate: rem(0),
    transition: 'all 0.3s',

    width: rem(20),
    height: rem(20),
    padding: 0,

    pointerEvents: 'none',
  },

  categoriesLinks: {
    paddingLeft: `calc(${theme.spacing.md} - ${theme.spacing.xs})`,
    paddingRight: `calc(${theme.spacing.md} - ${theme.spacing.xs})`,
  },

  categoriesHeader: {
    minHeight: rem(18),
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    marginBottom: theme.spacing.xs,
  },

  categoriesHeaderText: {
    [theme.fn.largerThan('sm')]: {
      opacity: 0,
      translate: rem(-100),
      transition: 'all 0.3s',
    },
  },

  categoriesHeaderTextActive: {
    opacity: 1,
    translate: rem(0),
    transition: 'all 0.3s',
  },

  categoriesHeaderIcon: {
    display: 'none',

    color:
      theme.colorScheme === 'dark'
        ? theme.colors.gray[0]
        : theme.colors.gray[6],

    [theme.fn.largerThan('sm')]: {
      display: 'block',
      translate: rem(-73),
      transition: 'all 0.3s',
    },
  },

  categoriesHeaderIconActive: {
    display: 'none',

    color:
      theme.colorScheme === 'dark'
        ? theme.colors.gray[0]
        : theme.colors.gray[6],

    translate: rem(0),
    rotate: '-180deg',
    transition: 'all 0.3s',

    [theme.fn.largerThan('sm')]: {
      display: 'block',
    },
  },

  categoriesLink: {
    transition: 'transform 0.3s ease',

    borderRadius: theme.radius.sm,
    padding: `${rem(8)} ${theme.spacing.sm}`,

    textDecoration: 'none',
    lineHeight: 1,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    '&:hover': {
      transform: 'scale(1.05)',

      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],

      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  categoriesLinkText: {
    fontSize: theme.fontSizes.sm,
    fontWeight: 400,

    [theme.fn.largerThan('sm')]: {
      opacity: 0,
      translate: rem(-100),
      transition: 'all 0.3s',
    },
  },

  categoriesLinkTextActive: {
    opacity: 1,
    translate: rem(0),
    transition: 'all 0.3s',

    fontSize: theme.fontSizes.sm,
    fontWeight: 400,
  },

  footer: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  userInfo: {
    [theme.fn.largerThan('sm')]: {
      opacity: 0,
      translate: rem(-100),
      transition: 'all 0.3s',
    },
  },

  userInfoActive: {
    opacity: 1,
    translate: rem(0),
    transition: 'all 0.3s',
  },
}));
