import React from 'react'
import ProductGrid from '@/components/ProductGrid'
import SearchBar from '@/components/SearchBar'
import { useState } from 'react'
import CategorySidebar from '@/components/CategoryBar'
import CategoryBanner from '@/components/CategoryBanner'
interface ProductPageProps {
  searchQuery?: string
}
const ProductPage: React.FC<ProductPageProps> = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }
  return (
    <div className="p-6 mx-6">
      <CategorySidebar></CategorySidebar>
      <SearchBar onSearch={handleSearch}></SearchBar>
      <div className="mt-6">
        <CategoryBanner />
      </div>
      <div className="mt-6">
        <ProductGrid searchQuery={searchQuery}></ProductGrid>
      </div>
    </div>
  )
}

export default ProductPage
