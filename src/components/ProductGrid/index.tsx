import { useEffect, useState } from 'react'
import { getAllProducts } from '../../pages/api/allproduct'
import { Product } from '@/utils/constants/constants'
import { useRouter } from 'next/router'
import { doc, getDoc } from 'firebase/firestore'
import { getFirestore } from 'firebase/firestore'

interface ProductGridProps {
  searchQuery?: string
}

const ProductGrid: React.FC<ProductGridProps> = ({ searchQuery }) => {
  const router = useRouter()
  const { sellerId = '', category = '' } = router.query || {}
  const [products, setProducts] = useState<Product[]>([])
  const [sellerNames, setSellerNames] = useState<string[]>([])
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
      const names = await fetchSellerNames({ products })
      setSellerNames(names)
    }

    fetchSellerData()
  }, [])
  const fetchSellerNames = async ({ products }: { products: Product[] }) => {
    try {
      const sellerIds = products.map((product) => product.sellerId)
      const firestore = getFirestore()
      const sellerNames: string[] = []

      for (const sellerId of sellerIds) {
        const docRef = doc(firestore, 'charities', sellerId)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const userData = docSnap.data()
          const sellerName = userData.name
          if (sellerName) {
            sellerNames.push(sellerName)
          }
        }
      }

      return sellerNames
    } catch (error) {
      console.error('Error fetching seller names:', error)
      return []
    }
  }

  return (
    <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-5">
      {filteredProducts.length === 0 ? (
        <div className="text-gray-500">No items found</div>
      ) : (
        filteredProducts.map((product, index) => (
          <div
            key={product.id}
            className="p-4 bg-white shadow hover:shadow-md"
            onClick={() => handleClick(product.id)}
          >
            <div className="grid h-full grid-cols-1 gap-2">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-purple"></div>
                <div>
                  <p className="block ml-2 font-semibold text-gray-700 text-md">
                    {sellerNames.length > 0 ? sellerNames[index] : 'Unknown Charity'}
                  </p>

                  <p className="block ml-2 text-sm text-gray-700">
                    {product.createdAt ? product.createdAt : 'Unknown'}
                  </p>
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
