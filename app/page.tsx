import Image from 'next/image'
import ClientOnly from './components/ClientOnly'
import Container from './components/Container'
import EmptyState from './components/EmptyState';
import Wave from "react-wavify";
import heroImage from "./../public/images/hero-3.png"

import accentrix from "./../public/images/accentrix.jpg"
import admiral from "./../public/images/admiral.png"
import kohler from "./../public/images/kohler.jpg"
import KPMG from "./../public/images/KPMG.jpg"
import midland from "./../public/images/midland.jpg"
import qxm from "./../public/images/qxm.jpg"

import Whyus from "./components/Home/Whyus"



import Transform from './components/Home/Transform';
import Contact from './components/Home/Contact';
import Dingdong from './components/Home/Dingdong';
import Features from './components/Home/Features';

export default function Home() {
 
  const isEmpty = true;
  if (isEmpty) {
    <ClientOnly>
      <EmptyState />
    </ClientOnly>
  }
  return (
   <>
   <ClientOnly >
    <Container>
      <div className="z-30">
       <div className="pt-32 flex flex-col w-full h-[500px]">
        <div className="flex w-full bg-white relative">
          <Image
            src={heroImage}
            layout="fill"
            objectFit="contain"
            alt="hero"
            className="bottom-0 z-10 mt-28 sm:mt-10 md:mt-4 lg:mt-0 bg-blend-multiply"
          />
          <Wave
            className="absolute w-full bottom-0 bg-blend-multiply"
            fill="#edf6fc"
            paused={false}
            options={{
              height: 10,
              amplitude: 40,
              speed: 0.15,
              points: 3,
            }}
          />

          <div className="relative w-full text-center z-20">
            <div className="flex justify-center">
              <h1 className="w-full text-2xl md:text-4xl font-black md:w-2/3 lg:w-1/2 relative p-5 text-[#009add] mb-5 mt-10">
              The tool all Developers and Contractors wish existed
              </h1>
            </div>
            <div className="flex justify-center items-center">
              <h2 className="flex mx-auto w-full md:w-2/3 lg:w-1/2 relative p-5 text-gray-600 mb-44 font-medium text-xl">
              Using the latest technologies to Connect Organizations and Individuals in the Real Estate Industry with the resources they need in order to optimize the procurement process.
              </h2>
            </div>
          </div>
        </div>
      </div>

         {/* How to use DingDong */}
        <Dingdong />

            {/* Main Features */}
            <Features />
    
  {/* Our Clients */}
  <div className="flex flex-col justify-center mx-auto mb-10">
        <h1 className="text-4xl font-medium text-slate-600 justify-center p-5 mt-5 mx-auto">
          Featured Clients
        </h1>
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:inline-flex justify-center gap-4 p-10 mx-auto mb-5"
          
        >
          <div className="flex w-24 h-24 rounded-full border-1 p-1 shadow-lg relative">
            <Image
            alt="admiral logo"
              src={admiral}
              layout="fill"
              objectFit="cover"
              className="rounded-full p-1"
            />
          </div>
          <div className="flex w-24 h-24 rounded-full border-1 p-1 shadow-lg relative">
            <Image
            alt="kohler logo"
              src={kohler}
              layout="fill"
              objectFit="cover"
              className="rounded-full p-1"
            />
          </div>
          <div className="flex  w-24 h-24 rounded-full border-1 p-1 shadow-lg relative">
            <Image
            alt="KPMG logo"
              src={KPMG}
              layout="fill"
              objectFit="cover"
              className="rounded-full p-1"
            />
          </div>
          <div className="flex  w-24 h-24 rounded-full border-1 p-1 shadow-lg relative">
            <Image
            alt="Midland logo"
              src={midland}
              layout="fill"
              objectFit="cover"
              className="rounded-full p-1"
            />
          </div>
          <div className="flex w-24 h-24 rounded-full border-1 p-1 shadow-lg relative">
            <Image
            alt="QXM logo"
              src={qxm}
              layout="fill"
              objectFit="cover"
              className="rounded-full p-1"
            />
          </div>
          <div className="flex w-24 h-24 rounded-full border-1 p-1 shadow-lg relative">
            <Image
            alt="Accentrix logo"
              src={accentrix}
              layout="fill"
              objectFit="cover"
              className="rounded-full p-1"
            />
          </div>
        </div>
      </div>
      <Transform />
      <Whyus />
      <Contact />
      </div>
    </Container>
   </ClientOnly>
   </>
  )
}
