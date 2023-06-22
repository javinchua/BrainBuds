import { getDocs, collection } from 'firebase/firestore'
import { getFirestore } from 'firebase/firestore'
import { Category } from '@/utils/constants/constants'
const firestore = getFirestore()

export const fetchCategories = async () => {
  try {
    const querySnapshot = await getDocs(collection(firestore, 'categories'))
    const fetchedCategories: Category[] = []
    querySnapshot.forEach((doc) => {
      const category = doc.data() as Category
      fetchedCategories.push(category)
    })
    return fetchedCategories
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
}
