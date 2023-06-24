import {
  getFirestore,
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
  where,
  updateDoc,
  doc
} from '@firebase/firestore'
import { Order } from '@/utils/constants/constants'
const firestore = getFirestore()

export const createOrder = async (order: Order) => {
  try {
    const docRef = await addDoc(collection(firestore, 'orders'), {
      ...order,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })

    console.log(`Order has been created with ID: ${docRef.id}`)
  } catch (error) {
    console.error('Error creating orders:', error)
  }
}

export const getOrdersForProduct = async (productId: string) => {
  try {
    const querySnapshot = await getDocs(
      query(collection(firestore, 'orders'), where('productId', '==', productId))
    )
    const orders = querySnapshot.docs.map((doc) => doc.data())
    return orders
  } catch (error) {
    console.error('Error fetching orders for product:', error)
    return null
  }
}

export const updateOrderStatus = async (orderId: string, status: string) => {
  try {
    await updateDoc(doc(firestore, 'orders', orderId), {
      status,
      updatedAt: serverTimestamp()
    })
  } catch (error) {
    console.error('Error updating order status:', error)
  }
}
