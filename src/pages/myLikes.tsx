import React from 'react'
import { userTypes } from '@/utils/constants/constants'
import LikedProducts from '@/components/LikedProducts'
import PrivateRoute from 'context/PrivateRoute'
const LikedProductsPage = () => {
  return (
    <PrivateRoute allowedUserTypes={[userTypes.DONOR]}>
      <LikedProducts />
    </PrivateRoute>
  )
}

export default LikedProductsPage
