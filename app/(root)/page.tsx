import Image from 'next/image'
import ClientOnly from '../../components/ClientOnly'
import Container from '../../components/Container'
import EmptyState from '../../components/EmptyState';


import accentrix from "@/public/images/accentrix.jpg"
import admiral from "@/public/images/admiral.png"
import kohler from "@/public/images/kohler.jpg"
import KPMG from "@/public/images/KPMG.jpg"
import midland from "@/public/images/midland.jpg"
import qxm from "@/public/images/qxm.jpg"

import Whyus from "../../components/Home/Whyus"



import Transform from '../../components/Home/Transform';
import Contact from '../../components/Home/Contact';
import Dingdong from '../../components/Home/Dingdong';
import Features from '../../components/Home/Features';
import Hero from '../../components/Home/Hero';

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
      <div>
     
         <Hero />
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
