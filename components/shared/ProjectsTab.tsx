import { redirect } from "next/navigation";

import { fetchOrganizationPosts } from "@/lib/actions/organization.action";
import { fetchUserProjects } from "@/lib/actions/user.actions";

import ProjectCard from "../cards/ProjectCard";

interface Result {
  name: string;
  image: string;
  id: string;
  projects: {
    _id: string;
    text: string;
    parentId: string | null;
    author: {
      name: string;
      image: string;
      id: string;
    };
    organization: {
      id: string;
      name: string;
      image: string;
    } | null;
    createdAt: string;
    children: {
      author: {
        image: string;
      };
    }[];
  }[];
}

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

async function ProjectsTab({ currentUserId, accountId, accountType }: Props) {
  let result: Result;

  if (accountType === "Community") {
    result = await fetchOrganizationPosts(accountId);
  } else {
    result = await fetchUserProjects(accountId);
  }

  if (!result) {
    redirect("/");
  }

  return (
    <section className='mt-9 flex flex-col gap-10'>
      {result.projects.map((project) => (
        <ProjectCard
          key={project._id}
          id={project._id}
          currentUserId={currentUserId}
          parentId={project.parentId}
          content={project.text}
          author={
            accountType === "User"
              ? { name: result.name, image: result.image, id: result.id }
              : {
                  name: project.author.name,
                  image: project.author.image,
                  id: project.author.id,
                }
          }
          organization={
            accountType === "Organization"
              ? { name: result.name, id: result.id, image: result.image }
              : project.organization
          }
          createdAt={project.createdAt}
          comments={project.children}
        />
      ))}
    </section>
  );
}

export default ProjectsTab;