// ///////////////////////////////////////////////// Sección simplificada

// import { useState } from "react";
// import type { AppProps } from "next/app";
// import { MantineProvider } from "@mantine/core";
// import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
// import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
// import BaseLayout from "@/components/BaseLayout";
// import { LocalSessionContextProvider } from "@/hooks/use-local-session";
// import AutoNotification from "@/components/NotificationComponent";
// import { Notifications } from '@mantine/notifications';

// export default function App({
//   Component,
//   pageProps,
// }: AppProps<{ initialSession: Session }>) {
//   const [supabase] = useState(() => createBrowserSupabaseClient());

//   return (
//     <MantineProvider
//       withGlobalStyles
//       withNormalizeCSS
//       theme={{ colorScheme: "light" }}
//     >

//       <Notifications />
//       <SessionContextProvider
//         supabaseClient={supabase}
//         initialSession={pageProps.initialSession}
//       >
//         <LocalSessionContextProvider>
//           <BaseLayout>
//             <Component {...pageProps} />
//             <AutoNotification />
//           </BaseLayout>
//         </LocalSessionContextProvider>
//       </SessionContextProvider>
//     </MantineProvider>
//   );
// }

import { useState } from "react";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import BaseLayout from "@/components/BaseLayout";
import { LocalSessionContextProvider } from "@/hooks/use-local-session";
// import NotificationComponent from "@/components/NotificationComponent";
import dynamic from "next/dynamic";

const NotificationComponent = dynamic(
  () => import("@/components/NotificationComponent"),
  { ssr: false }
);

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
          {/* BaseLayout ahora envuelve la página y el componente de notificación,
              pero el componente de notificación solo se renderiza una vez */}
          <NotificationWrapper>
            <BaseLayout>
              <Component {...pageProps} />
            </BaseLayout>
          </NotificationWrapper>
        </LocalSessionContextProvider>
      </SessionContextProvider>
    </MantineProvider>
  );
}

// Nuevo componente para encapsular la lógica de renderizado.
// Esto asegura que `NotificationComponent` solo se monte una vez.
const NotificationWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NotificationComponent />
      {children}
    </>
  );
};