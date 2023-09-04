import { Content } from "@/components/Content";
import { getProject } from "@/sanity/sanity-utils";
import { PortableText } from '@portabletext/react';
import Image from "next/image"

type Props = {
  params: { project: string }
}

export default async function Project({ params }: Props) {
  const slug = params.project;
  const project = await getProject(slug);

  console.log(project);

  return <div>
    <Content content={project.content} />
  </div>
} 