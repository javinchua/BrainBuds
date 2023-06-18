import { doc, setDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { getFirestore } from 'firebase/firestore'
import { Product } from '@/utils/constants/constants'

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
        sellerId: data.sellerId
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
        sellerId: productData.sellerId
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

export const getSellerNameById = async (sellerId: string) => {
  try {
    const sellerRef = collection(firestore, 'sellers')
    const q = query(sellerRef, where('id', '==', sellerId))
    const sellerSnapshot = await getDocs(q)
    if (!sellerSnapshot.empty) {
      const sellerDoc = sellerSnapshot.docs[0]
      const sellerData = sellerDoc.data()
      const sellerName = sellerData.name
      return sellerName
    }
    return null
  } catch (error) {
    console.error('Error getting seller name:', error)
    return null
  }
}
