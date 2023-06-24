import 'styles/tailwind.css'

import { AppProps } from 'next/app'
import React from 'react'
import { AuthContextProvider } from 'context/AuthContext'
import Layout from '@/components/Layout'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import configureAppStore from '../store'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const { store, persistor } = configureAppStore(pageProps.initialReduxState)
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AuthContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthContextProvider>
      </PersistGate>
    </Provider>
  )
}
