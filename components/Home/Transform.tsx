'use client'
import Image from "next/image";
import Button from "../Button";
import youtubeExplainer2 from "@/public/images/youtube-explainer2.jpg"
import { useRouter } from "next/navigation";


const Transform = () => {
   const router = useRouter();
  return (
    <div className="flex w-full py-20 bg-sky-200">
    <div
      className="relative grid grid-cols-1 md:grid-cols-2 max-w-7xl justify-between px-10 gap-8 mx-auto mb-10 "
    
    >
      <div className="flex flex-col relative border-0">
        <div className="absolute top-0 right-20 w-40 h-40 bg-green-500 rounded-full mix-blend-multiply filter blur-xl animate-blob opacity-50"></div>
        <div className="absolute left-20 bottom-10 w-60 h-60 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000 opacity-50"></div>
        <div className="absolute bottom-0 left-1 w-40 h-40 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000 opacity-50"></div>

        <div className="flex w-full relative rounded-lg h-64">
          <Image
            alt="Transformation"
            src={youtubeExplainer2}
            layout="fill"
            objectFit="contain"
            className="p-1 cursor-pointer rounded-lg order-sky-400 hover:scale-95 hover:shadow-lg transition transform duration-100 ease-out"
          />
        </div>
      </div>
      <div className="flex flex-col relative p-5">
        <h1 className="text-2xl font-black text-gray-500 my-2">
          Transform your Business
        </h1>
        <p className="py-5">
          No more chasing after contractors, trade specialists, you can find
          all you need to get your construction, development or any Real
          Estate business to the next level
        </p>
        <p className="px-10">
        <Button label={"Watch Video"} 
        onClick={() => router.push("/all")} 
        /></p>
      </div>
    </div>
  </div>
  )
}
export default Transform;