'use client';

import qs from 'query-string';
import dynamic from 'next/dynamic'
import { useCallback, useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { useRouter, useSearchParams } from 'next/navigation';

import useSearchModal from "@/app/hooks/useSearchModal";

import Modal from "./Modal";

import CountrySelect, { 
  CountrySelectValue
} from "../inputs/CountrySelect";
import Heading from '../Heading';
import Input from '../inputs/Input';

enum STEPS {
  LOCATION = 0,
  INFO = 1,
}

const SearchModal = () => {
    const [isLoading, setIsLoading] = useState(false);
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
          keyword: '',
          location: null,
        }});

  const router = useRouter();
  const searchModal = useSearchModal();
  const params = useSearchParams();

  const [step, setStep] = useState(STEPS.LOCATION);

  const [location, setLocation] = useState<CountrySelectValue>();
  const [keyword, setKeyword] = useState();


  const Map = useMemo(() => dynamic(() => import('../Map'), { 
    ssr: false 
  }), [location]);

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      keyword,
  
    };

  
    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery,
    }, { skipNull: true });

    setStep(STEPS.LOCATION);
    searchModal.onClose();
    router.push(url);
  }, 
  [
    step, 
    searchModal, 
    location,
    keyword, 
    router, 
    onNext,
    params
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return 'Search'
    }

    return 'Next'
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined
    }

    return 'Back'
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where you looking for?"
        subtitle="Find a Property, a Project, a Trade Company or an Individual, or a Suppliers"
      />
      <CountrySelect 
        value={location} 
        onChange={(value) => 
          setLocation(value as CountrySelectValue)} 
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  )

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Search Keywords"
          subtitle="Find your perfect results!"
        />
       <Input 
            id="keyword"
            label='Search Terms'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            />
      </div>
    )
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      title="Filters"
      actionLabel={actionLabel}
      onSubmit={onSubmit}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      onClose={searchModal.onClose}
      body={bodyContent}
    />
  );
}

export default SearchModal;