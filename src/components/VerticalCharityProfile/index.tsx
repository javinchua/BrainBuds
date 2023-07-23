import { CharityData } from '@/utils/constants/constants'
import React from 'react'
import ProfileAvatar from '../ProfileAvatar'
import { useState } from 'react'
import { getDonorIsFollowing, updateDonorFollowingIds } from 'pages/api/donor'
import { useEffect } from 'react'
import { useAuth } from 'context/AuthContext'
import DoneIcon from '@mui/icons-material/Done'
interface VerticalCharityProfileProps {
  charity: CharityData
}
const VerticalCharityProfile: React.FC<VerticalCharityProfileProps> = ({ charity }) => {
  const { user } = useAuth()
  const [isFollowing, setIsFollowing] = useState<boolean>(false)

  useEffect(() => {
    const getIsFollowing = async () => {
      if (user.uid) {
        const isFollowing = await getDonorIsFollowing(user.uid, charity.id)
        setIsFollowing(isFollowing)
      }
    }
    getIsFollowing()
  }, [])

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
    const updateData = async () => {
      if (user.uid) {
        updateDonorFollowingIds(charity.id, user.uid)
      }
    }
    updateData()
  }
  return (
    <div className="mr-6">
      <ProfileAvatar charity={charity}></ProfileAvatar>
      <div className="flex flex-col mt-4 text-left">
        <h1 className="text-2xl ">{charity.name}</h1>
        <h1 className="mt-2">{charity.description}</h1>

        <button className="p-2 text-white bg-brightOrange" onClick={handleFollow}>
          {isFollowing && <DoneIcon />}
          {isFollowing ? 'Following' : 'Follow'}
        </button>
      </div>
    </div>
  )
}

export default VerticalCharityProfile
