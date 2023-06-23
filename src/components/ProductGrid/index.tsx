import { useEffect, useState } from 'react'
import { getAllProducts } from '../../pages/api/allproduct'
import { CharityData, Product } from '@/utils/constants/constants'
import { useRouter } from 'next/router'
import { getCharityDataByProducts } from 'pages/api/product'
import SmallProfileAvatar from '../smallProfileAvatar'

interface ProductGridProps {
  searchQuery?: string
}

const ProductGrid: React.FC<ProductGridProps> = ({ searchQuery }) => {
  const router = useRouter()
  const { sellerId = '', category = '' } = router.query || {}
  const [products, setProducts] = useState<Product[]>([])
  const [charities, setCharities] = useState<CharityData[]>([])
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

  useEffect(() => {
    const fetchSellerData = async () => {
      const charities = await getCharityDataByProducts({ products })
      setCharities(charities)
    }

    fetchSellerData()
  }, [products])

  return (
    <div>
      <h1 className="block w-full my-4">
        Showing {products.length} result(s) for: {category}
      </h1>
      <div className="grid gap-4 text-left sm:grid-cols-3 lg:grid-cols-5">
        {filteredProducts.length === 0 ? (
          <div className="text-gray-500">No items found</div>
        ) : (
          filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="p-2 bg-white hover:shadow-md"
              onClick={() => handleClick(product.id)}
            >
              <div className="flex flex-col">
                {/*upper*/}
                <div className="flex">
                  {charities.length > 0 && <SmallProfileAvatar charity={charities[index]} />}
                  <div className="flex flex-col">
                    <p className="block ml-2 font-semibold text-gray-800 text-md">
                      {charities.length > 0 && charities[index]
                        ? charities[index].name
                        : 'Unknown Charity'}
                    </p>
                    <p className="block ml-2 text-sm text-gray-500">
                      <p className="block ml-2 text-sm text-gray-500">
                        {product.createdAt
                          ? new Date(product.createdAt).toLocaleString()
                          : 'Unknown'}
                      </p>
                    </p>
                  </div>
                </div>
                <div className="mt-2 aspect-w-1 aspect-h-1">
                  <img src={product.image} alt={product.name} className="object-cover rounded-md" />
                </div>

                {/*lower*/}
                <div className="mt-2">
                  <h2 className="text-gray-800 text-md">{product.name}</h2>
                  <div className="flex flex-col justify-end">
                    <p className="text-sm text-gray-500">{product.description}</p>
                    <p className="mt-2 text-gray-700">${product.price}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ProductGrid
