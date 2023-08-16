import Image from "next/image";
import Wave from "react-wavify";
import heroImage from "@/public/images/hero-3.png";

const Hero = () => {
  return (
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
            <h1 className="w-full text-2xl md:text-4xl lg:text-4xl xl:text-4xl font-black md:w-2/3 lg:w-1/2 relative p-5 text-[#009add] mb-5 mt-10">
              The tool all Developers and Contractors wish existed
            </h1>
          </div>
          <div className="flex justify-center items-center">
            <h2 className="flex mx-auto w-full md:w-2/3 lg:w-1/2 relative p-5 text-gray-600 mb-44 font-medium text-xl">
              Using the latest technologies to Connect Organizations and
              Individuals in the Real Estate Industry with the resources they
              need in order to optimize the procurement process.
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
