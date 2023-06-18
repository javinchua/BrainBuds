import { useEffect, useState } from 'react'
import { getAllProducts } from '../../pages/api/allproduct'
import { Product } from '@/utils/constants/constants'

//should only show if is available.

const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await getAllProducts()
      if (productsData) {
        setProducts(productsData)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className="grid grid-cols-5 gap-4">
      {products
        .filter((product) => product.available) // Filter out products that are not available
        .map((product) => (
          <div key={product.id} className="p-4 bg-white shadow">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-500">{product.description}</p>
            <p className="mt-2 text-gray-700">${product.price}</p>
            <img src={product.image} alt={product.name} className="w-full mt-4" />
          </div>
        ))}
    </div>
  )
}

export default ProductGrid
