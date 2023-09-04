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

  const project = await client.fetch(
    groq`*[_type == "project" && name == $name][0]`,
    { name: blogPost.name }
  );

  const { content, name } = blogPost;

  if (project) {
    await client
      .patch(project._id)
      .set({ content, name })
      .commit();
    console.log("Project content updated.");
  } else {
    const newProject = {
      _type: 'project',
      content,
      name,
      slug: {
        _type: 'slug',
        current: name.toLowerCase().replace(/\s+/g, '-')
                   .replace(/ä/g, 'a')
                   .replace(/ö/g, 'o')
      }
    };
    await client.create(newProject);
    console.log("New project created.");
  }
}
