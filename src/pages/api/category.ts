import { collection, getDocs, getFirestore } from 'firebase/firestore'
import { Category } from '@/utils/constants/constants'

const firestore = getFirestore()
export const fetchCategories = async () => {
  try {
    const querySnapshot = await getDocs(collection(firestore, 'categories'))
    const fetchedCategories: Category[] = []
    querySnapshot.forEach((doc) => {
      const { id, name } = doc.data() as Category
      fetchedCategories.push({ id, name })
    })
    return fetchedCategories.length ? fetchedCategories : null
  } catch (error) {
    console.error('Error fetching categories:', error)
    return null
  }
}
