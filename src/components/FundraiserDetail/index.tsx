import { CharityData, Fundraiser } from '@/utils/constants/constants'
import { CharityProfile } from '../CharityProfile'
import { useEffect } from 'react'
import { useState } from 'react'
import { getCharityDataByFundraiser } from 'pages/api/fundraiser'

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
            <h1 className="text-3xl">{fundraiser.name}</h1>
          </div>
        </div>
        <div className="flex">
          {' '}
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
          <div className="ml-10">
            <button className="px-4 py-2 mb-4 text-white uppercase transition duration-300 ease-in-out bg-brightOrange hover:bg-purple-200">
              Donate now
            </button>
            <p>
              <span className="text-2xl font-bold text-brightOrange">${fundraiser.curAmount}</span>{' '}
              raised of ${fundraiser.goalAmount} goal
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default FundraiserDetail
