import { Container, Image } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import ReactMarkdown from 'react-markdown';
import NotionService from 'service/notion-service';
import rehypeHighlight from 'rehype-highlight'
import "highlight.js/styles/base16/dracula.css";

import MainHeader from '@components/main-header/MainHeader';

const links = [
  {
    link: '/blog',
    label: 'Blog',
  },
];

export const getStaticProps: GetStaticProps = async (context) => {
  const notionService = new NotionService();

  // @ts-ignore
  const p = await notionService.getSingleBlogPost(context.params?.slug);

  if (!p) {
    throw '';
  }

  return {
    props: {
      markdown: p.markdown,
      post: p.post,
    },
  };
};

export async function getStaticPaths() {
  const notionService = new NotionService();

  const posts = await notionService.getPublishedBlogPosts();

  const paths = posts.map((post) => {
    return `/blog/post/${post.slug}`;
  });

  return {
    paths,
    fallback: false,
  };
}

const Post = ({
  markdown,
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  console.log(markdown.parent);
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta
          name={'description'}
          title={'description'}
          content={post.description}
        />
        <meta
          name={'og:title'}
          title={'og:title'}
          content={post.title}
        />
        <meta
          name={'og:description'}
          title={'og:description'}
          content={post.description}
        />
        <meta
          name={'og:image'}
          title={'og:image'}
          content={post.cover}
        />
      </Head>
      
      <MainHeader links={links} />
      <Container size="sm" mt="xl" mb="xl">
        <Image src={post.cover} alt="cover" />
        <article>
          <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{markdown.parent}</ReactMarkdown>
        </article>
      </Container>
    </>
  );
};

export default Post;
