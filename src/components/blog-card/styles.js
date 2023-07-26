import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  card: {
    display: 'flex',

    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',

    transition: 'transform 150ms ease, box-shadow 150ms ease',

    minWidth: rem(330),
    minHeight: rem(500),
    maxHeight: rem(550),
    borderRadius: theme.radius.md,

    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.white,
    cursor: 'pointer',

    '&:hover': {
      transform: 'scale(1.01)',
      boxShadow: theme.shadows.md,
    },
  },

  title: {
    marginTop: theme.spacing.md,
    marginBottom: rem(5),

    fontSize: rem(26),
    lineHeight: 1.35,
    fontWeight: 700,
    lineClamp: 2,
  },

  tagsWrapper: {
    marginTop: 'auto',
    paddingTop: rem(16),
  },

  tags: {
    borderRadius: theme.radius.sm,

    fontFamily: 'Inconsolata',
    fontWeight: 700,
  },
}));
