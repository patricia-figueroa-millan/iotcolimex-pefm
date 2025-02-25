///////////////////////////////////////////////// Sección simplificada 

import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import Layout from "@/components/Layout";
import { Notifications } from "@mantine/notifications";
import AutoNotification from "@/components/NotificationComponent";
import "@/styles/globals.css";
import AuthWrapper from "@/components/AuthWrapper";


export default function App({
  Component,
  pageProps,
}: AppProps<{ initialSession: Session }>) {
  const [supabase] = useState(() => createBrowserSupabaseClient({
    cookieOptions: {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 días
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    },
  })
  );
  
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: "light" }}
    >

      <SessionContextProvider
        supabaseClient={supabase}
        initialSession={pageProps.initialSession}
      >
        <Notifications position="top-right" zIndex={2077} />
        <AuthWrapper>
        <Layout>
          <AutoNotification />
          <Component {...pageProps} />
        </Layout>
        </AuthWrapper>
      </SessionContextProvider>

    </MantineProvider >
  );
}