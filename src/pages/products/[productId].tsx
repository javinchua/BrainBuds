import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getProductById } from '../api/product' // Replace with your API call to fetch the product data
import ProductDetail from '@/components/ProductDetail'
import { Product, userTypes } from '@/utils/constants/constants'
import PrivateRoute from 'context/PrivateRoute'

const ProductPage = () => {
  const router = useRouter()
  const { productId } = router.query
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      if (typeof productId === 'string') {
        const productData: Product | null = await getProductById(productId)
        setProduct(productData)
      }
    }

    fetchProduct()
  }, [productId])

  if (!product) {
    // Handle case when product is not found or still loading
    return <div className="flex items-center justify-center h-screen text-gray-700">Loading...</div>
  }

  return (
    <PrivateRoute allowedUserTypes={[userTypes.DONOR]}>
      <div className="min-h-screen py-10 bg-purple-100">
        <div className="max-w-5xl px-4 mx-auto">
          <ProductDetail product={product} />
        </div>
      </div>
    </PrivateRoute>
  )
}

export default ProductPage
