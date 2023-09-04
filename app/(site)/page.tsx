import { getProjects } from "@/sanity/sanity-utils"
import Image from 'next/image'
import Link from 'next/link'

export default async function Home() {
  const projects = await getProjects();

  return (
    <div>
      <h2 className=" font-bold text-gray-700 text-3xl border-b-2 border-gray-500">Julkaisut</h2>

      <div className="mt-5 grid">{projects.map((project) => (
        <Link href={`/projects/${project.slug}`} key={project._id} className="hover:scale-105">
          <div className="text-xl">
            {project.name}
          </div>
        </Link>
      ))}
      </div>
    </div>
  )

}
