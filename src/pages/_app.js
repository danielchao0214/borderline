import AppBanner from '@/components/AppBanner.js'
import { AppBannerContext } from '@/components/contexts/AppBannerContext'
import '@/styles/globals.css'
import { useState } from 'react'

export default function App({ Component, pageProps }) {

  const [value, setValue] = useState('');

  return (
    <>
      <AppBannerContext.Provider value={{ value, setValue }}>
        <AppBanner />
        <Component {...pageProps} />
      </AppBannerContext.Provider>
    </>
  )
}
