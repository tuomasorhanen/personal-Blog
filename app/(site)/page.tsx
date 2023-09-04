import { getProjects } from "@/sanity/sanity-utils"
import Image from 'next/image'
import Link from 'next/link'

export default async function Home() {
  const projects = await getProjects();

  return (
    <div>
      <h1 className="text-7xl font-extrabold">Meidän
        <span className="bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent"> Blogi!</span>
      </h1>
      <h2 className="mt-12 font-bold text-gray-700 text-3xl">Julkaisut</h2>

      <div className="mt-5 grid md:grid-cols-2 lg:grid-cols-3 gap-8">{projects.map((project) => (
        <Link href={`/projects/${project.slug}`} key={project._id} className=" shadow-md shadow-gray-500 rounded-lg hover:scale-105 transition">
          {project.image && (
            <div className="aspect-video overflow-hidden">
            <Image
              src={project.image}
              alt={project.name}
              width={754}
              height={375.172}
              className="object-cover rounded-t-lg"
              quality={90}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,..."

            />
            </div>
          )}
          <div className="p-2 font-bold">
            {project.name}
          </div>
        </Link>
      ))}
      </div>
    </div>
  )

}
