import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getProductById } from '../api/product' // Replace with your API call to fetch the product data
import ProductPage from '@/components/ProductPage'
import { Product } from '@/utils/constants/constants'

const ProductDetailPage = () => {
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
    return <div className="mt-10">Loading...</div>
  }

  return <ProductPage product={product} />
}

export default ProductDetailPage
