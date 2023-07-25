import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  icon: {
    position: 'fixed',
    right: rem(40),
    bottom: rem(40),

    [theme.fn.smallerThan('sm')]: {
        right: rem(25),
        bottom: rem(40)
    },
    zIndex: 10,
    textAlign: 'center',
    boxShadow: `0px 16px 8px -8px ${theme.fn.rgba(theme.colors.dark[9], 0.7)}`,
  },
}));
