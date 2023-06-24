import React, { MouseEvent, useState } from 'react'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import { getAuth, signOut } from 'firebase/auth'
import { useAuth } from 'context/AuthContext'

const NavProfile = (): JSX.Element => {
  const { user } = useAuth()
  const auth = getAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setMenuOpen(true)
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setMenuOpen(false)
    setAnchorEl(null)
  }

  const handleLogout = () => {
    signOut(auth)
    handleMenuClose()
  }

  return (
    <div className=" hover:bg-primary-900">
      <IconButton color="inherit" aria-label="account" onClick={handleMenuOpen}>
        <AccountCircle fontSize="large" />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuItem onClick={handleMenuClose}>Username: {user?.username}</MenuItem>
        <MenuItem onClick={handleMenuClose}>Type: {user?.type}</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  )
}

export default NavProfile
