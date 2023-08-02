'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { GrUserWorker } from 'react-icons/gr';
import { LuConstruction, LuTruck } from 'react-icons/lu';
import { MdOutlineVilla } from 'react-icons/md';
import { GiWoodenCrate } from 'react-icons/gi'
import CategoryBox from "../CategoryBox";
import Container from '../Container';




export const categories = [
  {
    label: 'Properties',
    icon: MdOutlineVilla,
    description: 'You can find Projects, Properties and more',
  },
  {
    label: 'Organizations',
    icon: LuConstruction,
    description: 'You can find Trade Companies, Specialyzed Companies etc.. ',
  },
  {
    label: 'Individuals',
    icon: GrUserWorker,
    description: 'You can find Trade Individuals, Specialists'
  },
  {
    label: 'Suppliers',
    icon: LuTruck,
    description: 'You can find building material suppliers'
  },
  {
    label: 'Products',
    icon: GiWoodenCrate,
    description: 'You can find supplies, appliances, plumming ans specialized products'
  }
]

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
          pt-4
          w-4/6
          mx-auto
          flex 
          flex-row 
          items-center 
          justify-between
          overflow-x-auto
        "
      >
        {categories.map((item) => (
          <CategoryBox 
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
}
 
export default Categories;