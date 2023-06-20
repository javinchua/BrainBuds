import React from 'react'
import Link from 'next/link'

import { CharityData } from '@/utils/constants/constants'

interface CharityProfileProps {
  charity: CharityData | undefined
}

export const CharityProfile: React.FC<CharityProfileProps> = ({ charity }) => {
  return (
    <div className="flex">
      {charity ? (
        <>
          <div className="w-[20%] items-center justify-ceneter p-2">
            <div className="w-full h-full rounded-full aspect-w-1 aspect-h-1 bg-purple"></div>{' '}
            {/* Avatar/Circle */}
          </div>
          <div className="font-bold text-xl text-left w-[80%]">
            {/* sellerName */}
            <Link href={`/charity/${charity.id}`}>
              <h1 className="mx-4 my-4 hover:underline hover:text-purple-500">{charity.name}</h1>
            </Link>
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
