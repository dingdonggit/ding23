'use client'

import React from 'react'
import Container from '../Container'
import Logo from './Logo'
// import Search from './Search'
import UserMenu from './UserMenu'
import { SafeUser } from '@/app/types'
import Categories from './Categories'
import { useRouter } from 'next/navigation'

interface NavbarProps {
  currentUser?: SafeUser | null;
}


const Navbar: React.FC<NavbarProps> = ({
  currentUser,
}) => {
  const router = useRouter();
  return (
    <div className="fixed w-full bg-white z-40 shadow-sm px-10">
    <div className="py-4 border-b-[1px]">
        <Container>
          <div className=" flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            {/* <Search /> */}
            <UserMenu currentUser={currentUser}/>
          </div>
        </Container>
    </div>
    <section>
    <div className="flex flex-1 items-center justify-center space-x-2 text-gray-500">
        <ul className="hidden lg:space-x-4 lg:flex">
          <li
            className="headerLink  cursor-pointer"
            onClick={() => router.push("/about")}
          >
            About
          </li>
          <li
            className="headerLink  cursor-pointer"
            onClick={() => router.push("/properties")}
          >
            Properties
          </li>
          <li
            className="headerLink  cursor-pointer"
            onClick={() => router.push("/organizations")}
          >
            Organizations
          </li>
          <li
            className="headerLink  cursor-pointer"
            onClick={() => router.push("/individuals")}
          >
            Individuals
          </li>
        </ul>
      </div>
    </section>
    </div>
  )
}
export default Navbar;