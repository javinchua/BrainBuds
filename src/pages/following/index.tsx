import React from 'react'
import FollowingComponent from '@/components/Following'
import PrivateRoute from 'context/PrivateRoute'
import { userTypes } from '@/utils/constants/constants'
const FollowingPage = () => {
  return (
    <PrivateRoute allowedUserTypes={[userTypes.DONOR]}>
      <FollowingComponent />
    </PrivateRoute>
  )
}

export default FollowingPage
