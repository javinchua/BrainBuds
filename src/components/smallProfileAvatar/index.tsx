import React from 'react'
import { CharityData } from '@/utils/constants/constants'
interface SmallProfileAvatarProps {
  charity: CharityData
}
const SmallProfileAvatar: React.FC<SmallProfileAvatarProps> = ({ charity }) => {
  const getInitials = (name: string) => {
    const names = name.split(' ')
    return names.map((name) => name[0]).join('')
  }

  const initials = getInitials(charity.name)

  return (
    <div className="flex items-center justify-center object-contain w-[32px] h-[32px] text-xs font-semibold text-white rounded-full bg-primary-900">
      {initials}
    </div>
  )
}

export default SmallProfileAvatar
