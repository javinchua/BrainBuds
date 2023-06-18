import { useEffect, useState } from 'react'
import { getAllProducts } from '../../pages/api/allproduct'
import { Product } from '@/utils/constants/constants'

interface ProductGridProps {
  searchQuery: string
}

//should only show if is available.

const ProductGrid: React.FC<ProductGridProps> = ({ searchQuery }) => {
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

  const filteredProducts = products.filter(
    (product) => product.available && product.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="grid grid-cols-5 gap-4">
      {filteredProducts.length === 0 ? (
        <div className="text-gray-500">No items found</div>
      ) : (
        filteredProducts.map((product) => (
          <div key={product.id} className="p-4 bg-white shadow hover:shadow-md">
            <div className="grid h-full grid-cols-1 gap-2">
              <p className="text-gray-700">{product.id}</p>
              <div className="aspect-w-1 aspect-h-1">
                <img src={product.image} alt={product.name} className="object-cover" />
              </div>
              <h2 className="font-semibold text-md">{product.name}</h2>
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
