import { MdStringObject } from "notion-to-md/build/types";

type CardSite = {
  id: number;
  image: string;
  url: string;
  title: string;
  description: string;
  tags: string[];
  editors_choice: boolean;
};

type Classes = Record<string, string>;

type LinkProps = {
  link: string;
  label: string;
};

type SiteProps = {
  id: number;
  image: string;
  url: string;
  title: string;
  description: string;
  tags: string[];
  categories: string[];
  editors_choice: boolean;
};

type Tag = {
  color: string;
  id: string;
  name: string;
};

type BlogPost = {
  id: string;
  slug: string;
  cover: string;
  title: string;
  tags: Tag[];
  description: string;
  date: string;
};

type PostPage = {
  post: BlogPost;
  markdown: MdStringObject;
};

export type {
  CardSite,
  Classes,
  LinkProps,
  SiteProps,
  Tag,
  BlogPost,
  PostPage,
};
