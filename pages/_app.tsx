///////////////////////////////////////////////// Sección simplificada 

import { useState } from "react";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import Layout from "@/components/Layout";

import AutoNotification from "@/components/NotificationComponent";

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
      <SessionContextProvider
        supabaseClient={supabase}
        initialSession={pageProps.initialSession}
      >
        <Layout>
          <Component {...pageProps} />
          <AutoNotification/>
        </Layout>
      </SessionContextProvider>
    </MantineProvider>
  );
}


////////////////////////////////////////////////// Sección 2 antigua pero funcional
// import { useState, useEffect } from "react";
// import type { AppProps } from "next/app";

// import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
// import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
// import Layout from "@/components/Layout";
// import { AlertsProvider } from "@/context/AlertsContext";

// import { MantineProvider, Notification} from "@mantine/core";

// export default function App({
//   Component,
//   pageProps,
// }: AppProps<{ initialSession: Session }>) {
//   const [supabase] = useState(() => createBrowserSupabaseClient());

//   // useEffect(() => {
//   //   // Agrega dinámicamente el div para el portal si no existe
//   //   const portalRoot = document.getElementById("notification-portal");
//   //   if (!portalRoot) {
//   //     const div = document.createElement("div");
//   //     div.id = "notification-portal";
//   //     document.body.appendChild(div);
//   //   }
//   // }, []);

//   return (
//     <MantineProvider
//       withGlobalStyles
//       withNormalizeCSS
//       theme={{ colorScheme: "light" }}
//     >
//       NotificationProvider
//       <SessionContextProvider
//         supabaseClient={supabase}
//         initialSession={pageProps.initialSession}
//       >
//         <div id='notification-portal'></div>
//         {/* <AlertsProvider> */}
//         <Layout>
//           <Component {...pageProps} />
//         </Layout>
//         {/* </AlertsProvider> */}
//       </SessionContextProvider>
//     </MantineProvider>
//   );
// }


///////////////////////////////////////////////// sección antigua pero funcional
// import { useState } from "react";
// import type { AppProps } from "next/app";
// import { MantineProvider } from "@mantine/core";
// import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
// import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
// import Layout from "@/components/Layout";
// import { AlertsProvider } from "@/context/AlertsContext";

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
//       <SessionContextProvider
//         supabaseClient={supabase}
//         initialSession={pageProps.initialSession}
//       >
//         {/* Aquí envuelves todo con AlertsProvider */}
//         <AlertsProvider>
//           <Layout>
//             <Component {...pageProps} />
//           </Layout>
//         </AlertsProvider>
//       </SessionContextProvider>
//     </MantineProvider>
//   );
// }
