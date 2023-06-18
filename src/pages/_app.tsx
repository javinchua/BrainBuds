import 'styles/tailwind.css'

import { AppProps } from 'next/app'
import React from 'react'
import { AuthContextProvider } from 'context/AuthContext'
import Layout from '@/components/Layout'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <AuthContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
  )
}
