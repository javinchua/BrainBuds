import { doc, setDoc, collection, getDocs, query, where, getDoc } from 'firebase/firestore'
import { getFirestore } from 'firebase/firestore'
import { Product } from '@/utils/constants/constants'
import { CharityData } from '@/utils/constants/constants'
const firestore = getFirestore()

export const getAllProductsFromCharity = async (uid: string): Promise<Product[] | null> => {
  try {
    const productRef = collection(firestore, `charities/${uid}/products`)
    const productSnapshot = await getDocs(productRef)

    const products: Product[] = productSnapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        name: data.name,
        description: data.description,
        price: data.price,
        image: data.image,
        editing: false,
        available: data.available,
        sellerId: data.sellerId,
        sellerName: data.sellerName,
        category: data.category,
        delivery: data.delivery,
        createdAt: data.createdAt
      }
    })
    return products
  } catch (error) {
    console.error('Error getting products:', error)
    return null
  }
}

export const updateProductInfo = async (data: Product, uid: string) => {
  try {
    const docRef = doc(firestore, `charities/${uid}/products`, data.id)
    setDoc(docRef, data)
    return null
  } catch (error) {
    console.error('Error updating product info:', error)
    return null
  }
}

export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const productRef = collection(firestore, 'products')
    const q = query(productRef, where('id', '==', id))
    const productSnapshot = await getDocs(q)
    if (!productSnapshot.empty) {
      const productDoc = productSnapshot.docs[0]
      const productData = productDoc.data()
      const product: Product = {
        id: productDoc.id,
        name: productData.name,
        description: productData.description,
        price: productData.price,
        image: productData.image,
        editing: false,
        available: false,
        sellerId: productData.sellerId,
        sellerName: productData.sellerName,
        category: productData.category,
        delivery: productData.delivery,
        createdAt: productData.createdAt
      }
      return product
    } else {
      return null // Product not found
    }
  } catch (error) {
    console.error('Error getting product:', error)
    return null
  }
}
export const getCharityDataByProducts = async ({ products }: { products: Product[] }) => {
  try {
    const sellerIds = products.map((product) => product.sellerId)
    const charities: CharityData[] = []

    for (const sellerId of sellerIds) {
      const docRef = doc(firestore, 'charities', sellerId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const userData = docSnap.data()
        const charity = userData as CharityData
        if (charity) {
          charities.push(charity)
        }
      }
    }

    return charities
  } catch (error) {
    console.error('Error fetching charity names:', error)
    return []
  }
}

export const getCharityDataByProduct = async ({ product }: { product: Product }) => {
  try {
    const sellerId = product.sellerId
    const docRef = doc(firestore, 'charities', sellerId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const userData = docSnap.data()
      const charity = userData as CharityData
      return charity
    } else {
      return null
    }
  } catch (error) {
    console.error('Error fetching charity names:', error)
    return null
  }
}
