import React from 'react'
import { Button, Typography } from '@mui/material'

const UnauthorizedPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-700">
      <Typography variant="h4" className="mb-4">
        Unauthorized Access
      </Typography>
      <Typography variant="body1" className="mb-4 text-center">
        You do not have permission to access this page.
      </Typography>
      <Button variant="contained" color="primary" href="/">
        Go Back Home
      </Button>
    </div>
  )
}

export default UnauthorizedPage
