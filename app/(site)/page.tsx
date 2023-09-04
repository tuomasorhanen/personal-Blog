"use client";
import { useEffect, useState } from 'react';
import { getProjects, deleteProject } from "@/sanity/sanity-utils";
import Link from 'next/link';
import { Project } from "@/types/Types";

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const fetchData = async () => {
      const proj = await getProjects();
      const sortedProjects = sortProjects(proj, sortOrder);
      setProjects(sortedProjects);
    };

    fetchData();
  }, [sortOrder]);

  const sortProjects = (projects: Project[], order: 'asc' | 'desc') => {
    return [...projects].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return order === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    });
  };

  const handleSortToggle = () => {
    setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await deleteProject(id);
      setProjects(projects.filter(project => project._id !== id));
    }
  };

  return (
    <div>
      <h2 className="font-bold text-3xl">Julkaisut</h2>
      <label htmlFor="sortOrder">Sort by: </label>
      <select id="sortOrder" value={sortOrder} onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}>
        <option value="asc">Oldest</option>
        <option value="desc">Newest</option>
      </select>
      <div className="mt-5">
        {projects.map((project) => (
          <div key={project._id} className="pb-2 border-b text-xl flex justify-between">
            <Link href={`/projects/${project.slug}`}>
              <div className="hover:scale-105">
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
