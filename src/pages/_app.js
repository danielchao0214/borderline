import AppBanner from '@/components/AppBanner.js'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return( 
    <>
      <Component {...pageProps} />
    </>
  )
}
