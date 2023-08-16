import Link from "next/link";
import Image from "next/image";

interface Props {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  category: string;
  subCategory: string;
  bio: string;
  type?: string;
}

function ProfileHeader({
  accountId,
  authUserId,
  name,
  username,
  imgUrl,
  category,
  subCategory,
  bio,
  type,
}: Props) {
  return (
    <div className='flex w-full flex-col justify-start'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='relative h-20 w-20 object-cover'>
            <Image
              src={imgUrl}
              alt='logo'
              fill
              className='rounded-full object-cover shadow-2xl'
            />
          </div>

          <div className='flex-1'>
            <h2 className='text-left font-bold text-dark-1'>
              {name}
            </h2>
            <p className='text-gray-1'>@{username}</p>
          </div>
        </div>
        {accountId === authUserId && type !== "Organization" && (
          <Link href='/profile/edit'>
            <div className='flex cursor-pointer gap-3 rounded-lg border-2 px-4 py-2 fill-current' >
              <Image
                src='/assets/edit.svg'
                alt='logout'
                width={16}
                height={16}
              />

              <p className='text-dark-2 max-sm:hidden'>Edit</p>
            </div>
          </Link>
        )}
      </div>
      <div className='flex-1 mt-6'>
            <h2 className='text-left font-bold text-dark-1'>
              {category}
            </h2>
            <p className='text-gray-1'>{subCategory}</p>
          </div>
      

      <p className='mt-6 max-w-lg text-dark-2'>{bio}</p>

      <div className='mt-12 h-0.5 w-full bg-light-2' />
    </div>
  );
}

export default ProfileHeader;