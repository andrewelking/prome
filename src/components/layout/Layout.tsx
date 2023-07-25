import { AppShell } from '@mantine/core';
import { useState, type ReactNode } from 'react';

import NavBar from '@components/navbar/NavBar';
import MainHeader from '@components/main-header/MainHeader';

const links = [
  {
    link: '/blog',
    label: 'Blog',
  },
];

export default function Layout({ children }: { children: ReactNode }) {
  const [opened, setOpened] = useState(false);

  const toggleNavbar = () => {
    setOpened(!opened);
  };

  return (
    <AppShell
      navbar={<NavBar opened={opened}></NavBar>}
      header={
        <MainHeader
          links={links}
          toggleNavbar={toggleNavbar}></MainHeader>
      } styles={{ main: { height: "100vh" }}}>
      {children}
    </AppShell>
  );
}
