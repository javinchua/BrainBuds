import React, { ReactNode } from 'react'
import { NavBar } from '../NavBar'

interface LayoutProps {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <NavBar />
      <div style={{ paddingTop: '64px' }}>{children}</div>
    </>
  )
}

export default Layout
