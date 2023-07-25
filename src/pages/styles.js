import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  group: {
    position: 'fixed',
    zIndex: 10,
    top: rem(56),
    left: `calc(${rem(300)})`,
    right: 0,
    backgroundColor: theme.colors.dark[7],
    padding: theme.spacing.md,

    [theme.fn.smallerThan('sm')]: {
      left: 0,
    },
  },

  groupWithoutNavbar: {
    position: 'fixed',
    zIndex: 10,
    top: rem(56),
    left: rem(60),
    right: 0,
    backgroundColor: theme.colors.dark[7],
    padding: theme.spacing.md,

    [theme.fn.smallerThan('sm')]: {
      left: 0,
    },
  },

  infiniteScroll: {
    marginTop: rem(56),
  },
}));
