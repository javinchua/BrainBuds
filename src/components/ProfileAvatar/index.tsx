import React from 'react'
import { CharityData } from '@/utils/constants/constants'
interface ProfileAvatarProps {
  charity: CharityData
}
const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ charity }) => {
  const getInitials = (name: string) => {
    const names = name.split(' ')
    return names.map((name) => name[0]).join('')
  }

  const initials = getInitials(charity.name)

  return (
    <div className="flex items-center justify-center object-contain w-[100px] h-[100px] text-xl font-semibold text-white rounded-full bg-primary-900">
      {initials}
    </div>
  )
}

export default ProfileAvatar
