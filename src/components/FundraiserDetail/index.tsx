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

  // useEffect(() => {
  //   const fetchDonorData = async () => {
  //     if (user.type == userTypes.DONOR && user.uid) {
  //       const fundraiserIds = await getDonorLikedFundraiserIds(user.uid)
  //       setDonorLikedFundraiserIds(fundraiserIds)
  //     }
  //   }
  //   fetchDonorData()
  // }, [])

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
    <div className="h-screen p-10 mt-10">
      {/*image*/}
      <div className="relative z-0 flex justify-center bg-neutral-300">
        <div className="rounded-full">
          <img src={fundraiser.image} alt={fundraiser.name} className="object-contain" />
        </div>
        <div className="absolute inset-0 bg-gray-200 opacity-10"></div>
      </div>

      {/*header for fundraiser*/}
      <div className="flex pb-4 mt-10 border-b">
        <div className="w-[70%]">
          <h1 className="text-3xl">{fundraiser.name}</h1>
        </div>
      </div>
      <div className="w-[30%] mt-4">
        <div className="flex flex-col p-4 text-center shadow-md border-neutral-800">
          <h1 className="py-4 text-lg font-bold">{charity ? charity.name : 'Unknown'}</h1>
        </div>
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
  )
}

export default FundraiserDetail
