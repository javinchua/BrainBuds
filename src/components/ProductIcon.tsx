import React, { ReactNode } from 'react'

interface ProductIconsProps {
  icon: ReactNode
}

const ProductIcon: React.FC<ProductIconsProps> = ({ icon }) => {
  return <div>{icon}</div>
}

export default ProductIcon
  