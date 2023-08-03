'use client'

import useCreateProjectModal from "@/app/hooks/useCreateProjectModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../Navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

enum STEPS {
    CATEGORY=0,
    LOCATION=1,
    INFO= 2,
    MOREINFO= 3,
    CONSTRUCTION=4,
    IMAGES=5,
    DESCRIPTION=6,
    COMPANIES=7,
    INDIVIDUALS=8,
    PRICERANGE= 9,

}

const CreateProjectModal = () => {
    const router = useRouter();
    const createProjectModal = useCreateProjectModal();
    const { 
        register, 
        handleSubmit,
        setValue,
        watch,
        formState: {
          errors,
        },
        reset,
      } = useForm<FieldValues>({
        defaultValues: {
          category: '',
          location: null,
          unitCount:1,
          minLevel:1,
          maxLevel:1,
          minRoom:0,
          maxRoom:1,

          minBathroom:1,
          maxBathroom:1,

          minGarage:0,
          maxGarage:1,

          imageSrc: '',

          minPrice:1,
          maxPrice:1,

          title: '',
          description: '',
         
          companyName: '',
          companyCategory: '',
          companySubCategory: '',

          individualName: '',
          individualCategory: '',
          individualSubCategory: '',

          constStartDate: '',
          constEndDate: '',
          applicationDate: '',
          applicationApprovalDate: '',

          status:'',
          saleStatus:'',
        }
      });
    const location = watch('location');
    const category = watch('category');
    const unitCount = watch("unitCount");
    const minLevel = watch("minLevel");
    const maxLevel = watch("maxLevel");
    const minRoom = watch("minRoom");
    const maxRoom = watch("maxRoom");
    const minBathroom = watch("minBathroom");
    const maxBathroom = watch("maxBathroom");
    const imageSrc = watch("imageSrc");
    const minPrice = watch("minPrice");
    const maxPrice = watch("maxPrice");
    const minGarage = watch("minGarage");
    const maxGarage = watch("maxGarage");
    const title = watch("title");
    const description = watch("description");
    const developer = watch("developer");
    const companyName = watch("companyName");
    const companyCategory = watch("companyCategory");
    const companySubCategory = watch("companySubCategory");
    const individualName = watch("individualName");
    const individualCategory = watch("individualCategory");
    const individualSubCategory = watch("individualSubCategory");

    const constructionStarted = watch("constructionStarted");
    const constructionCompleted = watch("constructionCompleted");
    const status = watch("status");
    const saleStatus = watch("saleStatus");
    
    const Map = useMemo(() => dynamic(() => import('../Map'), { 
        ssr: false 
      }), [location]);

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true
        })
      }
    

    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(STEPS.CATEGORY)
    const onBack = () => {
        setStep((value) => value - 1);
      }
    
      const onNext = () => {
        setStep((value) => value + 1);
      }

      const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.PRICERANGE) {
          return onNext();
        }
        
        setIsLoading(true);
    
        axios.post('/api/listings', data)
        .then(() => {
          toast.success('Listing created!');
          router.refresh();
          reset();
          setStep(STEPS.CATEGORY)
          createProjectModal.onClose();
        })
        .catch(() => {
          toast.error('Something went wrong.');
        })
        .finally(() => {
          setIsLoading(false);
        })
      }


      const actionLabel = useMemo(() => {
        if (step === STEPS.PRICERANGE) {
          return 'Create'
        }
    
        return 'Next'
      }, [step]);
    
      const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
          return undefined
        }
    
        return 'Back'
      }, [step]);

      let bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Which of these best describes your Listing?"
            subtitle="Pick a category"
          />
          <div className="grid  grid-cols-1  md:grid-cols-2  gap-3 max-h-[50vh] overflow-y-auto">
            {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue('category', category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
            </div>
            ))}
          </div>
          </div>
      )

      if (step === STEPS.LOCATION) {
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading
              title="What is the address"
              subtitle="Help other users find you!"
            /> 
            <CountrySelect 
              value={location} 
              onChange={(value) => setCustomValue('location', value)} 
            />
            <Map center={location?.latlng} />
          </div>
        );
      }
      if (step === STEPS.INFO) {
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading
              title="Share some basics about your project"
              subtitle="What amenitis do you have?"
            />
            <Counter 
              onChange={(value) => setCustomValue('unitCount', value)}
              value={unitCount}
              title="Units" 
              subtitle="How many Units in your project"
            />
            <hr />
            <div className="flex flex-row gap-4 justify-between">
             <Counter 
              onChange={(value) => setCustomValue('minLevel', value)}
              value={minLevel}
              title="Min Levels" 
              subtitle="Minimum amount of levels"
            />
             <Counter 
              onChange={(value) => setCustomValue('maxLevel', value)}
              value={maxLevel}
              title="Max Levels" 
              subtitle="Maximum amount of levels"
            />
            </div>

            <hr />
            <div className="flex flex-row gap-4 justify-between">
             <Counter 
              onChange={(value) => setCustomValue('minRoom', value)}
              value={minRoom}
              title="Min Rooms" 
              subtitle="Minimum amount rooms, 0 for Studio"
            />
             <Counter 
              onChange={(value) => setCustomValue('maxRoom', value)}
              value={maxRoom}
              title="Max Rooms" 
              subtitle="Max amount of Rooms"
            />
            </div>

            <hr />
            <div className="flex flex-row gap-4 justify-between">
             <Counter 
              onChange={(value) => setCustomValue('minBathroom', value)}
              value={minBathroom}
              title="Min Bathrooms" 
              subtitle="Minimum amount of Bathrooms"
            />
             <Counter 
              onChange={(value) => setCustomValue('maxBathroom', value)}
              value={maxBathroom}
              title="Max Bathrooms" 
              subtitle="Max amount of Bathrooms"
            />
            </div>
        
          </div>
        )
      }
      if (step === STEPS.MOREINFO) {
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading
              title="More info about your project"
              subtitle="Extra Ameneties"
            />
             
             <hr />
            <div className="flex flex-row gap-4 justify-between">
             <Counter 
              onChange={(value) => setCustomValue('minGarage', value)}
              value={minGarage}
              title="Min Car Parking Spots" 
              subtitle="Minimum amount of Parking Spots, 0 for none"
            />
             <Counter 
              onChange={(value) => setCustomValue('maxGarage', value)}
              value={maxGarage}
              title="Max Car Parking Spots" 
              subtitle="Max amount of Parking Spots"
            />
            </div>
            <hr />
            
             <Input
              id="saleStatus"
              label="Sale Status"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
          </div>
        )
      }
      if (step === STEPS.CONSTRUCTION) {
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading
              title="More info about your project"
              subtitle="Extra Ameneties"
            />
             
             <hr />
    
            <Input
              id="constStartDate"
              label="Construction Started Date"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
             <Input
              id="constEndDate"
              label="Construction Completion Date"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
            <Input
              id="status"
              label="Current Construction Status"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
          </div>
        )
      }

      if (step === STEPS.IMAGES) {
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading
              title="Add a photo of your project"
              subtitle="Show users what your project looks like!"
            />
            <ImageUpload
              onChange={(value) => setCustomValue('imageSrc', value)}
              value={imageSrc}
            />
          </div>
        )
      }
      if (step === STEPS.DESCRIPTION) {
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading
              title="How would you describe your profile or property"
              subtitle="Short and sweet works best!"
            />
            <Input
              id="title"
              label="Title"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
            <hr />
            <Input
              id="description"
              label="Description"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
          </div>
        )
      }

      if (step === STEPS.COMPANIES) {
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading
              title="Collaorating Organizations"
              subtitle="Architects, Developers, Designers etc.."
            />
            <Input
              id="companyName"
              label="Company Name"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
            <hr />
            <Input
              id="companyCategory"
              label="Company Category"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
             <hr />
            <Input
              id="companySubCategory"
              label="Company Subcategory"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
          </div>
        )
      }
      if (step === STEPS.INDIVIDUALS) {
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading
              title="Collaorating Individuals"
              subtitle="Trade individuals, Individuals that are currently working in existing Organizations.."
            />
            <Input
              id="individualName"
              label="Individual Name"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
            <hr />
            <Input
              id="individualCategory"
              label="Individual's Category"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
             <hr />
            <Input
              id="individualSubCategory"
              label="Individual's Subcategory"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
          </div>
        )
      }
      if (step === STEPS.PRICERANGE) {
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading
              title="Set a price range"
              subtitle="What is the lowest and highest price(units, services, products)"
            />
            <div className="flex flex-row gap-4 justify-between">
            <Input
              id="minPrice"
              label="Min Price"
              formatPrice 
              type="number" 
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
            <Input
              id="maxPrice"
              label="Max Price"
              formatPrice 
              type="number" 
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
            </div>
          </div>
        )
      }

 

    return (
        <Modal 
        isOpen={createProjectModal.isOpen}
        onClose={createProjectModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
        title="Create a Listing, or Get an RFP"
        body={bodyContent}
        />
    )
}
export default CreateProjectModal;