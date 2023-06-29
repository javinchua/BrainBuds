import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { getFirestore } from 'firebase/firestore'
import { Donor } from '@/utils/constants/constants'

const firestore = getFirestore()

export const updateDonorInfo = async (data: Donor, uid: string) => {
  try {
    const docRef = doc(firestore, 'donors', uid)
    setDoc(docRef, {
      ...data,
      id: uid
    })
    return null
  } catch (error) {
    console.error('Error updating donor info:', error)
    return null
  }
}
export const getDonorLikedProductIds = async (id: string) => {
  try {
    const donorRef = doc(firestore, 'donors', id)
    const likedProductsRef = collection(donorRef, 'LikedProducts')
    const docRef = doc(likedProductsRef, 'likedProducts')
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const likedProductsData = docSnap.data()
      const likedProductIds = likedProductsData.likedProducts || []
      return likedProductIds
    } else {
      return []
    }
  } catch (error) {
    console.error('Error getting liked items:', error)
    throw error
  }
}

export const updateDonorLikedProducts = async (newData: string[], donorId: string) => {
  try {
    const donorRef = doc(firestore, 'donors', donorId)
    const likedProductsRef = collection(donorRef, 'LikedProducts')
    const docRef = doc(likedProductsRef, 'likedProducts')
    await setDoc(docRef, { likedProducts: newData })
  } catch (error) {
    console.error('Error updating likedProducts info:', error)
    throw error
  }
}

export const updateDonorLikedProductsById = async (newId: string, donorId: string) => {
  try {
    const donorRef = doc(firestore, 'donors', donorId)
    const likedProductsRef = collection(donorRef, 'LikedProducts')
    const docRef = doc(likedProductsRef, 'likedProducts')
    await setDoc(docRef, { [newId]: true }, { merge: true })
  } catch (error) {
    console.error('Error updating likedProducts info:', error)
    throw error
  }
}
