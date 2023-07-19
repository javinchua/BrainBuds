import { CharityData } from '@/utils/constants/constants'
import React from 'react'
import CharityProductGrid from '../CharityProductGrid'

import VerticalCharityProfile from '../VerticalCharityProfile'
import { useState } from 'react'
import CharityFundraiserGrid from '../CharityFundraiserGrid'
//has to accept the charity as a prop
interface CharityPageProps {
  charity: CharityData
}

const CharityPageComponent: React.FC<CharityPageProps> = ({ charity }) => {
  const [isListing, setIsListing] = useState<boolean>(true)

  const handleClickListings = () => {
    setIsListing(true)
  }

  const handleClickFund = () => {
    setIsListing(false)
  }

  return (
    <div className="flex p-10 mt-20 text-center">
      {/* charity profile navbar */}
      <div className="w-[500px]">
        <VerticalCharityProfile charity={charity} />
      </div>
      <div>
        <div className="flex h-20 border-b">
          <button
            onClick={handleClickListings}
            className={`z-10 ml-10 text-lg ${
              isListing ? 'border-b-4 text-bold text-dark-green border-b-dark-green' : 'mb-[4px]'
            }`}
          >
            <h1>Listings</h1>
          </button>
          <button
            onClick={handleClickFund}
            className={`z-10 ml-10 text-lg ${
              !isListing ? 'border-b-4 text-bold text-dark-green border-b-dark-green' : 'mb-[4px]'
            }`}
          >
            <h1>Fundraisers</h1>
          </button>
        </div>
        <div className="p-10 shadow-md">
          <h1 className="mb-10 text-2xl font-semibold text-left">
            {isListing ? 'Listings' : 'Fundraisers'}
          </h1>
          {isListing ? (
            <CharityProductGrid charityId={charity.id} />
          ) : (
            <CharityFundraiserGrid charityId={charity.id} />
          )}
        </div>
      </div>
    </div>
  )
}

export default CharityPageComponent
