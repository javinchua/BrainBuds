import React, { ReactNode } from 'react'
import { NavBar } from '../NavBar'
import { useAuth } from 'context/AuthContext'
import { ChatComponent } from '../Chat/ChatComponent'

interface LayoutProps {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user } = useAuth()

  return (
    <>
      <NavBar />
      <div style={{ paddingTop: '64px', position: 'relative' }}>
        {children}
        {user && (
          <div
            style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px'
            }}
          >
            <ChatComponent userType="donor" />
          </div>
        )}
      </div>
    </>
  )
}

export default Layout
