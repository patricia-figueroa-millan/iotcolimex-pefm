import { Button, AppShell, Navbar, Header, Image, Modal } from "@mantine/core";
import Link from "next/link";
// @ts-ignore
import { Database } from "../utils/database.types";
import { Box, NavLink } from "@mantine/core";
import { useSupabaseClient, useSession } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useDisclosure } from "@mantine/hooks";

export default function Layout({ children }: any) {
  const router = useRouter();
  const session = useSession();
  const supabase = useSupabaseClient<Database>();
  const [opened, { open, close }] = useDisclosure(false);

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
        <Navbar width={{ base: 165 }} height={700} p="xs" style={{backgroundColor:"white"}}>
          {
            <Box w={240}>
              <div style={{ margin: "0 60px 0 0" }}>
                <Link href={"/"} style={{ textDecoration: "none" }}>
                  <table>
                    <tr>
                      <td>
                        <Image src="./tablero.png" maw={30} />
                      </td>
                      <td>
                        <NavLink variant="subtle" active label="Tablero"/>
                      </td>
                    </tr>
                  </table>
                </Link>
              </div>
              <div style={{ margin: "0 60px 0 0" }}>
                <Link href={"/recharts-test"} style={{ textDecoration: "none" }}>
                <table>
                    <tr>
                      <td>
                        <Image src="./barras.png" maw={30} />
                      </td>
                      <td style={{width:"70%"}}>
                      <NavLink variant="subtle" active label="Gráficas" />
                      </td>
                    </tr>
                  </table>
                </Link>
              </div>
              <div style={{ margin: "0 60px 0 0" }}>
                <Link href={"/reports"} style={{ textDecoration: "none" }}>
                <table>
                    <tr>
                      <td>
                        <Image src="./table.png" maw={30} />
                      </td>
                      <td style={{width:"70%"}}>
                      <NavLink variant="subtle" active label="Reportes" />
                      </td>
                    </tr>
                  </table>
                </Link>
              </div>
              <Button className="button block" onClick={handleSignOut} style={{position:"absolute", bottom:"0", margin:"0 60px 50px 10px"}}>
                Cerrar Sesión
              </Button>
              

              {/*
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
              */}
            </Box>
          }
          {/*
          <Button className="button block" onClick={handleSignOut}>
            Sign Out
          </Button>
          */}
        </Navbar>
      }
      header={
        <Header height={60} p="xs"style={{backgroundColor:"white"}}>
          {/* Header content */}
          <div
            style={{
              float: "left",
              fontSize: "25px",
              fontWeight:"bold",
              color:"#228BE6"
            }}
          >
            <table>
              <tr>
                <td>
                <Image src="./menu.png" maw={30} />
                </td>
                <td>
                <label >
              MENÚ
              </label>
                </td>
              </tr>
            </table>
            
            
          </div>
          {/* 
          <div style={{ float: "right", overflow: "hidden" }}>
            <Modal opened={opened} onClose={close} title="Cuenta" centered>
              {
                <div>
                  <div style={{ textAlign: "center", margin: "0 0 10px 0" }}>
                  </div>
                  {/* 
                  <div style={{ textAlign: "center", margin: "0 0 10px 0" }}>
                    <Button color="green" onClick={close}>
                      <Link
                        href={"/cuenta_usuario"}
                        style={{ color: "white", textDecoration: "none" }}
                      >
                        Gestionar cuenta
                      </Link>
                    </Button>
                  </div>
                  
                  <div style={{ textAlign: "center" }}>
                    <Button className="button block" onClick={handleSignOut}>
                      Cerrar Sesión
                    </Button>
                  </div>
                </div>
              }
            </Modal>

            <Image
              onClick={open}
              maw={40}
              fit="contain"
              mx="auto"
              radius="md"
              src="./profile-user.png"
              alt="profile image"
              style={{ float: "right" }}
            />
          </div>
          */}
        </Header>
      }
    
    >
      {children}
    </AppShell>
  );
}
