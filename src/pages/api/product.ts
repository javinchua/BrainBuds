import { doc, setDoc, collection, getDocs } from 'firebase/firestore'
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
        editing: false
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
