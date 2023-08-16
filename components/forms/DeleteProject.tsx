"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { deleteProject } from "@/lib/actions/project.actions";

interface Props {
    projectId: string;
  currentUserId: string;
  authorId: string;
  parentId: string | null;
  isComment?: boolean;
}

function DeleteProject({
 projectId,
  currentUserId,
  authorId,
  parentId,
  isComment,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();

  if (currentUserId !== authorId || pathname === "/AuthHome") return null;

  return (
    <Image
      src='/assets/delete.svg'
      alt='delte'
      width={18}
      height={18}
      className='cursor-pointer object-contain'
      onClick={async () => {
        await deleteProject(JSON.parse(projectId), pathname);
        if (!parentId || !isComment) {
          router.push("/AuthHome");
        }
      }}
    />
  );
}

export default DeleteProject;