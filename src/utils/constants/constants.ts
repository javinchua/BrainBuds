// import { homedir } from "os"

export enum userTypes {
  DONOR = 'DONOR',
  CHARITY = 'CHARITY'
}

export interface CharityData {
  id: string
  name: string
  description: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: string
  image: string
  editing: boolean
  available: boolean
  sellerId: string
  category: string
  delivery: string
  createdAt: string
  sellerName: string
}

export const charitySample: CharityData = {
  id: '0zUwFItSqXYhWCMXfprWQI3',
  name: 'old folks home',
  description: 'making people happy'
}
