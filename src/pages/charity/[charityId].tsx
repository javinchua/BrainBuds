import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import CharityPage from '@/components/CharityGeneral'
import { CharityData } from '@/utils/constants/constants'
import { getFirestore } from 'firebase/firestore'
import { doc, getDoc } from 'firebase/firestore'

const firestore = getFirestore()

const CharityDetailPage = () => {
  const router = useRouter()
  const { charityId } = router.query
  const [charity, setCharity] = useState<CharityData | null>(null)

  useEffect(() => {
    const fetchCharity = async () => {
      if (typeof charityId === 'string') {
        const docRef = doc(firestore, 'charities', charityId)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          const charityData = docSnap.data() as CharityData
          setCharity(charityData)
        }
      }
    }

    fetchCharity()
  }, [charityId])

  if (!charity) {
    // Handle case when charity is not found or still loading
    return <div className="mt-10">Loading...</div>
  }

  return <CharityPage charity={charity} />
}

export default CharityDetailPage
