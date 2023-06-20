import React from 'react'
import Link from 'next/link'

export const CharityProfile = () => {
  return (
    <div className="flex">
      <div className="w-[20%] items-center justify-ceneter p-2">
        <div className="w-full h-full rounded-full aspect-w-1 aspect-h-1 bg-purple"></div>{' '}
        {/* Avatar/Circle */}
      </div>
      <div className="text-left w-[80%]">
        {/*sellerName */}
        <Link href="/charity">
          <h1 className="mx-4 my-4 hover:underline hover:text-purple-500">Youth Foundation</h1>
        </Link>
      </div>
    </div>
  )
}
