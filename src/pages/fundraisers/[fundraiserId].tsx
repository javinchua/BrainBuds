import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import PrivateRoute from 'context/PrivateRoute'
import { Fundraiser } from '@/utils/constants/constants'
import { getFundraiserByFundraiserId } from 'pages/api/fundraiser'
import { userTypes } from '@/utils/constants/constants'
import FundraiserDetail from '@/components/FundraiserDetail'
const FundraiserPage = () => {
  const router = useRouter()
  const { fundraiserId } = router.query
  const [fundraiser, setFundraiser] = useState<Fundraiser | null>(null)

  useEffect(() => {
    const fetchFundriaser = async () => {
      if (typeof fundraiserId === 'string') {
        const fundraiserData: Fundraiser | null = await getFundraiserByFundraiserId(fundraiserId)
        setFundraiser(fundraiserData)
      }
    }

    fetchFundriaser()
  }, [fundraiserId])

  if (!fundraiser) {
    // Handle case when fundraiser is not found or still loading
    return <div className="flex items-center justify-center h-screen text-gray-700">Loading...</div>
  }

  return (
    <PrivateRoute allowedUserTypes={[userTypes.DONOR]}>
      <div className="min-h-screen py-10">
        <div className="max-w-5xl px-4 mx-auto">
          <FundraiserDetail fundraiser={fundraiser} />
        </div>
      </div>
    </PrivateRoute>
  )
}

export default FundraiserPage
