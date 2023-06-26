import { useEffect, useState } from 'react'
import { getAllProducts } from '../../pages/api/allproduct'
import { CharityData, Product, userTypes } from '@/utils/constants/constants'
import { useRouter } from 'next/router'
import {
  decrementProductLikes,
  getCharityDataByProducts,
  incrementProductLikes
} from 'pages/api/product'
import SmallProfileAvatar from '../smallProfileAvatar'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { updateDonorLikedProducts } from 'pages/api/donor'
import { getDonorLikedProductIds } from 'pages/api/donor'
import { useAuth } from 'context/AuthContext'
import { Typography } from '@mui/material'

interface ProductGridProps {
  searchQuery?: string
}

const ProductGrid: React.FC<ProductGridProps> = ({ searchQuery }) => {
  const { user } = useAuth()
  const router = useRouter()
  const { sellerId = '', category = '' } = router.query || {}
  const [products, setProducts] = useState<Product[]>([])
  const [charities, setCharities] = useState<CharityData[]>([])
  const [sortedFiltered, setSortedFiltered] = useState<Product[]>([])
  const [sortEnabled, setSortEnabled] = useState(false)
  const [likedProductIds, setLikedProductIds] = useState<string[]>([])

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
          product.quantity &&
          product.quantity > 0 &&
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products

  useEffect(() => {
    const fetchSellerData = async () => {
      const charities = await getCharityDataByProducts({ products })
      setCharities(charities)
    }

    fetchSellerData()
  }, [products])

  useEffect(() => {
    // Sort the filteredProducts array based on createdAt
    const sortedFiltered = [...filteredProducts].sort((p1, p2) => {
      if (sortEnabled) {
        const createdAt1 = p1.createdAt ? p1.createdAt.seconds : 0
        const createdAt2 = p2.createdAt ? p2.createdAt.seconds : 0
        return createdAt2 - createdAt1
      } else {
        return 0
      }
    })
    // Update the state with the sorted products
    setSortedFiltered(sortedFiltered)
  }, [filteredProducts, sortEnabled])

  const handleSortToggle = () => {
    setSortEnabled(!sortEnabled)
  }

  useEffect(() => {
    console.log(user.uid)
    const fetchDonorLikedProducts = async () => {
      if (user.uid) {
        const likedProductIds = await getDonorLikedProductIds(user.uid)
        if (likedProductIds) {
          setLikedProductIds(likedProductIds)
        }
      }
    }
    fetchDonorLikedProducts()
  }, [user.uid])

  const handleLike = async (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
    event.stopPropagation() // Stop event propagation

    const product = sortedFiltered[index]
    if (user.uid && user.type === userTypes.DONOR) {
      const updatedLikedProductIds = likedProductIds?.includes(product.id)
        ? likedProductIds.filter((id) => id !== product.id)
        : [...likedProductIds, product.id]

      setLikedProductIds(updatedLikedProductIds)
      if (updatedLikedProductIds.includes(product.id)) {
        await incrementProductLikes(product.id)
      } else {
        await decrementProductLikes(product.id)
      }
      await updateDonorLikedProducts(updatedLikedProductIds, user.uid)
      setSortedFiltered((prevProducts) =>
        prevProducts.map((prevProduct, idx) => {
          if (idx === index) {
            return {
              ...prevProduct,
              numLikes: updatedLikedProductIds.includes(prevProduct.id)
                ? prevProduct.numLikes + 1
                : prevProduct.numLikes - 1
            }
          }
          return prevProduct
        })
      )
    }
  }

  return (
    <div>
      {/* Checkbox for sort toggle */}
      <label className="mr-2">
        <input type="checkbox" checked={sortEnabled} onChange={handleSortToggle} />
        Sort by Most Recent
      </label>
      <h1 className="block w-full my-4">
        Showing {products.length} result(s) for: {category}
      </h1>
      <div className="grid text-left gap-y-6 sm:grid-cols-3 lg:grid-cols-5 gap-x-4">
        {sortedFiltered.length === 0 ? (
          <div className="text-gray-500">No Products found</div>
        ) : (
          sortedFiltered.map((product, index) => (
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
                        {product.createdAt
                          ? product.createdAt?.toDate().toLocaleString()
                          : 'Unknown'}
                      </p>
                    </p>
                  </div>
                </div>
                <div className="mt-2 aspect-w-1 aspect-h-1">
                  <img src={product.image} alt={product.name} className="object-cover rounded-md" />
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
                <div className="absolute flex left-2 bottom-2">
                  <button onClick={(event) => handleLike(event, index)} className="mr-2">
                    {likedProductIds.includes(product.id) ? (
                      <FavoriteIcon />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </button>
                  <Typography variant="body1">{product.numLikes}</Typography>
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
