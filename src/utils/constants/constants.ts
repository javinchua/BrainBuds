import { Timestamp } from 'firebase/firestore'
export enum userTypes {
  DONOR = 'DONOR',
  CHARITY = 'CHARITY'
}

export interface CharityData {
  id: string
  name: string
  description: string
}
export const sampleCharity: CharityData = {
  id: 'AEJKLFA34',
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
  numLikes: number
}

export interface ProductEditing extends Product {
  editing: boolean
}

export const charitySample: CharityData = {
  id: '0zUwFItSqXYhWCMXfprWQI3',
  name: 'old folks home',
  description: 'making people happy'
}

export interface Category {
  id: string
  name: string
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

export interface Donation {
  id?: string
  productId: string
  charityId: string
  donorId: string
  price: number
  quantity: number
  status: DonationTypes // this can be 'offered', 'accepted', 'rejected', 'delivered', 'completed'
  createdAt?: Timestamp
  updatedAt?: Timestamp
}

export enum DonationTypes {
  OFFERED = 'OFFERED',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED'
}

export interface Donor {
  id: string
  likedProducts: Product[]
}
