import React from 'react'
import ProductGrid from '@/components/ProductGrid'
import SearchBar from '@/components/SearchBar'
import { useState } from 'react'
const ProductDonor = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  return (
    <div className="mx-6 mt-8">
      <h1 className="mb-2 text-xl font-bold">What would you like to donate today?</h1>
      <SearchBar onSearch={handleSearch} />
      <ProductGrid searchQuery={searchQuery}></ProductGrid>
    </div>
  )
}

export default ProductDonor
