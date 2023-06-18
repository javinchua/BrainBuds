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
  const [user, setUser] = useState<UserType>({ email: null, uid: null, type: null })
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      if (user) {
        const userType = await getUserTypeFromFirestore(user.uid)
        setUser({
          email: user.email,
          uid: user.uid,
          type: userType
        })
      } else {
        setUser({ email: null, uid: null, type: null })
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const getUserTypeFromFirestore = async (uid: string): Promise<userTypes | null> => {
    try {
      const firestore = getFirestore()
      const docRef = doc(firestore, 'users', uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const userData = docSnap.data()
        return userData?.userType || null
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
