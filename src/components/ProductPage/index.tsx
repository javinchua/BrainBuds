import React from 'react'
import { Product } from '@/utils/constants/constants'

interface ProductPageProps {
  product: Product
}

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
  return (
    <div className="p-4 mt-10">
      <div className="relative">
        <div className="relative w-[200px] h-[344px] mx-auto">
          <div className="aspect-w-1 aspect-h-1">
            <img src={product.image} alt={product.name} className="object-cover" />
          </div>
        </div>
        <div className="absolute inset-0 bg-gray-200 opacity-50"></div>
      </div>

      <div className="flex justify-between mt-4">
        <div className="w-[70%] border-b">
          <h1 className="text-lg">{product.name}</h1>
        </div>

        <div className="justify-center block w-[30%] text-center border-neutral-800 shadow-md">
          <div className="w-full">
            <h1 className="py-4">seller</h1>
            <button className="w-full py-4 font-bold text-red-100 bg-purple">Donate</button>
            <button className="w-full py-4 bg-gray-100">Chat</button>
          </div>
        </div>
      </div>
      <div className="my-4">
        <h2 className="text-lg font-semibold">Description</h2>
        <p>{product.description}</p>
      </div>
    </div>
  )
}

export default ProductPage
