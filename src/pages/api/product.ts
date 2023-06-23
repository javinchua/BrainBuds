import { doc, setDoc, collection, getDocs, query, where, serverTimestamp } from 'firebase/firestore'
import { getFirestore } from 'firebase/firestore'
import { Product } from '@/utils/constants/constants'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

const firestore = getFirestore()
const storage = getStorage()
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
        category: data.category,
        quantity: data.quantity || 0,
        createdAt: data.createdAt
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
    if (data.file) {
      const url = await handleImageUpload(data.file)
      if (url) {
        data.image = url
      }
      delete data.file
    }
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
    if (data.file) {
      const url = await handleImageUpload(data.file)
      if (url) {
        data.image = url
      }
      delete data.file
    }
    const collectionRef = collection(firestore, 'products')
    const docRef = doc(collectionRef)
    const docId = docRef.id
    await setDoc(docRef, {
      ...data,
      id: docId,
      createdAt: serverTimestamp()
    })
    return {
      ...data,
      id: docId
    } as Product
  } catch (error) {
    console.error('Error adding new product:', error)
    return null
  }
}

const handleImageUpload = async (file: File) => {
  try {
    // Create a reference to the file in Firebase Storage
    const storageRef = ref(storage, 'images/' + file.name)

    // Upload the file to Firebase Storage
    await uploadBytes(storageRef, file)

    // Get the download URL of the uploaded file
    const downloadURL = await getDownloadURL(storageRef)

    return downloadURL
  } catch (error) {
    // Handle any errors that occur during the upload process
    console.error('Error uploading image:', error)
  }
}
