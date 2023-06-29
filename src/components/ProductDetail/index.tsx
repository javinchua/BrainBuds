import { CharityData, Product, userTypes } from '@/utils/constants/constants'
import { CharityProfile } from '../CharityProfile'
import { useEffect } from 'react'
import {
  decrementProductLikes,
  getCharityDataByProduct,
  incrementProductLikes
} from 'pages/api/product'
import { useState } from 'react'
import { FiMapPin } from 'react-icons/fi'
import ProductIcon from '../ProductIcon'
import { FaHandshake } from 'react-icons/fa'
import ChatComponent from '../Chat/ChatComponent'
import DonateModal from '../DonationModal'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useAuth } from 'context/AuthContext'
import { getDonorLikedProductIds, updateDonorLikedProductsById } from 'pages/api/donor'

interface ProductDetailProps {
  product: Product
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const { user } = useAuth()
  const [charity, setCharity] = useState<CharityData>()
  const [isLiked, setIsLiked] = useState<boolean>()
  const [donorLikedProductIds, setDonorLikedProductIds] = useState<string[]>([])
  const [numLikes, setNumLikes] = useState<number>(product.numLikes)
  useEffect(() => {
    const fetchDonorData = async () => {
      if (user.type == userTypes.DONOR && user.uid) {
        const productIds = await getDonorLikedProductIds(user.uid)
        setDonorLikedProductIds(productIds)
      }
    }
    fetchDonorData()
  }, [])

  useEffect(() => {
    if (donorLikedProductIds.includes(product.id) && user.uid) {
      setIsLiked(true)
    }
  }, [user, product])

  const handleLike = () => {
    setIsLiked(!isLiked)
    const updatedNumLikes = isLiked ? numLikes - 1 : numLikes + 1
    setNumLikes(updatedNumLikes)
    if (user.uid) {
      updateDonorLikedProductsById(product.id, user.uid)
      if (isLiked) {
        incrementProductLikes(product.id)
      } else {
        decrementProductLikes(product.id)
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCharityDataByProduct({ product })
      if (data) {
        setCharity(data)
      }
    }

    fetchData()
  }, [product])

  return (
    <div className="h-screen p-10 mt-10">
      {/*image*/}
      <div className="z-0 flex justify-center bg-neutral-300">
        <div className="relative">
          <div className="absolute flex p-2 shadow-md right-2 top-2">
            <button onClick={handleLike} className="z-[2]">
              {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </button>
            <p>{numLikes} likes</p>
          </div>
          <div className="rounded-full">
            <img src={product.image} alt={product.name} className="object-contain" />
          </div>
          <div className="absolute inset-0 bg-gray-200 opacity-10"></div>
        </div>
      </div>

      {/*header for product*/}
      <div className="flex pb-4 mt-10 border-b">
        <div className="w-[70%]">
          <h1 className="text-3xl">{product.name}</h1>
          <div className="flex mt-6">
            <div className="flex w-1/2 text-lg">
              <ProductIcon icon={<FaHandshake></FaHandshake>}></ProductIcon>
              <h1 className="w-1/2 ml-4">Meet up</h1>
            </div>
            <div className="flex w-1/2 text-lg">
              <ProductIcon icon={<FiMapPin></FiMapPin>}></ProductIcon>
              <p className="ml-4">Location</p>
            </div>
          </div>
        </div>
        <div className="w-[30%] mt-4">
          <div className="flex flex-col p-4 text-center shadow-md border-neutral-800">
            <h1 className="py-4 text-lg font-bold">{charity ? charity.name : 'Unknown'}</h1>
            <DonateModal product={product} />
            <ChatComponent productId={product.id} charityId={charity?.id} />
          </div>
        </div>
      </div>

      {/* product description*/}
      <div className="pb-10 mt-10 border-b">
        <h2 className="text-2xl font-semibold ">Description</h2>
        <div className="flex mb-4">
          <div className="w-1/2">
            <h1>Posted: {product.createdAt?.toDate().toLocaleString() || 'Unknown'}</h1>
          </div>
          <div className="w-1/2">
            <h1>Category: {product.category}</h1>
          </div>
        </div>
        <p>{product.description}</p>
      </div>

      {/* seller description*/}
      <div className="mt-10">
        <h1 className="mb-10 text-2xl font-semibold">Meet the charity</h1>
        <CharityProfile charity={charity}></CharityProfile>
      </div>
    </div>
  )
}

export default ProductDetail
