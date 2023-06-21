import React from 'react'
import ProductGrid from '@/components/ProductGrid'
import SearchBar from '@/components/SearchBar'
import { useState } from 'react'
import CategorySidebar from '@/components/CategoryBar'
import { useRouter } from 'next/router'

interface ProductPageProps {
  searchQuery?: string
}
const ProductPage: React.FC<ProductPageProps> = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const router = useRouter()
  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }
  return (
    <div className="p-6 mx-6 mt-10">
      <CategorySidebar></CategorySidebar>
      <h1 className="mb-6 text-xl font-bold ">What would you like to donate today?</h1>
      <SearchBar onSearch={handleSearch}></SearchBar>
      <div className="mt-6">
        <ProductGrid searchQuery={searchQuery} query={router.query}></ProductGrid>
      </div>
    </div>
  )
}

export default ProductPage
