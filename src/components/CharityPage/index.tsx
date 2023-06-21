import { CharityData } from '@/utils/constants/constants'
import React from 'react'
import Link from 'next/link'
//has to accept the charity as a prop
interface CharityPageProps {
  charity: CharityData
}

const CharityPageComponent: React.FC<CharityPageProps> = ({ charity }) => {
  return (
    <div className="flex flex-col mt-20 text-center">
      <div className="mb-10">
        {' '}
        <h1>Thank you for visiting</h1>
        <h1>{charity.description}</h1>
      </div>

      {/* charity profile navbar */}
      <div className="flex w-full">
        <div className="w-[30%]">
          <h1 className="my-5">profile goes here</h1>
        </div>
        <div className="flex w-[70%] h-20 bg-primary-300">
          <Link href="/charity/charityInfo" className="my-auto ml-10">
            <h1>Information</h1>
          </Link>
          <Link href="/" className="my-auto ml-10">
            <h1>Listings</h1>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CharityPageComponent
