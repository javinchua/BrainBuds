import React from 'react'
import CharityGridComponent from '@/components/CharityGrid'
import { useState } from 'react'
import SearchBar from '@/components/SearchBar'
interface ProductPageProps {
  searchQuery?: string
}
const AllCharitiesPage: React.FC<ProductPageProps> = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-navy to-purple-200">
      <SearchBar onSearch={handleSearch}></SearchBar>
      <div className="mt-6">{/* <CategoryBanner /> */}</div>
      <div className="mt-6">
        <CharityGridComponent searchQuery={searchQuery}></CharityGridComponent>
      </div>
    </div>
  )
}

export default AllCharitiesPage
