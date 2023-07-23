import React, { useState, useEffect } from 'react'
import { getDonorLikedProductIds } from 'pages/api/donor'
import { useAuth } from 'context/AuthContext'
import { getProductById } from 'pages/api/product'
import { CharityData, Product } from '@/utils/constants/constants'
import { useRouter } from 'next/router'
import { getCharityDataByProducts } from 'pages/api/product'
import SmallProfileAvatar from '../smallProfileAvatar'
const LikedProductGrid = () => {
  const router = useRouter()
  const handleClick = (productId: string) => {
    router.push(`/products/${productId}`)
  }
  const { user } = useAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [charities, setCharities] = useState<CharityData[]>([])
  useEffect(() => {
    const fetchProducts = async () => {
      if (user.uid) {
        const likedProductIds = await getDonorLikedProductIds(user.uid)
        if (likedProductIds) {
          const productPromises = likedProductIds.map(async (productId: string) => {
            const product = await getProductById(productId)
            return product
          })
          const products = await Promise.all(productPromises)
          setProducts(products)
        }
      }
    }
    fetchProducts()
  }, [user])

  useEffect(() => {
    const fetchSellerData = async () => {
      const charities = await getCharityDataByProducts({ products })
      setCharities(charities)
    }

    fetchSellerData()
  }, [products])
  return (
    <div className="grid grid-cols-5 gap-4 text-left sm:grid-cols-3">
      {products.length === 0
        ? 'No products found'
        : products.map((product, index) => {
            return (
              product && (
                <div
                  key={product.id}
                  className="relative p-2 bg-white hover:shadow-md"
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
                            {product.createdAt && product.createdAt.toDate().toLocaleString()}
                          </p>
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 aspect-w-1 aspect-h-1">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="object-cover rounded-md"
                      />
                    </div>

                    {/*lower*/}
                    <div className="mt-2 mb-10">
                      <h2 className="text-gray-800 text-md">{product.name}</h2>
                      <div className="flex flex-col justify-end">
                        <p className="text-sm text-gray-500">{product.description}</p>
                        <p className="mt-2 text-gray-700">Target: ${product.price}</p>
                        <p className="mt-2 text-gray-700">Quantity needed: {product.quantity}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )
          })}
    </div>
  )
}

export default LikedProductGrid
