import '../styles/globals.css'
import { CacheProvider, EmotionCache } from '@emotion/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import createEmotionCache from '$lib/createEmotionCache'

import { Providers } from '../lib/Providers'

const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}
export default function App({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache
}: MyAppProps) {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Tic_Tac_Toe</title>
      </Head>
      <Providers>
        <Component {...pageProps} />
      </Providers>
    </CacheProvider>
  )
}
