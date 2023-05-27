import 'styles/tailwind.css'

import { AppProps } from 'next/app'

import React from 'react'
import { AuthContextProvider } from 'context/AuthContext'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  )
}
