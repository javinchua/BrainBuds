import {
  getFirestore,
  collection,
  serverTimestamp,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  setDoc
} from '@firebase/firestore'
import { Donation, DonationTypes } from '@/utils/constants/constants'
const firestore = getFirestore()

export const createDonation = async (donation: Donation) => {
  try {
    const collectionRef = collection(firestore, 'donations')
    const docRef = doc(collectionRef)
    const docId = docRef.id
    await setDoc(docRef, {
      id: docId,
      ...donation,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })

    console.log(`donation has been created with ID: ${docRef.id}`)
  } catch (error) {
    console.error('Error creating donations:', error)
  }
}

export const getDonationsForProduct = async (productId: string) => {
  try {
    const querySnapshot = await getDocs(
      query(collection(firestore, 'donations'), where('productId', '==', productId))
    )
    const donations = querySnapshot.docs.map((doc) => doc.data())
    return donations
  } catch (error) {
    console.error('Error fetching donations for product:', error)
    return null
  }
}

export const updateDonationStatus = async (
  donationId: string,
  status: DonationTypes,
  productId: string,
  quantity: number
) => {
  try {
    await updateDoc(doc(firestore, 'donations', donationId), {
      status,
      updatedAt: serverTimestamp()
    })
    if (status == DonationTypes.ACCEPTED) {
      await updateDoc(doc(firestore, 'products', productId), {
        quantity: quantity
      })
    }
  } catch (error) {
    console.error('Error updating donation status:', error)
  }
}

export const getDonationsForCharity = async (charityId: string) => {
  try {
    const querySnapshot = await getDocs(
      query(collection(firestore, 'donations'), where('charityId', '==', charityId))
    )
    const donations = querySnapshot.docs.map((doc) => doc.data())
    return donations
  } catch (error) {
    console.error('Error fetching donations for product:', error)
    return null
  }
}
