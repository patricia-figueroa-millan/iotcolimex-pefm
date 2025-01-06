import {
  AppShell,
  Navbar,
  Header,
  Image,
  NavLink,
  Box,
  Button,
  ActionIcon,
  useMantineTheme,
} from "@mantine/core";
import { useSupabaseClient, useSession } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { IconSun, IconMoon } from "@tabler/icons-react";
import Link from "next/link";

export default function Layout({ children }: any) {
  const router = useRouter();
  const session = useSession();
  const supabase = useSupabaseClient();
  const theme = useMantineTheme();
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/");
  }

  const navLinks = [
    { label: "Tablero", href: "/", icon: "./tablero.png" },
    { label: "Gráficas", href: "/recharts-test", icon: "./barras.png" },
    { label: "Reportes", href: "/reports", icon: "./table.png" },
    { label: "Alertas", href: "/alerts", icon: "./alerta.png" },
    { label: "Análisis", href: "/analysis", icon: "./analysis.png" },
  ];

  if (!session) return <>{children}</>;

  return (
    <>
      <AppShell
        padding="md"
        styles={{
          main: {
            backgroundColor: darkMode
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
            transition: "background-color 0.3s ease",
          },
        }}
        navbar={
          <Navbar
            width={{ base: isMenuCollapsed ? 60 : 200 }}
            p="xs"
            style={{
              backgroundColor: darkMode ? theme.colors.dark[7] : "white",
              transition: "width 0.3s ease, background-color 0.3s ease",
            }}
          >
            <Box>
              <div style={{ textAlign: "right", marginBottom: "1rem" }}>
                <Button
                  variant="light"
                  size="xs"
                  onClick={() => setIsMenuCollapsed(!isMenuCollapsed)}
                  style={{
                    backgroundColor: "#228BE6",
                    color: "white",
                    padding: "5px 10px",
                    borderRadius: "5px",
                  }}
                >
                  {isMenuCollapsed ? "➔" : "➖"}
                </Button>
              </div>

              {navLinks.map((link) => (
                <Link
                  href={link.href}
                  key={link.label}
                  passHref
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{
                      margin: "10px 0",
                      backgroundColor:
                        router.pathname === link.href
                          ? darkMode
                            ? theme.colors.dark[6]
                            : "#E0F7FA"
                          : "transparent",
                      borderRadius: "8px",
                      padding: "5px 10px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <Image
                      src={link.icon}
                      maw={30}
                      style={{
                        marginRight: isMenuCollapsed ? "0px" : "10px",
                        transition: "margin-right 0.3s ease",
                      }}
                    />
                    {!isMenuCollapsed && (
                      <NavLink
                        label={link.label}
                        active={router.pathname === link.href}
                        variant="subtle"
                        style={{
                          color: router.pathname === link.href
                            ? "#0288D1"
                            : darkMode
                            ? "#E0E0E0"
                            : "#333",
                          fontWeight: router.pathname === link.href
                            ? "bold"
                            : "normal",
                        }}
                      />
                    )}
                  </div>
                </Link>
              ))}
            </Box>

            <Button
              className="button block"
              onClick={handleSignOut}
              style={{
                marginTop: "auto",
                backgroundColor: "#F44336",
                color: "white",
                borderRadius: "5px",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#D32F2F")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#F44336")
              }
            >
              Cerrar Sesión
            </Button>
          </Navbar>
        }
        header={
          <Header
            height={60}
            p="xs"
            style={{
              backgroundColor: darkMode ? theme.colors.dark[7] : "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              transition: "background-color 0.3s ease",
            }}
          >
            <div
              style={{
                fontSize: "25px",
                fontWeight: "bold",
                color: darkMode ? "#E0E0E0" : "#0288D1",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Image
                src="./principalicon.jpg"
                maw={30}
                style={{ marginRight: "10px" }}
              />
              IoTColimex
            </div>
            <ActionIcon
              variant="light"
              size="lg"
              onClick={() => setDarkMode(!darkMode)}
              style={{
                color: darkMode ? "#FFD700" : "#0288D1",
                transition: "color 0.3s ease",
              }}
            >
              {darkMode ? <IconSun size={24} /> : <IconMoon size={24} />}
            </ActionIcon>
          </Header>
        }
      >
        {children}
      </AppShell>
    </>
  );
}
