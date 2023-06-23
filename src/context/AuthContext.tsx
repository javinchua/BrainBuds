import React, { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '../config/firebase'
import { userTypes } from '@/utils/constants/constants'
import { doc, getDoc } from 'firebase/firestore'
import { getFirestore } from 'firebase/firestore'

interface UserType {
  email: string | null
  uid: string | null
  type: userTypes | null
  username: string | null
}

interface AuthContextType {
  user: UserType
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthContextProvider')
  }
  return context
}

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType>({ email: null, uid: null, type: null, username: null })
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      if (user) {
        const userDoc = await getUserTypeFromFirestore(user.uid)
        if (userDoc) {
          setUser({
            email: user.email,
            uid: user.uid,
            type: userDoc?.type,
            username: userDoc?.username
          })
        }
      } else {
        setUser({ email: null, uid: null, type: null, username: null })
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const getUserTypeFromFirestore = async (uid: string) => {
    try {
      const firestore = getFirestore()
      const docRef = doc(firestore, 'users', uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const userData = docSnap.data()
        if (userData) {
          return {
            type: userData.userType as userTypes,
            username: userData.username as string
          }
        }
        return null
      } else {
        return null
      }
    } catch (error) {
      console.error('Error fetching user type:', error)
      return null
    }
  }

  if (loading) {
    return null
  }

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
}
