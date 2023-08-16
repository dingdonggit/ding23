"use client"
import { useRouter } from "next/navigation"
import bgImage from "@/public/images/background.png"
import Image from "next/image";
import rightAligned from "@/public/images/rightAligned1.svg"
import rightAligned2 from "@/public/images/right_aligned_with_cta-svg2.svg"
import rightAligned3 from "@/public/images/right_aligned_with_cta-svg3.svg"
import rightAligned4 from "@/public/images/right_aligned_with_cta-svg4.svg"
export default function Whyus() {


  const router = useRouter();
  return (
    <div className='overflow-y-hidden z-50'>
      <div className="relative pt-16 px-4">
       <div  className="absolute xl:w-7/12 xl:h-full top-0 left-0 h-image flex-no-shrink flex -mt-2 z-0" >
       <Image src={bgImage} 
       layout="fill"
       objectFit="cover"
       alt="bg image" />
       </div>
       
        <div className=" lg:flex-row flex flex-col-reverse items-center lg:space-x-32 justify-center mx-auto container relative z-20 xl:px-0 px-4">
          <div tabIndex={0} aria-label="group of cards" className="focus:outline-none lg:w-1/2 mt-16 lg:flex">
            <div className="flex flex-col">
                {/* Affordable Prices */}
                <div tabIndex={0} aria-label="card 1" className="focus:outline-none rounded mb-8 bg-white px-4 xl:px-8 shadow-md hover:scale-95 hover:shadow-lg transition transform duration-100 ease-out">
                    <div className="mt-8">
                    <Image src={rightAligned}
                    alt="Affordable Price" 
                    width={60}
                    height={60}
                    objectFit="contain"/>
                    </div>
                    <div>
                    <h1 tabIndex={0} className="focus:outline-none font-semibold text-2xl f-m-m pt-10">
                        Affordable Price
                        <br />
                        Guranteed
                    </h1>
                    <p tabIndex={0} className="focus:outline-none text-base font-normal f-m-m leading-loose pb-8 pt-5">Offering the best prices on the market so you don’t have to search around </p>
                    </div>
                </div>
              {/* Highly Qualified */}
                <div tabIndex={0} aria-label="card 2" className="focus:outline-none rounded bg-white px-4 xl:px-8 mb-8 lg:mb-0 shadow-md hover:scale-95 hover:shadow-lg transition transform duration-100 ease-out">
                    <div className="mt-8">
                    <Image src={rightAligned3} width={60} height={60} alt="Hand Picked" />

                    </div>
                    <div>
                    <h1 tabIndex={0} className="focus:outline-none font-semibold text-2xl f-m-m pt-10">
                        Highly Qualified
                        <br />
                        Service
                    </h1>
                    <p tabIndex={0} className="focus:outline-none text-base font-normal f-m-m leading-loose pb-8 pt-5">Highly trained employees to tend to your needs </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:ml-10 ml-0 lg:mt-10 mt-0">
              {/* In Person */}
                <div tabIndex={0} aria-label="card 3" className="focus:outline-none rounded bg-[#0199dc] lg:mt-20 mt-0 px-4 xl:px-8 box-shadow-light hover:scale-95 hover:shadow-lg transition transform duration-100 ease-out">
                    <div className="mt-8">
                    <Image src={rightAligned2} width={60} height={60} alt="Hand Picked" />
                    </div>
                    <div>
                    <h1 tabIndex={0} className="focus:outline-none font-semibold text-2xl f-m-m pt-10 text-white">
                        In Person
                        <br />
                        Verified
                    </h1>
                    <p tabIndex={0} className="focus:outline-none text-base font-normal f-m-m leading-loose pb-8 pt-5 text-white">Hand picked Properties, Organizations and Individuals and resorts that are verified by a team of professionals no bots. Stay at the best places</p>
                    </div>
                </div>
              {/* Wide Variety */}
                <div tabIndex={0} aria-label="card 4" className="focus:outline-none rounded bg-white lg:mt-8 mt-8 px-4 xl:px-8 shadow-md hover:scale-95 hover:shadow-lg transition transform duration-100 ease-out">
                    <div className="mt-8">
                    <Image src={rightAligned4} width={60} height={60} alt="Wide Variety of Destinations" />

                    </div>
                    <div>
                    <h1 tabIndex={0} className="focus:outline-none font-semibold text-2xl f-m-m pt-10">
                        Wide Variety of
                        <br />
                        Categories
                    </h1>
                    <p tabIndex={0} className="focus:outline-none text-base font-normal f-m-m leading-loose pb-8 pt-5">Categories from all Real Estate related businesses. Explore Properties, Companies, Engineers, Consultants, Construction Managers, Trade Specialists and much much more</p>
                    </div>
                </div>
            </div>
          </div>
          <div className="lg:w-4/12 hover:scale-95 ">
            <h1 tabIndex={0} className="focus:outline-none lg:text-5xl text-3xl f-m-w text-[#0199dc] font-bold">Why you should choose us?</h1>
            <p tabIndex={0} className="focus:outline-none lg:text-base text-sm f-m-m leading-loose mt-3 mb-8">Our goal since inception has been providing the best possible experiences that is totally worth the time saving. We do the research for you so you never have to </p>
            <button onClick={() => router.push('/about')}  className="focus:outline-none focus:opacity-90 focus:ring-2 
            focus:ring-offset-2 focus:ring-[#0199dc] hover:opacity-90 text-base font-bold bg-[#0199dc] 
            rounded f-m-m md:py-4 py-2 px-4 md:px-8 foucus:outline-none text-white">View More</button>
          </div>
        </div>
      </div>
    </div>
  );
}
  
  
  
  