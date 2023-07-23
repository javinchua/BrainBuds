import { CharityData, Fundraiser } from '@/utils/constants/constants'
import { CharityProfile } from '../CharityProfile'
import { useEffect } from 'react'
import { useState } from 'react'
import { getCharityDataByFundraiser } from 'pages/api/fundraiser'
import { checkout } from '@/styles/checkout'

interface FundraiserProps {
  fundraiser: Fundraiser
}

const FundraiserDetail: React.FC<FundraiserProps> = ({ fundraiser }) => {
  const [charity, setCharity] = useState<CharityData>()

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCharityDataByFundraiser({ fundraiser })
      if (data) {
        setCharity(data)
      }
    }

    fetchData()
  }, [fundraiser])

  return (
    <>
      <div className="flex flex-col h-screen p-10">
        <div className="mb-10 text-center">
          {/*header for fundraiser*/}
          <div>
            <h1 className="text-2xl font-semibold">{fundraiser.name}</h1>
            {charity && <p>by {charity.name}</p>}
          </div>
        </div>
        <div className="flex">
          <div className="w-2/3">
            {/*image*/}
            <div className="relative z-0 flex justify-center bg-neutral-300">
              <div className="rounded-full">
                <img src={fundraiser.image} alt={fundraiser.name} className="object-contain" />
              </div>
              <div className="absolute inset-0 bg-gray-200 opacity-10"></div>
            </div>
            {/* fundraiser description*/}
            <div className="pb-10 mt-10 border-b">
              <h2 className="text-2xl font-semibold ">Description</h2>
              <div className="flex mb-4">
                <div className="w-1/2">
                  <h1>Posted: {fundraiser.createdAt?.toDate().toLocaleString() || 'Unknown'}</h1>
                </div>
                <div className="w-1/2">
                  <h1>Category: {fundraiser.category}</h1>
                </div>
              </div>
              <p>{fundraiser.description}</p>
            </div>
            {/* seller description*/}
            <div className="mt-10">
              <h1 className="mb-10 text-2xl font-semibold">Meet the charity</h1>
              <CharityProfile charity={charity}></CharityProfile>
            </div>
          </div>
          <div className="ml-5">
            <div className="relative inline-block w-full text-center bg-white border border-gray-300 rounded-lg shadow-md">
              <div className="relative p-4">
                <p className="text-gray-800">
                  <span className="text-2xl font-semibold text-primary-400">
                    ${fundraiser.curAmount}
                  </span>{' '}
                  raised of ${fundraiser.goalAmount} goal
                </p>
              </div>
            </div>
            <button
              className="w-full px-4 py-2 mt-4 mb-4 text-white uppercase transition duration-300 ease-in-out shadow-md bg-brightOrange hover:bg-navy"
              onClick={() => {
                checkout({
                  lineItems: [
                    {
                      price: 'price_1NVwGdDW3oLBLKRLFWxu2ic9',
                      quantity: 1
                    }
                  ]
                })
              }}
            >
              Donate now
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default FundraiserDetail
