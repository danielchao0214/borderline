import AppBanner from '@/components/AppBanner.js'
import '@/styles/globals.css'
import '@/styles/AppBanner.css'

export default function App({ Component, pageProps }) {
  return( 
    <>
      <AppBanner/>
      <Component {...pageProps} />
    </>
  )
}
