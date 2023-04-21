/*
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { MantineProvider } from '@mantine/core'
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{colorScheme: 'light'}}
      >
    <Component {...pageProps} />
    </MantineProvider>
    </>
  )
}
*/
import { useState } from 'react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'
import { AppProps } from 'next/app'

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session,
}>) {
  const [supabase] = useState(() => createBrowserSupabaseClient())

  return (
    <SessionContextProvider 
    supabaseClient={supabase} 
    initialSession={pageProps.initialSession}>
      <Component {...pageProps} />
    </SessionContextProvider>
  )
}
export default MyApp