'use client'
import {AiOutlineMenu} from "react-icons/ai"
import Avatar from "../Avatar"
import { useCallback, useState } from "react"
import MenuItem from "./MenuItem"
import useRegisterModal from "@/app/hooks/useRegisterModal"
import useLoginModal from "@/app/hooks/useLoginModal"
import { SafeUser } from "@/app/types";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import useCreateProjectModal from "@/app/hooks/useCreateProjectModal"

interface UserMenuProps {
  currentUser?: SafeUser | null
}


const UserMenu: React.FC<UserMenuProps> = ({
  currentUser
}) => {
    const router = useRouter();
    const loginModal = useLoginModal()
    const registerModal = useRegisterModal();
    const createProjectModal = useCreateProjectModal();
    const [isOpen, setIsOpen] = useState(false)
    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, [])

    const onCreateProject = useCallback(() => {
      if(!currentUser){
        return loginModal.onOpen();
      }
      createProjectModal.onOpen();
    }, [currentUser, loginModal, createProjectModal])
  return (
    <div className="relative">
        <div className="flex flex-row items-center gap-3">
          <div onClick={onCreateProject} className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
            Create a Project
          </div>
          <div onClick={toggleOpen} className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full hover:shadow-md transition">
                <AiOutlineMenu />
                <div className="hidden md:block">
                  <Avatar src={currentUser?.image} />
                </div>
           </div>
        </div>
        {isOpen && (
            <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem 
                  label="Collaboration Board" 
                  onClick={() => router.push('/collaborators')}
                />
                <MenuItem 
                  label="My Organizations" 
                  onClick={() => router.push('/organizations')}
                />
                <MenuItem 
                  label="My Individuals" 
                  onClick={() => router.push('/individuals')}
                />
                <MenuItem 
                  label="My properties" 
                  onClick={() => router.push('/properties')}
                />
               <MenuItem 
                  label="Create a project" 
                  onClick={createProjectModal.onOpen}
                />

               
                <hr />
                <MenuItem 
                  label="Logout" 
                  onClick={() => signOut()}
                />
              </>
            ) : (
              <>
                <MenuItem 
                  label="Login" 
                  onClick={loginModal.onOpen}
                />
                <MenuItem 
                  label="Sign up" 
                  onClick={registerModal.onOpen}
                />
              </>
            )}
          </div>
            </div>
        )}
    </div>
  );
}

export default UserMenu;