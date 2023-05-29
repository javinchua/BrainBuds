import React, { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '../config/firebase'

interface UserType {
  email: string | null
  uid: string | null
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
  const [user, setUser] = useState<UserType>({ email: null, uid: null })
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setUser({
          email: user.email,
          uid: user.uid
        })
      } else {
        setUser({ email: null, uid: null })
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  if (loading) {
    return null
  }

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
}
