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
}

export interface ProductEditing extends Product {
  editing: boolean
}
