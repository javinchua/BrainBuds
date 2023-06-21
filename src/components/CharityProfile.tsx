import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { CharityData } from '@/utils/constants/constants'
import ProfileAvatar from './ProfileAvatar'

interface CharityProfileProps {
  charity: CharityData | undefined
}

export const CharityProfile: React.FC<CharityProfileProps> = ({ charity }) => {
  const router = useRouter()
  const { sellerId, ...rest } = router.query
  const handleClick = () => {
    if (charity) {
      const newQuery = { sellerId: charity.id, ...rest }
      router.push({ pathname: router.pathname, query: newQuery })
    }
  }
  return (
    <div className="flex">
      {charity ? (
        <>
          <div className="w-[17%] items-center justify-ceneter p-2">
            <ProfileAvatar charity={charity} />
            {/* Avatar/Circle */}
          </div>
          <div className="flex flex-col object-cover w-full my-4 ml-4">
            <div className="text-xl font-bold text-left">
              {/* sellerName */}
              <Link href={`/charity/${charity.id}`} onClick={handleClick}>
                <h1 className=" hover:underline hover:text-purple-500">{charity.name}</h1>
              </Link>
            </div>
            <h1 className="mt-2">Description</h1>
          </div>
        </>
      ) : (
        <div>
          <h1>Cannot render</h1>
        </div>
      )}
    </div>
  )
}
