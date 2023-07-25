import { ActionIcon } from '@mantine/core';
import { IconChevronUp } from '@tabler/icons-react';
import { useState, useEffect } from 'react';

import { useStyles } from './styles'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const { classes } = useStyles();

  useEffect(() => {
    const toggleVisible = () => {
      const scrolled = window.pageYOffset;
      if (scrolled > 300) {
        setVisible(true);
      } else if (scrolled <= 300) {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisible);

    return () => {
      window.removeEventListener('scroll', toggleVisible);
    };
  }, []);

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <ActionIcon
      color="cyan"
      size="xl"
      radius="xl"
      variant="filled"
      className={classes.icon}
      style={{
        display: visible ? 'inline' : 'none',
      }}>
      <IconChevronUp
        size="2.125rem"
        onClick={scrollToTop}
      />
    </ActionIcon>
  );
}
