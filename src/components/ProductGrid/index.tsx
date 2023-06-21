import { useEffect, useState } from 'react'
import { getAllProducts } from '../../pages/api/allproduct'
import { Product } from '@/utils/constants/constants'
import { useRouter } from 'next/router'

interface ProductGridProps {
  searchQuery?: string
}

const ProductGrid: React.FC<ProductGridProps> = ({ searchQuery }) => {
  const router = useRouter()
  const { sellerId = '', category = '' } = router.query || {}

  const [products, setProducts] = useState<Product[]>([])

  const handleClick = (productId: string) => {
    router.push(`/products/${productId}`)
  }

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await getAllProducts()
      if (productsData) {
        let filteredProducts = productsData

        if (sellerId) {
          filteredProducts = filteredProducts.filter((product) => product.sellerId === sellerId)
        }

        if (category) {
          filteredProducts = filteredProducts.filter((product) => product.category === category)
        }

        setProducts(filteredProducts) // Update the state with filtered products
      }
    }

    fetchProducts()
  }, [sellerId, category, router.query])

  const filteredProducts = searchQuery
    ? products.filter(
        (product) =>
          product.available && product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products

  return (
    <div className="grid grid-cols-5 gap-4">
      {filteredProducts.length === 0 ? (
        <div className="text-gray-500">No items found</div>
      ) : (
        filteredProducts.map((product) => (
          <div
            key={product.id}
            className="p-4 bg-white shadow hover:shadow-md"
            onClick={() => handleClick(product.id)}
          >
            <div className="grid h-full grid-cols-1 gap-2">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-purple"></div>
                <div>
                  <p className="block ml-2 font-semibold text-gray-700">{product.sellerName}</p>
                  <p className="block ml-2 text-gray-700">{product.createdAt}</p>
                </div>
              </div>
              <div className="rounded-full aspect-w-1 aspect-h-1">
                <img src={product.image} alt={product.name} className="object-cover" />
              </div>
              <h2 className="text-md">{product.name}</h2>
              <div className="flex flex-col justify-end">
                <p className="text-sm text-gray-500">{product.description}</p>
                <p className="mt-2 text-gray-700">${product.price}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default ProductGrid
