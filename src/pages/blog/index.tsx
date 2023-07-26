import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';

import BlogCard from '@components/blog-card/BlogCard';
import { BlogPost } from '../../type';
import NotionService from 'service/notion-service';
import MainHeader from '@components/main-header/MainHeader';
import CardsGrid from '@components/cards-grid/CardsGrid';
import { Container } from '@mantine/core';

const links = [
  {
    link: '/blog',
    label: 'Blog',
  },
];

export const getStaticProps: GetStaticProps = async () => {
  const notionService = new NotionService();
  const posts = await notionService.getPublishedBlogPosts();

  return {
    props: {
      posts,
    },
  };
};

const Home = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>Blog</title>
        <meta
          name={'description'}
          title={'description'}
          content={'Không gian bàn luận'}
        />
        <meta
          name={'og:title'}
          title={'og:title'}
          content={'Blog'}
        />
        <meta
          name={'og:description'}
          title={'og:description'}
          content={'Không gian bàn luận'}
        />
        <meta
          name={'og:image'}
          title={'og:image'}
          content={`https://prome-theus.vercel.app/assets/images/preview.png`}
        />
      </Head>

      <MainHeader links={links} />
      <Container
        py={16}
        fluid>
        <CardsGrid>
          {posts.map((post: BlogPost) => (
            <BlogCard
              key={post.id}
              post={post}
            />
          ))}
        </CardsGrid>
      </Container>
    </>
  );
};

export default Home;
