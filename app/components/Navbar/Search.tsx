"use client"
import useSearchModal from '@/app/hooks/useSearchModal'
import { BiSearch } from 'react-icons/bi'
function Search() {
  const searchModal = useSearchModal();
  return (
    <div onClick={searchModal.onOpen} className=" border-[1px] w-full md:w-auto py-2 rounded-lg hover:shadow-md transition cursor-pointer">
        <div className="flex flex-row items-center justify-between">
            <div className="text-sm font-semibold px-6">
              Search State/Province
            </div>
            <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
             Search City
            </div>
            <div className="p-2 bg-blue-500 rounded-full text-white mr-6">
                <BiSearch size={18} />
            </div>
        </div>
    </div>
  )
}

export default Search