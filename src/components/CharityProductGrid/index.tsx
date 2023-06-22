import { useEffect, useState } from 'react'
import { getAllProducts } from '../../pages/api/allproduct'
// import { CharityData, Product } from '@/utils/constants/constants'
import { useRouter } from 'next/router'
// import { doc, getDoc } from 'firebase/firestore'
// import { getFirestore } from 'firebase/firestore'
import { Product } from '@/utils/constants/constants'

interface CharityProductGridProps {
  searchQuery?: string
  sellerId?: string
}

const CharityProductGrid: React.FC<CharityProductGridProps> = ({ searchQuery, sellerId }) => {
  const router = useRouter()
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

        setProducts(filteredProducts) // Update the state with filtered products
      }
    }

    fetchProducts()
  }, [sellerId, router.query])

  const filteredProducts = searchQuery
    ? products.filter(
        (product) =>
          product.available && product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products

  //   useEffect(() => {
  //     const fetchSellerData = async () => {
  //       const charities = await fetchSellerDetails({ products })
  //       setCharities(charities)
  //     }

  //     fetchSellerData()
  //   }, [products])

  //   const fetchSellerDetails = async ({ products }: { products: Product[] }) => {
  //     try {
  //       const sellerIds = products.map((product) => product.sellerId)
  //       const firestore = getFirestore()
  //       const charities: CharityData[] = []

  //       for (const sellerId of sellerIds) {
  //         const docRef = doc(firestore, 'charities', sellerId)
  //         const docSnap = await getDoc(docRef)

  //         if (docSnap.exists()) {
  //           const userData = docSnap.data()
  //           const charity = userData as CharityData
  //           if (charity) {
  //             charities.push(charity)
  //           }
  //         }
  //       }

  //       return charities
  //     } catch (error) {
  //       console.error('Error fetching charity names:', error)
  //       return []
  //     }
  //   }

  return (
    <div className="grid gap-4 text-left sm:grid-cols-3 lg:grid-cols-5">
      {filteredProducts.length === 0 ? (
        <div className="text-gray-500">No items found</div>
      ) : (
        filteredProducts.map((product) => (
          <div
            key={product.id}
            className="p-2 bg-white hover:shadow-md"
            onClick={() => handleClick(product.id)}
          >
            <div className="grid h-full grid-cols-1 gap-2">
              <div className=" aspect-w-1 aspect-h-1">
                <img src={product.image} alt={product.name} className="object-cover rounded-md" />
              </div>
              <h2 className="text-gray-800 text-md">{product.name}</h2>
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

export default CharityProductGrid
