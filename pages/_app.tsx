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
import { useRouter } from "next/router";


export default function App({
  Component,
  pageProps,
}: AppProps<{ initialSession: Session }>) {
  const [supabase] = useState(() => createBrowserSupabaseClient());
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data: session } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
      }
    };
    checkSession();
  }, [router, supabase]);
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
          <Layout>
            <AutoNotification />
            <Component {...pageProps} />
          </Layout>
        </SessionContextProvider>

      </MantineProvider >
    );
  }