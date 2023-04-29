import { Button, AppShell, Navbar, Header } from "@mantine/core";
import Link from "next/link";
// @ts-ignore
import { Database } from "../utils/database.types";

import { Badge, Box, NavLink } from "@mantine/core";

import {
  useUser,
  useSupabaseClient,
  Session,
  useSession,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

export default function Layout({ children }: any) {
  const router = useRouter();
  const session = useSession();
  const supabase = useSupabaseClient<Database>();

  async function handleSignOut() {
    // Terminate the session with Supabase
    await supabase.auth.signOut();

    // Redirect to /
    router.push("/");
  }

  // We want to return empty Layout when no session is set, i.e. when in login page
  if (!session) return <>{children}</>;

  // Return the Layout if the session is set
  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 200 }} height={600} p="xs">
          {
            <Box w={240}>
              <div style={{ margin: "0 60px 0 0" }}>
                <Link href={"/"} style={{ textDecoration: "none" }}>
                  <NavLink label="DASHBOARD" />
                </Link>
              </div>

              <div style={{ margin: "0 60px 0 0" }}>
                <NavLink label="REPORTES" childrenOffset={28}>
                  <div style={{ margin: "0 60px 0 0" }}>
                    <Link
                      href={"/reportes_graficos"}
                      style={{ textDecoration: "none" }}
                    >
                      <NavLink label="GRÁFICOS" />
                    </Link>
                  </div>
                  <div style={{ margin: "0 60px 0 0" }}>
                    <Link
                      href={"/reportes_tabular"}
                      style={{ textDecoration: "none" }}
                    >
                      <NavLink label="TABULAR" />
                    </Link>
                  </div>
                </NavLink>
              </div>

              <div style={{ margin: "0 60px 0 0" }}>
                <Link
                  href={"/registro_usuarios"}
                  style={{ textDecoration: "none" }}
                >
                  <NavLink label="REGISTRO USUARIOS" />
                </Link>
              </div>
              <div style={{ margin: "0 60px 0 0" }}>
                <Link
                  href={"/listar_usuarios"}
                  style={{ textDecoration: "none" }}
                >
                  <NavLink label="LISTAR USUARIOS" />
                </Link>
              </div>
              <div style={{ margin: "0 60px 0 0" }}>
                <Link
                  href={"/registro_nodos"}
                  style={{ textDecoration: "none" }}
                >
                  <NavLink label="REGISTRO NODOS" />
                </Link>
              </div>
              <div style={{ margin: "0 60px 0 0" }}>
                <Link
                  href={"/consulta_nodos"}
                  style={{ textDecoration: "none" }}
                >
                  <NavLink label="CONSULTA NODOS" />
                </Link>
              </div>
            </Box>
          }
          <Button className="button block" onClick={handleSignOut}>
            Sign Out
          </Button>
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          {/* Header content */}
          <div style={{ padding: "10px 0 0 20px" }}>
            <label>MENÚ</label>
          </div>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  );
}
