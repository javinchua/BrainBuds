import { getFirestore } from 'firebase/firestore'
import { Product } from '@/utils/constants/constants'
import Link from 'next/link'
import { CharityProfile } from '../CharityProfile'
import { useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { useState } from 'react'

interface ProductPageProps {
  product: Product
}
const firestore = getFirestore()

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
  const [sellerName, setSellerName] = useState<string>('')

  const fetchCharityData = async () => {
    const docRef = doc(firestore, 'charities', product.sellerId)
    const docSnap = await getDoc(docRef)

    // Access the data from the document snapshot
    if (docSnap.exists()) {
      const sellerData = docSnap.data()
      const sellerName = sellerData.name
      setSellerName(sellerName)
      // Process the seller data here
    }
  }

  useEffect(() => {
    fetchCharityData()
  }, [])

  return (
    <div className="p-4 mt-10">
      {/*image*/}
      <div className="flex justify-center mb-10 bg-neutral-300">
        <div className="relative">
          <div className="rounded-full">
            <img src={product.image} alt={product.name} className="object-contain" />
          </div>
          <div className="absolute inset-0 bg-gray-200 opacity-50"></div>
        </div>
      </div>

      {/*header for product*/}
      <div className="flex">
        <div className="w-[70%]">
          <h1 className="text-2xl">{product.name}</h1>
          <div className="flex">
            <li>Meet up</li>
            <li></li>
          </div>
        </div>
        <div className="w-[30%] mt-4">
          <div className="flex flex-col p-4 text-center shadow-md border-neutral-800">
            <h1 className="py-4 text-lg font-bold">{sellerName}</h1>
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

      <div className="my-4">
        <h2 className="py-4 text-xl font-semibold">Description</h2>
        <div className="flex mb-4">
          <div className="w-1/2">
            <h1>Posted</h1>
          </div>
          <div className="w-1/2">
            <h1>category</h1>
          </div>
        </div>
        <p>{product.description}</p>
      </div>

      {/* seller description*/}

      <div className="my-4">
        <h1 className="py-4 text-xl font-semibold">Meet the charity</h1>
        <CharityProfile></CharityProfile>
      </div>
    </div>
  )
}

export default ProductPage
