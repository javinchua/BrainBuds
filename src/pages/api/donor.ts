import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { getFirestore } from 'firebase/firestore'
import { Donor } from '@/utils/constants/constants'
import { updateDoc, arrayUnion } from 'firebase/firestore'
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
    const donorDetailsRef = collection(donorRef, 'donorDetails')
    const docRef = doc(donorDetailsRef, 'likedProductIds')
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const likedProductsData = docSnap.data()
      const likedProductIds = likedProductsData.likedProductIds || []
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
    const donorDetailsRef = collection(donorRef, 'donorDetails')
    const docRef = doc(donorDetailsRef, 'likedProductIds')
    await setDoc(docRef, { likedProductIds: newData })
  } catch (error) {
    console.error('Error updating likedProducts info:', error)
    throw error
  }
}

export const updateDonorLikedProductsById = async (newId: string, donorId: string) => {
  try {
    const donorRef = doc(firestore, 'donors', donorId)
    const donorDetailsRef = collection(donorRef, 'donorDetails')
    const docRef = doc(donorDetailsRef, 'likedProductIds')
    await updateDoc(docRef, {
      likedProductIds: arrayUnion(newId)
    })
  } catch (error) {
    console.error('Error updating likedProducts info:', error)
    throw error
  }
}

export const getDonorFollowingIds = async (id: string) => {
  try {
    const donorRef = doc(firestore, 'donors', id)
    const followingRef = collection(donorRef, 'donorDetails')
    const docRef = doc(followingRef, 'followingIds')
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const followingData = docSnap.data()
      const followingIds = followingData.followingIds || []
      return followingIds
    } else {
      return []
    }
  } catch (error) {
    console.error('Error getting following:', error)
    throw error
  }
}

export const getDonorIsFollowing = async (donorId: string, charityId: string) => {
  try {
    const donorRef = doc(firestore, 'donors', donorId)
    const followingRef = collection(donorRef, 'donorDetails')
    const docRef = doc(followingRef, 'followingIds')
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const followingData = docSnap.data()
      const followingIds = followingData.followingIds || []
      if (followingIds) {
        const isFollowing = followingIds.includes(charityId)
        return isFollowing
      } else {
        return false
      }
    } else {
      return false
    }
  } catch (error) {
    console.error('Error getting following:', error)
    throw error
  }
}

export const updateDonorFollowingIds = async (newId: string, donorId: string) => {
  try {
    const donorRef = doc(firestore, 'donors', donorId)
    const followingRef = collection(donorRef, 'donorDetails')
    const docRef = doc(followingRef, 'followingIds')
    await updateDoc(docRef, {
      followingIds: arrayUnion(newId)
    })
  } catch (error) {
    console.error('Error updating following:', error)
    throw error
  }
}
