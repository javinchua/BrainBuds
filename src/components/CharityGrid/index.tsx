import { CharityData } from '@/utils/constants/constants'
import { getAllCharities } from 'pages/api/charity'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { CharityProfile } from '../CharityProfile'

interface CharityGridProps {
  searchQuery: string
}
const CharityGrid: React.FC<CharityGridProps> = ({ searchQuery }) => {
  const [charities, setCharities] = useState<CharityData[]>([])

  useEffect(() => {
    const fetchCharities = async () => {
      const data = await getAllCharities()
      if (data) {
        setCharities(data as CharityData[])
      }
    }
    fetchCharities()
  }, [])
  const filteredCharities = searchQuery
    ? charities.filter((charity) => charity.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : charities

  return (
    <div className="py-6">
      <h1 className="text-2xl font-semibold text-white">All Charities</h1>
      <div className="grid grid-cols-2 gap-6 mt-10">
        {filteredCharities.map((charity, index) => (
          <div
            className="flex p-2 text-white bg-white rounded-md shadow-md bg-opacity-10"
            key={index}
          >
            <CharityProfile charity={charity} key={index}></CharityProfile>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CharityGrid
