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
  const isAuthenticated = !!user
  const router = useRouter()

  const isUserTypeAllowed = isAuthenticated && allowedUserTypes?.some((type) => type === user.type)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    } else if (!isUserTypeAllowed) {
      router.push('/unauthorized')
    }
  }, [isAuthenticated, isUserTypeAllowed, router])

  return <>{isUserTypeAllowed && children}</>
}

export default PrivateRoute
