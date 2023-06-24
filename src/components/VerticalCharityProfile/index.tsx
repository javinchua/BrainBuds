import { CharityData } from '@/utils/constants/constants'
import React from 'react'
import ProfileAvatar from '../ProfileAvatar'

interface VerticalCharityProfileProps {
  charity: CharityData
}
const VerticalCharityProfile: React.FC<VerticalCharityProfileProps> = ({ charity }) => {
  return (
    <div>
      <ProfileAvatar charity={charity}></ProfileAvatar>
      <div className="flex flex-col mt-4 text-left">
        <h1 className="text-2xl ">{charity.name}</h1>
        <h1 className="mt-2">{charity.description}</h1>
      </div>
    </div>
  )
}

export default VerticalCharityProfile
