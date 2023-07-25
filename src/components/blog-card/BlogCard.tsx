import {
  Card,
  Group,
  Image,
  Text,
  Title,
  Badge,
  Divider,
  Button,
  ActionIcon,
  Grid,
  Flex,
  MantineTheme,
  Tooltip,
} from '@mantine/core';
import Link from 'next/link';

import { BlogPost, Classes, Tag } from '../../type';
import { useStyles } from './styles';
import { inconsolata, plusJakartaSans } from 'public/fonts/fonts';

type BlogCardProps = {
  post: BlogPost;
};

type CardImageProps = {
  src: string;
  title: string;
};

type TagsProps = {
  classes: Classes;
  cx: (...args: any) => string;
  tags: Tag[];
};

const BlogCard = ({ post }: BlogCardProps) => {
  const { classes, cx } = useStyles();

  return (
    <Link
      href={`/blog/post/${post.slug}`}
      style={{ textDecoration: 'none' }}>
      <Card
        withBorder
        pt={0}
        className={classes.card}>
        <CardImage
          src={post.cover}
          title={post.title}
        />

        <Group
          position="apart"
          align="start"
          noWrap>
          <Title className={cx(classes.title, inconsolata.className)}>
            {post.title}
          </Title>
        </Group>

        <Text
          fz="sm"
          color="dimmed"
          lineClamp={4}
          className={plusJakartaSans.className}>
          {post.description}
        </Text>

        <Tags
          classes={classes}
          cx={cx}
          tags={post.tags}
        />
      </Card>
    </Link>
  );
};

function CardImage({ src, title }: CardImageProps) {
  return (
    <Card.Section>
      <Image
        src={src}
        alt={title}
        height={250}
        withPlaceholder
        placeholder={
          <Image
            src="../assets/images/404.png"
            alt="placeholder"
            width={350}
          />
        }
        imageProps={{ loading: 'lazy' }}
      />
    </Card.Section>
  );
}

function Tags({ classes, cx, tags }: TagsProps) {
  return (
    <Group
      spacing="xs"
      className={classes.tagsWrapper}>
      {tags.map((tag) => {
        return (
          <Badge
            key={tag.id}
            size="md"
            className={cx(classes.tags, inconsolata.className)}>
            #{tag.name}
          </Badge>
        );
      })}
    </Group>
  );
}

export default BlogCard;
