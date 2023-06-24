import { Timestamp } from 'firebase/firestore'
export enum userTypes {
  DONOR = 'DONOR',
  CHARITY = 'CHARITY'
}

export interface CharityData {
  name: string
  description: string
}
export const sampleCharity: CharityData = {
  name: 'Sample Charity',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
}
export interface Product {
  id: string
  name: string
  description: string
  price: number
  sellerId: string
  image: string
  category: string
  file?: File
  quantity: number
  createdAt?: Timestamp
}

export interface ProductEditing extends Product {
  editing: boolean
}

export interface Category {
  id: string
  name: string
}

export interface Chat {
  id: string
  productId: string
  donorId: string
  charityId: string
  createdAt: Timestamp
}

export interface Message {
  senderId: string
  content: string
  createdAt: Timestamp
  chatId: string
}
