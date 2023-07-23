import CharityFundraiserGrid from '@/components/CharityFundraiserGrid'
import { GetServerSideProps, NextPage } from 'next'
import React from 'react'

interface FundraisersProps {
  charityId: string | null // Updated to allow null
}

const Fundraisers: NextPage<FundraisersProps> = ({ charityId }) => {
  // Check if charityId is null and handle it accordingly
  if (!charityId) {
    return <div>Loading...</div> // You can display a loader or any other UI
  }

  return (
    <div>
      <h1>Fundraisers</h1>
      <CharityFundraiserGrid charityId={charityId} />
    </div>
  )
}

export default Fundraisers

export const getServerSideProps: GetServerSideProps<FundraisersProps> = async (context) => {
  const { charityId } = context.query

  return {
    props: {
      charityId: charityId as string | null // Use null if charityId is undefined
    }
  }
}
