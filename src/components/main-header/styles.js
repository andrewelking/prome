import { createStyles, rem } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
    header: {
      paddingLeft: theme.spacing.md,
      paddingRight: theme.spacing.md,
    },
  
    inner: {
      height: rem(56),
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    burger: {
      [theme.fn.largerThan('sm')]: {
        display: 'none'
      }
    },
  
    logo: {
      display: 'block',
      lineHeight: 1,
      textDecoration: 'none',
      color:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[0]
          : theme.colors.gray[7],
      fontSize: theme.fontSizes.xl,
      fontWeight: 700,
      fontFamily: 'Inconsolata',
    },
  
    // links: {
    //   [theme.fn.smallerThan('xs')]: {
    //     display: 'none',
    //   },
    // },
  
    link: {
      display: 'block',
      lineHeight: 1,
      padding: `${rem(8)} ${rem(12)}`,
      borderRadius: theme.radius.sm,
      textDecoration: 'none',
      color:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[0]
          : theme.colors.gray[7],
      fontSize: theme.fontSizes.sm,
      fontWeight: 500,
      [theme.fn.smallerThan('xs')]: {
        display: 'none',
      },
  
      '&:hover': {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
      },
    },
  }));