import {
  doc,
  setDoc,
  collection,
  getDocs,
  getDoc,
  query,
  where,
  serverTimestamp
} from 'firebase/firestore'
import { getFirestore } from 'firebase/firestore'
import { Fundraiser, CharityData } from '@/utils/constants/constants'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

const firestore = getFirestore()
const storage = getStorage()
export const getAllFundraisersFromCharityId = async (uid: string): Promise<Fundraiser[] | null> => {
  try {
    const q = query(collection(firestore, 'fundraisers'), where('charityId', '==', uid))
    const fundraiserSnapshot = await getDocs(q)

    const fundraisers: Fundraiser[] = fundraiserSnapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        name: data.name,
        description: data.description,
        goalAmount: data.goalAmount,
        curAmount: data.curAmount,
        image: data.image,
        charityId: data.charityId,
        category: data.category,
        createdAt: data.createdAt
      }
    })
    return fundraisers
  } catch (error) {
    console.error('Error getting fundraisers:', error)
    return null
  }
}

export const updateFundraiserInfo = async (data: Fundraiser) => {
  try {
    if (data.file) {
      const url = await handleImageUpload(data.file)
      if (url) {
        data.image = url
      }
      delete data.file
    }
    const docRef = doc(firestore, `fundraisers`, data.id)
    setDoc(docRef, data)
    return data as Fundraiser
  } catch (error) {
    console.error('Error updating fundraiser info:', error)
    return null
  }
}

export const getFundraiserByFundraiserId = async (id: string): Promise<Fundraiser | null> => {
  try {
    const fundraiserRef = collection(firestore, 'fundraisers')
    const q = query(fundraiserRef, where('id', '==', id))
    const fundraiserSnapshot = await getDocs(q)
    if (!fundraiserSnapshot.empty) {
      const fundraiserDoc = fundraiserSnapshot.docs[0]
      const fundraiserData = fundraiserDoc.data()
      const fundraiser: Fundraiser = {
        id: fundraiserData.id,
        name: fundraiserData.name,
        description: fundraiserData.description,
        goalAmount: fundraiserData.goalAmount,
        curAmount: fundraiserData.curAmount,
        image: fundraiserData.image,
        charityId: fundraiserData.charityId,
        category: fundraiserData.category,
        createdAt: fundraiserData.createdAt
      }
      return fundraiser
    } else {
      return null // Fundraiser not found
    }
  } catch (error) {
    console.error('Error getting fundraiser:', error)
    return null
  }
}

export const getCharityDataByFundraisers = async ({
  fundraisers
}: {
  fundraisers: Fundraiser[]
}) => {
  try {
    const charityIds = fundraisers.map((fundraiser) => fundraiser.charityId)
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

export const getCharityDataByFundraiser = async ({ fundraiser }: { fundraiser: Fundraiser }) => {
  try {
    const charityId = fundraiser.charityId
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

export const addNewFundraiser = async (data: Fundraiser) => {
  try {
    if (data.file) {
      const url = await handleImageUpload(data.file)
      if (url) {
        data.image = url
      }
      delete data.file
    }
    const collectionRef = collection(firestore, 'fundraisers')
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
    } as Fundraiser
  } catch (error) {
    console.error('Error adding new fundraiser:', error)
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

export const getFundraiserName = async (fundraiserId: string) => {
  try {
    const collectionRef = collection(firestore, 'fundraisers')
    const docQuery = query(collectionRef, where('id', '==', fundraiserId))
    const querySnapshot = await getDocs(docQuery)
    if (!querySnapshot.empty) {
      const fundraiserDoc = querySnapshot.docs[0]
      const fundraiserData = fundraiserDoc.data()
      const fundraiserName = fundraiserData.name

      return fundraiserName
    }
  } catch (error) {
    console.error('Error fetching fundraiser name:', error)
    return null
  }
}

export const getAllFundraisers = async () => {
  try {
    const productRef = collection(firestore, 'fundraisers')
    const productSnapshot = await getDocs(productRef)

    const fundraisers = productSnapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        name: data.name,
        description: data.description,
        goalAmount: data.goalAmount,
        curAmount: data.curAmount,
        image: data.image,
        charityId: data.charityId,
        category: data.category,
        createdAt: data.createdAt
      }
    })

    return fundraisers
  } catch (error) {
    console.error('Error getting fundraisers:', error)
    return null
  }
}
