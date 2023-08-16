"use client"



import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Logo from  "@/public/images/logo-icon.png"
import Image from "next/image";


const Contact = () => {
    const router = useRouter();
  const { register, handleSubmit } = useForm();
 

  return (
    <div className="flex w-full py-20 bg-[#0199dc] mt-10">
    <div
      className="relative grid grid-cols-1 md:grid-cols-2 w-full px-10 md:px-10 lg:max-w-7xl justify-between gap-8 mx-auto mb-10 "
     
    >
      <div className="flex flex-col relative justify-center">
        <div className="flex flex-col w-24 relative rounded-lg h-24 justify-center mx-auto">
          <Image
            src={Logo}
           
            objectFit="contain"
            width={100}
            height={100}
            alt="Contact Us"
            className="p-1 cursor-pointer rounded-lg order-sky-400 hover:scale-95 hover:shadow-lg transition transform duration-100 ease-out"
          />
        </div>
        <h1 className="flex justify-center text-2xl text-white font-bold mt-2">
          Book a Demo Today
        </h1>
        <p className="flex justify-center text-white font-medium mt-2">
          Let’s Set Your Business Free
        </p>
      </div>
      <div className="flex w-full flex-col relative justify-center mx-auto">
        <form
        //   onSubmit={handleSubmit(onSubmitForm)}
          className="flex flex-col space-y-3 w-full mx-auto "
        >
          <input
            {...register("name")}
            placeholder="Name"
            type="text"
            className="contactInput"
          ></input>
          <input
            {...register("email", { required: true })}
            placeholder="Email"
            type="text"
            className="contactInput"
          ></input>
            {/* <DatePicker /> */}
          <textarea
            {...register("message")}
            placeholder="Notes"
            
            className="outline-none bg-slate-200/10 rounded-sm border-b px-6 py-4 border-gray-200 text-gray-50 placeholder-gray-300 transition-all focus:border-white focus:text-white"
          />
          <button
            type="submit"
            className="focus:outline-none focus:opacity-90 focus:ring-2 focus:ring-offset-2 focus:ring-[#0199dc] hover:opacity-90 text-base font-bold bg-white rounded w-1/2 mx-auto md:py-4 py-2 px-4 md:px-8 foucus:outline-none text-[#0199dc] "
          >
            Book
          </button>
        </form>
      </div>
    </div>
  </div>
  )
}

export default Contact