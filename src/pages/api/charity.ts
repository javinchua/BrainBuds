import { doc, setDoc, getDoc } from 'firebase/firestore'
import { getFirestore } from 'firebase/firestore'
import { CharityData } from '@/utils/constants/constants'
const firestore = getFirestore()

export const getCharityInfo = async (uid: string): Promise<CharityData | null> => {
  try {
    const docRef = doc(firestore, 'charities', uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const userData = docSnap.data()
      return (userData as CharityData) || null
    } else {
      return null
    }
  } catch (error) {
    console.error('Error fetching charity info:', error)
    return null
  }
}

export const updateCharityInfo = async (data: CharityData, uid: string) => {
  try {
    const docRef = doc(firestore, 'charities', uid)
    setDoc(docRef, data)
    return null
  } catch (error) {
    console.error('Error updating charity info:', error)
    return null
  }
}
