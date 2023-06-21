import { CharityData } from '@/utils/constants/constants'
import React from 'react'

import ProductGrid from '../ProductGrid'
import { useRouter } from 'next/router'
import VerticalCharityProfile from '../VerticalCharityProfile'

//has to accept the charity as a prop
interface CharityPageProps {
  charity: CharityData
}

const CharityPageComponent: React.FC<CharityPageProps> = ({ charity }) => {
  const router = useRouter()
  const handleClickListings = () => {
    router.push(`/charity/${charity.id}`)
  }

  const handleClickInfo = () => {
    router.push('/charityInfo')
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
            className="z-10 ml-10 text-lg border-b-4 text-bold text-dark-green border-b-dark-green"
          >
            <h1>Listings</h1>
          </button>
          <button onClick={handleClickInfo} className="ml-10 text-lg border-b-4 border-white">
            <h1>Information</h1>
          </button>
        </div>
        <ProductGrid />
      </div>
      {/* <div className="flex">
        <div className="w-[30%]">
          <VerticalCharityProfile charity={charity} />
        </div>
    
      </div>
      <div>
        <ProductGrid></ProductGrid>
      </div>
    </div> */}
    </div>
  )
}

export default CharityPageComponent
