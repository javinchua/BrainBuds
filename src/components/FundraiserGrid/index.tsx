import { useEffect, useState } from 'react'
import { getAllFundraisers } from 'pages/api/fundraiser'
import { CharityData, Fundraiser } from '@/utils/constants/constants'
import { useRouter } from 'next/router'
import SmallProfileAvatar from '../smallProfileAvatar'
import { getCharityDataByFundraisers } from 'pages/api/fundraiser'
interface FundraiserGridProps {
  searchQuery?: string
}

const FundraiserGrid: React.FC<FundraiserGridProps> = ({ searchQuery }) => {
  const router = useRouter()
  const { charityId = '', category = '' } = router.query || {}
  const [fundraisers, setFundraisers] = useState<Fundraiser[]>([])
  const [charities, setCharities] = useState<CharityData[]>([])
  const [sortedFiltered, setSortedFiltered] = useState<Fundraiser[]>([])
  const [sortEnabled, setSortEnabled] = useState(false)
  const handleClick = (fundraiserId: string) => {
    router.push(`/fundraisers/${fundraiserId}`)
  }

  useEffect(() => {
    const fetchFundraisers = async () => {
      const fundraisersData = await getAllFundraisers()
      if (fundraisersData) {
        let filteredFundraisers = fundraisersData

        if (charityId) {
          filteredFundraisers = filteredFundraisers.filter(
            (fundraiser) => fundraiser.charityId === charityId
          )
        }

        if (category) {
          filteredFundraisers = filteredFundraisers.filter(
            (fundraiser) => fundraiser.category === category
          )
        }

        setFundraisers(filteredFundraisers) // Update the state with filtered fundraisers
      }
    }

    fetchFundraisers()
  }, [charityId, category, router.query])

  const filteredFundraisers = searchQuery
    ? fundraisers.filter(
        (fundraiser) =>
          fundraiser.curAmount &&
          fundraiser.curAmount < fundraiser.goalAmount &&
          fundraiser.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : fundraisers

  useEffect(() => {
    const fetchSellerData = async () => {
      const charities = await getCharityDataByFundraisers({ fundraisers })
      setCharities(charities)
    }

    fetchSellerData()
  }, [fundraisers])

  useEffect(() => {
    // Sort the filteredFundraisers array based on createdAt
    const sortedFiltered = [...filteredFundraisers].sort((p1, p2) => {
      if (sortEnabled) {
        const createdAt1 = p1.createdAt ? p1.createdAt.seconds : 0
        const createdAt2 = p2.createdAt ? p2.createdAt.seconds : 0

        return createdAt2 - createdAt1
      } else {
        return 0
      }
    })
    // Update the state with the sorted fundraisers
    setSortedFiltered(sortedFiltered)
  }, [filteredFundraisers, sortEnabled])

  const handleSortToggle = () => {
    setSortEnabled(!sortEnabled)
  }

  return (
    <div>
      {/* Checkbox for sort toggle */}
      <label className="mr-2">
        <input type="checkbox" checked={sortEnabled} onChange={handleSortToggle} />
        Sort by Most Recent
      </label>
      <h1 className="block w-full my-4">
        Showing {fundraisers.length} result(s) for: {category}
      </h1>
      <div className="grid text-left gap-y-6 sm:grid-cols-3 lg:grid-cols-5 gap-x-4">
        {sortedFiltered.length === 0 ? (
          <div className="text-gray-500">No Fundraisers found</div>
        ) : (
          sortedFiltered.map((fundraiser, index) => (
            <div
              key={fundraiser.id}
              className="relative p-2 bg-white hover:shadow-md"
              onClick={() => handleClick(fundraiser.id)}
            >
              <div className="flex flex-col">
                {/*upper*/}
                <div className="flex">
                  {charities.length > 0 && <SmallProfileAvatar charity={charities[index]} />}
                  <div className="flex flex-col">
                    <p className="block ml-2 font-semibold text-gray-800 text-md">
                      {charities.length > 0 && charities[index]
                        ? charities[index].name
                        : 'Unknown Charity'}
                    </p>
                    <p className="block ml-2 text-sm text-gray-500">
                      <p className="block ml-2 text-sm text-gray-500">
                        {fundraiser.createdAt && fundraiser.createdAt.toDate().toLocaleString()}
                      </p>
                    </p>
                  </div>
                </div>
                <div className="mt-2 aspect-w-1 aspect-h-1">
                  <img
                    src={fundraiser.image}
                    alt={fundraiser.name}
                    className="object-cover rounded-md"
                  />
                </div>

                {/*lower*/}
                <div className="mt-2 mb-10">
                  <h2 className="text-gray-800 text-md">{fundraiser.name}</h2>
                  <div className="flex flex-col justify-end">
                    <p className="text-sm text-gray-500">{fundraiser.description}</p>

                    <p className="mt-2 text-gray-700">Goal Amount: {fundraiser.goalAmount}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default FundraiserGrid
