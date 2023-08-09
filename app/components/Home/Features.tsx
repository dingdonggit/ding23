"use client"

import Image from 'next/image'
import propHeader from "@/public/images/properties-header.jpg"
import indiHeader from "@/public/images/individuals-header.jpg"
import orgHeader from "@/public/images/organizations-header.jpg"
import Button from '../Button'
import { useRouter } from 'next/navigation'

const Features = () => {
    const router = useRouter();
  return (
    <div className="flex flex-col w-full bg-sky-100 py-20">
    <div className="flex flex-col items-center justify-center">
      <h1 className="w-full text-2xl md:text-4xl font-black md:w-2/3 lg:w-1/2 relative px-10 text-[#009add] mb-5 mt-10 text-center">
      A comprehensive Real Estate Database for all Projects and Industry related businesses in your City.
      </h1>
      <p className="p-10 md:w-2/3 lg:w-1/2">
        DingDong cloud-based Properties, Businesses and Individuals search
        bring simplicity, consistency, and transparency to the complex Real
        Estate Properties lifecycle.
      </p>
    </div>
    <div
      className="grid grid-cols-1 text-gray-600 sm:grid-cols-2 md:grid-cols-3 max-w-7xl justify-between p-10 gap-4 mx-auto my-10"
     
    >
      <div className="featureMain">
        <div className="flex w-full h-40">
          <div className="flex flex-col w-44 relative rounded-lg
           h-auto justify-center mx-auto">
            <Image
              src={propHeader}
              layout="fill"
              alt="Features"
              objectFit="contain"
              className="p-1 cursor-pointer rounded-lg order-sky-400 hover:scale-95 hover:shadow-lg transition transform duration-100 ease-out"
            />
          </div>
        </div>
        <h1 className="flex text-2xl font-bold my-5 w-full justify-center mx-auto">
          Find Properties
        </h1>
        <p className="p-5">
          Find information about a property, such as status, price,
          construction specialists, teams, individuals, even the products
          and material used
        </p>
        <p className="px-10 mb-10">
        <Button label={"Search"} 
        onClick={() => router.push("/properties")} 
        /></p>
     
      </div>
      <div className="featureMain">
        <div className="flex w-full h-40">
          <div className="flex flex-col w-44 relative rounded-lg h-auto justify-center mx-auto">
            <Image
              src={orgHeader}
              layout="fill"
              alt="Organization img"
              objectFit="contain"
              className="p-1 cursor-pointer rounded-lg order-sky-400 hover:scale-95 hover:shadow-lg transition transform duration-100 ease-out"
            />
          </div>
        </div>
        <h1 className="flex text-2xl font-bold my-5 w-full justify-center mx-auto">
          Find Organizations
        </h1>
        <p className="p-5">
          Wether you are looking to develop an entire new project, or just
          looking for a specialized company in any real estate related
          field, you can have access to thousands of veted and verified real
          estate businesses at your fingure tip
        </p>
        <p className="px-10 mb-10">
        <Button label={"Search"} 
        onClick={() => router.push("/organizations")} 
        /></p>
   
      </div>
      <div className="featureMain">
        <div className="flex w-full h-40">
          <div className="flex flex-col w-44 relative rounded-lg h-auto justify-center mx-auto">
            <Image
              src={indiHeader}
              alt="Individuals img"
              layout="fill"
              objectFit="contain"
              className="p-1 cursor-pointer rounded-lg order-sky-400 hover:scale-95 hover:shadow-lg transition transform duration-100 ease-out"
            />
          </div>
        </div>
        <h1 className="flex text-2xl font-bold my-5 w-full justify-center mx-auto">
          Find Individuals
        </h1>
        <p className="p-5">
          If you are looking to contact a trade specialist, or a Real Estate
          Agent or seeking to verify an individual status or past projects,
          you can have access to thousands of specialist who are working
          independently or part of a bigger organization or business
        </p>
        <p className="px-10 mb-10">
        <Button label={"Search"} 
        onClick={() => router.push("/individuals")} 
        />
        </p>
    
      </div>
    </div>
  </div>

  )
}

export default Features