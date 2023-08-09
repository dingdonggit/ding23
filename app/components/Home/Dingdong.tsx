
"use client"
import Image from "next/image"
import Link from "next/link"
import youtubeExplainer from "@/public/images/youtube-explainer.jpg"
import Button from "../Button"
import { useRouter } from "next/navigation"

const Dingdong = () => {
    const router = useRouter();
  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 max-w-7xl justify-between py-20 pt-32 pb-10 gap-2 mx-auto mt-10 mb-10">
    <div className="flex flex-col relative">
      <div className="absolute top-0 right-20 w-40 h-40 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob opacity-50"></div>
      <div className="absolute left-20 bottom-10 w-60 h-60 bg-red-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000 opacity-50"></div>
      <div className="absolute bottom-0 left-1 w-40 h-40 bg-sky-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000 opacity-50"></div>
      <div className="flex w-96 relative sm:left-12 rounded-lg h-64">
        <Image
          src={youtubeExplainer}
          alt="How to use DingDong"
          layout="fill"
          objectFit="cover"
          className="p-1 cursor-pointer rounded-lg order-sky-400 hover:scale-95 hover:shadow-lg transition transform duration-100 ease-out"
        />
      </div>
    </div>
    <div className="flex flex-col relative p-5">
      <h1 className="text-2xl font-black text-gray-500 my-2">DingDong</h1>
      <p className="py-5">
      Offers a solution to ALL Real Estate related businesses by bringing together that latest technology in Blockchain and AI in order to increase transparency, efficiency, and productivity
      </p>
      <p className="px-10">
      <Button label={"Watch Video"} 
        onClick={() => router.push("/about")} 
        /></p>
       
 
    </div>
     </div>
  )
}

export default Dingdong