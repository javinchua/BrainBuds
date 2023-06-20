import React from 'react'
import CharityInfo from '@/components/CharityInfo'
import { CharityData } from '@/utils/constants/constants'
interface charityInfoProps {
  charity: CharityData
}
const charityInfo: React.FC<charityInfoProps> = ({ charity }) => {
  return (
    <div>
      <CharityInfo charity={charity}></CharityInfo>
      charityInfo
    </div>
  )
}

export default charityInfo
