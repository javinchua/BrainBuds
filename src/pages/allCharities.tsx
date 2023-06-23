import { CharityProfile } from '@/components/CharityProfile'
import { getAllCharities } from './api/charity'
import { useEffect, useState } from 'react'
import { CharityData } from '@/utils/constants/constants'

const AllCharities = () => {
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
  return (
    <div className="h-screen bg-gradient-to-br from-navy to-purple-200">
      <div className="py-10 mx-10">
        <h1 className="text-2xl font-semibold text-white">All Charities</h1>
        <div className="grid grid-cols-2 gap-6 mt-10">
          {charities.map((charity, index) => (
            <div className="p-2 text-white bg-white rounded-md shadow-md bg-opacity-10" key={index}>
              <CharityProfile charity={charity} key={index}></CharityProfile>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AllCharities
