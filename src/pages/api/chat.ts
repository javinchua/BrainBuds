import { getDocs, collection, query, where } from 'firebase/firestore'
import { getFirestore } from 'firebase/firestore'

const firestore = getFirestore()

export const getUserByUsername = async (uid: string) => {
  const usersCollectionRef = collection(firestore, 'users')
  const usersQuery = query(usersCollectionRef, where('uid', '==', uid))
  const querySnapshot = await getDocs(usersQuery)

  if (!querySnapshot.empty) {
    // Assuming donorId is unique and there's only one matching document
    const userDoc = querySnapshot.docs[0]
    const userData = userDoc.data()
    const username = userData.username

    return username
  }

  return uid // If no user found with the given donorId
}
