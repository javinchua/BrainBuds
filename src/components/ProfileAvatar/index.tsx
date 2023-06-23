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

  const initials = charity?.name ? getInitials(charity.name) : ''

  return (
    <div className="flex justify-center w-[100px] h-[100px] text-2xl items-center font-semibold text-white rounded-full bg-primary-900">
      {initials}
    </div>
  )
}

export default ProfileAvatar
