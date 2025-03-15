///////////////////////////////////////////////// Sección simplificada

import { useState } from "react";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import BaseLayout from "@/components/BaseLayout";
import { LocalSessionContextProvider } from "@/hooks/use-local-session";
import AutoNotification from "@/components/NotificationComponent";
import { Notifications } from '@mantine/notifications';

export default function App({
  Component,
  pageProps,
}: AppProps<{ initialSession: Session }>) {
  const [supabase] = useState(() => createBrowserSupabaseClient());

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: "light" }}
    >
      
      <Notifications />
      <SessionContextProvider
        supabaseClient={supabase}
        initialSession={pageProps.initialSession}
      >
        <LocalSessionContextProvider>
          <BaseLayout>
            <Component {...pageProps} />
            <AutoNotification />
          </BaseLayout>
        </LocalSessionContextProvider>
      </SessionContextProvider>
    </MantineProvider>
  );
}