import {
  doc,
  setDoc,
  collection,
  getDocs,
  getDoc,
  query,
  where,
  serverTimestamp,
  updateDoc,
  increment
} from 'firebase/firestore'
import { getFirestore } from 'firebase/firestore'
import { Product, CharityData } from '@/utils/constants/constants'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

const firestore = getFirestore()
const storage = getStorage()
export const getAllProductsFromCharity = async (uid: string): Promise<Product[] | null> => {
  try {
    const q = query(collection(firestore, 'products'), where('charityId', '==', uid))
    const productSnapshot = await getDocs(q)

    const products: Product[] = productSnapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        name: data.name,
        description: data.description,
        price: data.price,
        image: data.image,
        charityId: data.charityId,
        category: data.category,
        quantity: data.quantity || 0,
        createdAt: data.createdAt,
        numLikes: data.numLikes || 0
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
        charityId: productData.charityId,
        category: productData.category,
        createdAt: productData.createdAt,
        quantity: productData.quantity,
        numLikes: productData.numLikes
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
    const charityIds = products.map((product) => product.charityId)
    const charities: CharityData[] = []

    for (const charityId of charityIds) {
      const docRef = doc(firestore, 'charities', charityId)
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
    const charityId = product.charityId
    const docRef = doc(firestore, 'charities', charityId)
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

export const getProductName = async (productId: string) => {
  try {
    const collectionRef = collection(firestore, 'products')
    const docQuery = query(collectionRef, where('id', '==', productId))
    const querySnapshot = await getDocs(docQuery)
    if (!querySnapshot.empty) {
      const productDoc = querySnapshot.docs[0]
      const productData = productDoc.data()
      const productname = productData.name

      return productname
    }
  } catch (error) {
    console.error('Error fetching product name:', error)
    return null
  }
}

export const incrementProductLikes = async (productId: string) => {
  try {
    const docRef = doc(firestore, 'products', productId)
    await updateDoc(docRef, {
      numLikes: increment(1)
    })
  } catch (error) {
    console.error('Error updating product likes:', error)
  }
}

export const decrementProductLikes = async (productId: string) => {
  try {
    const docRef = doc(firestore, 'products', productId)
    await updateDoc(docRef, {
      numLikes: increment(-1)
    })
  } catch (error) {
    console.error('Error updating product likes:', error)
  }
}
