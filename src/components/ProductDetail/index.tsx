import { getFirestore } from 'firebase/firestore'
import { CharityData, Product } from '@/utils/constants/constants'
import Link from 'next/link'
import { CharityProfile } from '../CharityProfile'
import { useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { useState } from 'react'
import { FiMapPin } from 'react-icons/fi'
import ProductIcon from '../ProductIcon'
import { FaHandshake } from 'react-icons/fa'
interface ProductDetailProps {
  product: Product
}
const firestore = getFirestore()

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const [charity, setCharity] = useState<CharityData>()

  const fetchCharityData = async () => {
    const docRef = doc(firestore, 'charities', product.sellerId)
    const docSnap = await getDoc(docRef)

    // Access the data from the document snapshot
    if (docSnap.exists()) {
      const charityData = docSnap.data() as CharityData
      setCharity(charityData)

      // Process the seller data here
    }
  }

  useEffect(() => {
    fetchCharityData()
  }, [])

  return (
    <div className="h-screen p-10 mt-10">
      {/*image*/}
      <div className="flex justify-center bg-neutral-300">
        <div className="relative">
          <div className="rounded-full">
            <img src={product.image} alt={product.name} className="object-contain" />
          </div>
          <div className="absolute inset-0 bg-gray-200 opacity-50"></div>
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
            <Link href="/checkout" className="w-full py-4 font-bold text-red-100 bg-purple">
              Donate
            </Link>
            <Link href="/chat" className="w-full py-4 bg-gray-100 ">
              Chat
            </Link>
          </div>
        </div>
      </div>

      {/* product description*/}
      <div className="pb-10 mt-10 border-b">
        <h2 className="text-2xl font-semibold ">Description</h2>
        <div className="flex mb-4">
          <div className="w-1/2">
            <h1>Posted: {product.createdAt}</h1>
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
