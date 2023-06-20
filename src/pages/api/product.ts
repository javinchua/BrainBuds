import { doc, setDoc, collection, getDocs, addDoc, query, where } from 'firebase/firestore'
import { getFirestore } from 'firebase/firestore'
import { Product } from '@/utils/constants/constants'

const firestore = getFirestore()

export const getAllProductsFromCharity = async (uid: string): Promise<Product[] | null> => {
  try {
    const q = query(collection(firestore, 'products'), where('sellerId', '==', uid))
    const productSnapshot = await getDocs(q)

    const products: Product[] = productSnapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        name: data.name,
        description: data.description,
        price: data.price,
        image: data.image,
        sellerId: data.sellerId,
        category: data.category
      }
    })

    return products
  } catch (error) {
    console.error('Error getting products:', error)
    return null
  }
}

export const updateProductInfo = async (data: Product) => {
  try {
    const docRef = doc(firestore, `products`, data.id)
    setDoc(docRef, data)
    return data as Product
  } catch (error) {
    console.error('Error updating product info:', error)
    return null
  }
}

export const addNewProduct = async (data: Product) => {
  try {
    const collectionRef = collection(firestore, `products`)
    const docRef = await addDoc(collectionRef, data)
    return {
      ...data,
      id: docRef.id
    } as Product
  } catch (error) {
    console.error('Error adding new product:', error)
    return null
  }
}
