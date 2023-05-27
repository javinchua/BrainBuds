import 'styles/tailwind.css'

import { AppProps } from 'next/app'
import { Navbar } from '@/components/NavBar'
import React from 'react'
import { AuthContextProvider } from 'context/AuthContext'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <AuthContextProvider>
      <Navbar></Navbar>
      <Component {...pageProps} />
    </AuthContextProvider>
  )
}
