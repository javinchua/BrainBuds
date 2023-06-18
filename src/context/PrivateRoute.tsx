import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuth } from 'context/AuthContext'
import { userTypes } from '@/utils/constants/constants'

interface RouteProps {
  allowedUserTypes: userTypes[] | null
  children?: React.ReactNode
}

const PrivateRoute = ({ allowedUserTypes, children }: RouteProps) => {
  const { user } = useAuth()
  const router = useRouter()

  // Check if user type is allowed
  const isUserTypeAllowed = user && allowedUserTypes?.some((type) => type === user.type)

  useEffect(() => {
    // Redirect unauthorized users
    if (!isUserTypeAllowed) {
      router.push('/unauthorized')
    }
  }, [isUserTypeAllowed, router])

  return isUserTypeAllowed ? children : null
}

export default PrivateRoute
