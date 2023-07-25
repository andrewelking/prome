import { SimpleGrid } from '@mantine/core';
import { type ReactNode } from 'react';

export default function CardsGrid({ children }: { children: ReactNode }) {
  return (
    <SimpleGrid
      cols={3}
      spacing="md"
      verticalSpacing="md"
      mb="xl"
      breakpoints={[
        { maxWidth: 'md', cols: 1 },
        { maxWidth: 'xl', cols: 2 },
      ]}>
      {children}
    </SimpleGrid>
  );
}
