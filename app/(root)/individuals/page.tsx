import Image from "next/image"


const page = () => {
   
  return (
    <>

      <div className="relative flex flex-col justify-center h-46 bg-black">
        <Image
          src="/images/hero-bg.jpg"
          layout="fill"
          objectFit="cover"
          alt="hero"
          className="bg-blend-overlay opacity-75"
        />
        <div className="relative w-full text-center  text-gray-100">
          <div className="text-3xl lg:text-5xl font-black mt-10">
            <h1>Explore All Individuals</h1>
          </div>
        </div>
        <div className="relative px-5 w-full md:w-2/3 lg:1/2 justify-center mx-auto my-10 items-center">
          <div className="flex px-10">
            search box here
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="flex flex-col w-full lg:w-3/5 p-5 h-screen overflow-y-scroll">
 
        </div>
        {/*
    <div className="hidden lg:inline-flex lg:w-2/5">
      </div> */}
        <div className="flex flex-col lg:inline-flex lg:w-2/5">
           map container here 
        </div>
      </div>
   
  </>
  )
}

export default page