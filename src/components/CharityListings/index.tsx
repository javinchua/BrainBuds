import React from 'react'
import ProductGrid from '@/components/ProductGrid'
import { useState } from 'react'
import SearchBar from '@/components/SearchBar'

interface CharityListingsProps {
  sellerId: string
}
const CharityListings: React.FC<CharityListingsProps> = ({ sellerId }) => {
  const [searchQuery, setSearchQuery] = useState<string>('')

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }
  return (
    <div className="mt-20">
      <SearchBar onSearch={handleSearch} />
      <div className="flex">
        <div className="w-[40%]"></div>

        <div className="flex flex-col m-10 shadow-md">
          <div className="text-2xl font-bold">
            <h1>Listings</h1>
          </div>
          <ProductGrid searchQuery={searchQuery} sellerId={sellerId}></ProductGrid>
        </div>
      </div>
    </div>
  )
}

export default CharityListings
