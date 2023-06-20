import React, { ReactNode } from 'react'

interface ProductIconsProps {
  icon: ReactNode
}

const ProductIcons: React.FC<ProductIconsProps> = ({ icon }) => {
  return <div>{icon}</div>
}

export default ProductIcons
