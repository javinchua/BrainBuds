import { useEffect, useState } from 'react'
import { getAllFundraisers } from '../../pages/api/fundraiser'
import { useRouter } from 'next/router'
import { Fundraiser } from '@/utils/constants/constants'

interface CharityFundraiserGridProps {
  searchQuery?: string
  charityId?: string
}

const CharityFundraiserGrid: React.FC<CharityFundraiserGridProps> = ({
  searchQuery,
  charityId
}) => {
  const router = useRouter()
  const [fundraisers, setFundraisers] = useState<Fundraiser[]>([])
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

        setFundraisers(filteredFundraisers) // Update the state with filtered fundraisers
      }
    }

    fetchFundraisers()
  }, [charityId, router.query])

  const filteredFundraisers = searchQuery
    ? fundraisers.filter(
        (fundraiser) =>
          fundraiser.curAmount &&
          fundraiser.goalAmount &&
          fundraiser.curAmount < fundraiser.goalAmount &&
          fundraiser.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : fundraisers
  return (
    <div className="grid gap-4 text-left sm:grid-cols-3 lg:grid-cols-5">
      {filteredFundraisers.length === 0 ? (
        <div className="text-gray-500">No items found</div>
      ) : (
        filteredFundraisers.map((fundraiser) => (
          <div
            key={fundraiser.id}
            className="p-2 bg-white hover:shadow-md"
            onClick={() => handleClick(fundraiser.id)}
          >
            <div className="grid h-full grid-cols-1 gap-2">
              <div className=" aspect-w-1 aspect-h-1">
                <img
                  src={fundraiser.image}
                  alt={fundraiser.name}
                  className="object-cover rounded-md"
                />
              </div>
              <h2 className="text-gray-800 text-md">{fundraiser.name}</h2>
              <div className="flex flex-col justify-end">
                <p className="text-sm text-gray-500">{fundraiser.description}</p>
                <p className="mt-2 text-gray-700">Goal: ${fundraiser.goalAmount}</p>
                <p className="mt-2 text-gray-700">Current: ${fundraiser.curAmount}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default CharityFundraiserGrid
