import { Donations } from '@/components/DonationListing'
import PrivateRoute from 'context/PrivateRoute'
import { userTypes } from '@/utils/constants/constants'
const DonationPage = () => {
  return (
    <PrivateRoute allowedUserTypes={[userTypes.CHARITY]}>
      <Donations />
    </PrivateRoute>
  )
}

export default DonationPage
