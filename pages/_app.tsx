import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'

import ScreenSizeProvider from '../services/screen-size/provider'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // @ts-ignore
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return (
    <ScreenSizeProvider>
      <Component {...pageProps} />
    </ScreenSizeProvider>
  )
}

export default MyApp