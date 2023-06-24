import React, { ReactNode } from 'react'
import { NavBar } from '../NavBar'
import { useAuth } from 'context/AuthContext'
import ChatComponent from '../Chat/ChatComponent'

interface LayoutProps {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user } = useAuth()

  return (
    <>
      <NavBar />
      <div className="relative pt-16">
        {children}
        {user && user.uid && (
          <div className="fixed z-50 object-cover bottom-5 right-5">
            <ChatComponent />
          </div>
        )}
      </div>
    </>
  )
}

export default Layout
