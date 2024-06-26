import { createClient, groq } from "next-sanity";
import clientConfig from './config/client-config';
import { Page, Project } from "@/types/Types";

export async function getProjects(): Promise<Project[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "project"]{
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      "image": image.asset->url,
      url,
      content
    }`
  );
}

export async function getProject(slug: string): Promise<Project> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "project" && slug.current == $slug][0]{
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      "image": image.asset->url,
      url,
      content[]{
        ...,
        _type == "image" => {
          "asset": asset->url
        },
      }
    }`,
    { slug }
  );
}

export async function updateProjectContent(blogPost: { content: any[], name: string }) {
  const client = createClient(clientConfig);

  const projects = await client.fetch(
    groq`*[_type == "project" && name == $name]`,
    { name: blogPost.name }
  );

  if (projects.length > 0) {
    await Promise.all(projects.map((project: { _id: string; }) => client.delete(project._id)));
    console.log("Existing projects with the same name deleted.");
  }

  const newProject = {
    _type: 'project',
    content: blogPost.content,
    name: blogPost.name,
    slug: {
      _type: 'slug',
      current: blogPost.name.toLowerCase().replace(/\s+/g, '-')
                 .replace(/ä/g, 'a')
                 .replace(/ö/g, 'o')
    }
  };

  await client.create(newProject);
  console.log("New project created.");
}


export async function deleteProject(id: string) {
  const client = createClient(clientConfig);
  await client.delete(id);
}

