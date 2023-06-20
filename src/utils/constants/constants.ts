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
