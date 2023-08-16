import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import Comment from "@/components/forms/Comment";
import ProjectCard from "@/components/cards/ProjectCard";

import { fetchUser } from "@/lib/actions/user.actions";
import { fetchProjectById } from "@/lib/actions/project.actions";

export const revalidate = 0;

async function page({ params }: { params: { id: string } }) {
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const project = await fetchProjectById(params.id);

  return (
    <section className='relative'>
      <div>
        <ProjectCard
          id={project._id}
          currentUserId={user.id}
          parentId={project.parentId}
          content={project.text}
          author={project.author}
          organization={project.organization}
          createdAt={project.createdAt}
          comments={project.children}
        />
      </div>

      <div className='mt-7'>
        <Comment
          threadId={params.id}
          currentUserImg={user.imageUrl}
          currentUserId={JSON.stringify(userInfo._id)}
        />
      </div>

      <div className='mt-10'>
        {project.children.map((childItem: any) => (
          <ProjectCard
            key={childItem._id}
            id={childItem._id}
            currentUserId={user.id}
            parentId={childItem.parentId}
            content={childItem.text}
            author={childItem.author}
            organization={childItem.organization}
            createdAt={childItem.createdAt}
            comments={childItem.children}
            isComment
          />
        ))}
      </div>
    </section>
  );
}

export default page;