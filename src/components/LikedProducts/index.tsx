import React from 'react'
import LikedProductGrid from '../LikedProductGrid'

const LikedProducts = () => {
  return (
    <div className="p-10">
      <h1 className="mb-4 text-2xl font-semibold">My Likes</h1>
      <LikedProductGrid />
    </div>
  )
}

export default LikedProducts
