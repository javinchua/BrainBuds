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
  const { charityId, ...rest } = router.query
  const handleClick = () => {
    if (charity) {
      const newQuery = { charityId: charity.id, ...rest }
      router.push({ pathname: router.pathname, query: newQuery })
    }
  }
  return (
    <div className="flex">
      {charity ? (
        <>
          <div className="items-center p-2 justify-ceneter">
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
            <div className="text-lg font-medium">Description</div>
            <div>{charity.description}</div>
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
