import React from 'react'
import { Product } from '@/utils/constants/constants'

interface ProductPageProps {
  product: Product
}

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      {/* Display other product information */}
    </div>
  )
}

export default ProductPage
