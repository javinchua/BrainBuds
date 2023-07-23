import React from 'react'
import { CharityData } from '@/utils/constants/constants'
import { useState } from 'react'
import { getDonorFollowingIds } from 'pages/api/donor'
import { useAuth } from 'context/AuthContext'
import { useEffect } from 'react'
import { CharityProfile } from '@/components/CharityProfile'
import { getCharityInfo } from 'pages/api/charity'

const FollowingComponent = () => {
  const [followingCharities, setFollowingCharities] = useState<CharityData[]>([])
  const { user } = useAuth()
  useEffect(() => {
    const fetchData = async () => {
      if (user.uid) {
        const followingCharitiesIds = await getDonorFollowingIds(user.uid)
        if (followingCharitiesIds) {
          const followingCharitiesPromises = followingCharitiesIds.map((charityId: string) =>
            getCharityInfo(charityId)
          )
          const followingCharities = await Promise.all(followingCharitiesPromises)
          console.log(followingCharities)
          setFollowingCharities(followingCharities)
        }
      }
    }
    fetchData()
  }, [user.uid])

  return (
    <div className="px-12 py-6">
      <h1 className="text-2xl font-semibold">Following</h1>
      {followingCharities.length === 0 ? (
        <p>No charities found.</p>
      ) : (
        <div className="grid grid-cols-2 gap-6 mt-10">
          {followingCharities.map(
            (charity, index) =>
              charity && (
                <div className="flex p-2 bg-white rounded-md shadow-md bg-opacity-10" key={index}>
                  <CharityProfile charity={charity} key={index}></CharityProfile>
                </div>
              )
          )}
        </div>
      )}
    </div>
  )
}

export default FollowingComponent
