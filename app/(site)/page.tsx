"use client";
import { useEffect, useState } from 'react';
import { getProjects, deleteProject } from "@/sanity/sanity-utils";
import Link from 'next/link';
import { Project } from "@/types/Types";  // Import the Project type

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);  // Add type annotation

  useEffect(() => {
    const fetchData = async () => {
      const proj = await getProjects();
      setProjects(proj);
    };

    fetchData();
  }, []);

  const handleDelete = async (id: string) => {  // Add type annotation for id
    if (window.confirm('Are you sure you want to delete this post?')) {
      await deleteProject(id);
      setProjects(projects.filter(project => project._id !== id));
    }
  };

  return (
    <div>
      <h2 className="font-bold text-3xl">Julkaisut</h2>
      <div className="mt-5">
        {projects.map((project) => (
          <div key={project._id} className="pb-2 border-b text-xl flex justify-between">
            <Link href={`/projects/${project.slug}`}>
              <div className="hover:scale-105 text-black hover:underline underline-black">
                {project.name}
              </div>
            </Link>
            <button className='hover:scale-110' onClick={() => handleDelete(project._id)}>X</button>
          </div>
          
        ))}
      </div>
    </div>
  );
}
