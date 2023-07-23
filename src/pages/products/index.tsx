import React from 'react'
import ProductGrid from '@/components/ProductGrid'
import SearchBar from '@/components/SearchBar'
import { useState } from 'react'
import { userTypes } from '@/utils/constants/constants'
import PrivateRoute from 'context/PrivateRoute'
interface ProductPageProps {
  searchQuery?: string
}
const ProductPage: React.FC<ProductPageProps> = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }
  return (
    <PrivateRoute allowedUserTypes={[userTypes.DONOR]}>
      <div className="px-12 py-6">
        <SearchBar onSearch={handleSearch}></SearchBar>
        <div className="mt-6">{/* <CategoryBanner /> */}</div>
        <div className="mt-6">
          <ProductGrid searchQuery={searchQuery}></ProductGrid>
        </div>
      </div>
    </PrivateRoute>
  )
}

export default ProductPage
