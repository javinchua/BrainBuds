import 'styles/tailwind.css'

import { AppProps } from 'next/app'
import React from 'react'
import { AuthContextProvider } from 'context/AuthContext'
import Layout from '@/components/Layout'
import { Provider } from 'react-redux'
import configureAppStore from '../store'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const store = configureAppStore(pageProps.initialReduxState)
  return (
    <Provider store={store}>
      <AuthContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContextProvider>
    </Provider>
  )
}
