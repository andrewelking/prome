import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    container: {
        border: `1px solid ${theme.colors.gray[9]}`,
        borderRadius: theme.radius.sm,

        [theme.fn.largerThan('sm')]: {
            minWidth: "50%",
            maxWidth: "50%",
        },

    }
}))