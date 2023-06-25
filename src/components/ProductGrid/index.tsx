import { useEffect, useState } from 'react'
import { getAllProducts } from '../../pages/api/allproduct'
import { CharityData, Product } from '@/utils/constants/constants'
import { useRouter } from 'next/router'
import { getCharityDataByProducts } from 'pages/api/product'
import SmallProfileAvatar from '../smallProfileAvatar'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'

interface ProductGridProps {
  searchQuery?: string
}

const ProductGrid: React.FC<ProductGridProps> = ({ searchQuery }) => {
  const router = useRouter()
  const { sellerId = '', category = '' } = router.query || {}
  const [products, setProducts] = useState<Product[]>([])
  const [charities, setCharities] = useState<CharityData[]>([])
  const [sortedFiltered, setSortedFiltered] = useState<Product[]>([])
  const [sortEnabled, setSortEnabled] = useState(false)
  const [isLiked, setIsLiked] = useState<boolean[]>([])
  const handleClick = (productId: string) => {
    router.push(`/products/${productId}`)
  }

  const handleLike = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
    event.stopPropagation() // Stop event propagation
    setIsLiked((prevState) => {
      const newState = [...prevState]
      newState[index] = !newState[index]
      return newState
    })
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
      <div className="grid gap-4 text-left sm:grid-cols-3 lg:grid-cols-5">
        {sortedFiltered.length === 0 ? (
          <div className="text-gray-500">No items found</div>
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
                <div className="absolute left-2 bottom-2">
                  <button onClick={(event) => handleLike(event, index)}>
                    {isLiked[index] ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </button>
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
