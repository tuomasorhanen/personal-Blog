import { PortableTextBlock } from "sanity"

export type Page = {
  textColor: string;
  _id: string,
  _createdAt: Date,
  title: string,
  slug: string,
  content: PortableTextBlock[]
};

export type Project = {
  _id: string;
  _createdAt: Date;
  _updatedAt: Date;
  name: string;
  slug: string;
  image: string;
  url: string;
  content: PortableTextBlock[];
}