import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import ProjectCard from "@/components/cards/ProjectCard";
import Pagination from "@/components/shared/Pagination";

import { fetchProjects } from "@/lib/actions/project.actions";
import { fetchUser } from "@/lib/actions/user.actions";

async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchProjects(
    searchParams.page ? +searchParams.page : 1,
    30
  );

  return (
    <>
      <h1 className='head-xl font-extrabold text-left'>Dashboard</h1>

      <section className='mt-9 flex flex-col gap-10'>
        {result.projects.length === 0 ? (
          <p className='no-result'>No projects found</p>
        ) : (
          <>
            {result.projects.map((project) => (
              <ProjectCard
                key={project._id}
                id={project._id}
                currentUserId={user.id}
                parentId={project.parentId}
                content={project.text}
                author={project.author}
                organization={project.organization}
                createdAt={project.createdAt}
                comments={project.children}
              />
            ))}
          </>
        )}
      </section>

      <Pagination
        path='/'
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </>
  );
}

export default Home;