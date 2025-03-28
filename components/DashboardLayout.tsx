import {
  ActionIcon,
  AppShell,
  Box,
  Button,
  Header,
  Image,
  Navbar,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useState, useContext } from "react";
import { IconMoon, IconSun } from "@tabler/icons-react";
import Link from "next/link";
import { LocalSessionContext } from "@/hooks/use-local-session";
import { motion } from "framer-motion";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const session = useSession();
  const { isLoggedIn, logout } = useContext(LocalSessionContext);
  const supabase = useSupabaseClient();
  const theme = useMantineTheme();
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  async function handleSignOut() {
    await supabase.auth.signOut();
    logout();
    router.push("/login");
  }

  const navLinks = [
    {
      label: "Tablero",
      href: "/dashboard/account",
      icon: "/dashboard/tablero.png",
    },
    {
      label: "Gráficas",
      href: "/dashboard/recharts-test",
      icon: "/dashboard/barras.png",
    },
    {
      label: "Reportes",
      href: "/dashboard/reports",
      icon: "/dashboard/table.png",
    },
    {
      label: "Alertas",
      href: "/dashboard/alerts",
      icon: "/dashboard/alerta.png",
    },
  ];

  // Función para obtener la inicial del correo electrónico
  const getUserInitial = (email: string) => {
    return email.charAt(0).toUpperCase();
  };

  return (
    <>
      <AppShell
        padding="md"
        styles={{
          main: {
            backgroundColor: darkMode ? "#263238" : "#F1F8E9",
            transition: "background-color 0.3s ease",
          },
        }}
        navbar={
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Navbar
              width={{ base: isMenuCollapsed ? 70 : 220 }}
              p="xs"
              style={{
                backgroundColor: darkMode ? theme.colors.dark[7] : "#C5E1A5",
                transition: "width 0.3s ease, background-color 0.3s ease",
                borderRadius: "0px 15px 15px 0px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "4px 0px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Box>
                <div style={{ textAlign: "right", marginBottom: "1rem" }}>
                  <Button
                    variant="light"
                    size="xs"
                    onClick={() => setIsMenuCollapsed(!isMenuCollapsed)}
                    style={{
                      backgroundColor: "#388E3C",
                      color: "white",
                      padding: "5px 10px",
                      borderRadius: "5px",
                    }}
                  >
                    {isMenuCollapsed ? "➔" : "➖"}
                  </Button>
                </div>

                {navLinks.map((link) => (
                  <Link href={link.href} key={link.label} passHref style={{ textDecoration: "none" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        margin: "10px 0",
                        padding: "8px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        backgroundColor:
                          router.pathname === link.href
                            ? darkMode
                              ? theme.colors.dark[6]
                              : "#A5D6A7"
                            : "transparent",
                      }}
                    >
                      <Image
                        src={link.icon}
                        width={30}
                        alt=""
                        style={{ marginRight: isMenuCollapsed ? "0px" : "10px" }}
                      />
                      {!isMenuCollapsed && (
                        <Text
                          weight={router.pathname === link.href ? 700 : 400}
                          size="md"
                          color={router.pathname === link.href ? "#1B5E20" : "black"}
                          style={{ textDecoration: "none" }} // Quita el subrayado
                        >
                          {link.label}
                        </Text>
                      )}
                    </div>
                  </Link>
                ))}
              </Box>

              {/* Indicador de Usuario Loggeado */}
              {session && (
                <Box
                  style={{
                    backgroundColor: "#E8F5E9",
                    padding: "10px",
                    borderRadius: "8px",
                    textAlign: "center",
                    marginBottom: "50px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  }}
                >
                  {isMenuCollapsed ? (
                    <Text weight={600} color="#2E7D32" size="lg">
                      {session.user.email ? getUserInitial(session.user.email) : "?"}
                    </Text>
                  ) : (
                    <>
                      <Text weight={600} color="#2E7D32" size="sm">
                        Usuario:
                      </Text>
                      <Text color="#1B5E20" size="sm" style={{ wordBreak: "break-word", fontWeight: "bold" }}>
                        {session.user.email}
                      </Text>
                    </>
                  )}
                </Box>
              )}

              {/* Botón de Cerrar Sesión */}
              <motion.div whileHover={{ scale: 1.05 }} style={{ top: "auto", position: "absolute", bottom: "10px", width: "100%" }}>
                <Button
                  onClick={handleSignOut}
                  style={{
                    backgroundColor: "#D32F2F",
                    color: "white",
                    borderRadius: "5px",
                    transition: "background-color 0.3s ease",
                    position: "relative",
                    width: "90%",

                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#D32F2F")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#F44336")}
                >
                  Cerrar Sesión
                </Button>
              </motion.div>
            </Navbar>
          </motion.div >
        }
        header={
          < motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Header
              height={65}
              p="xs"
              style={{
                backgroundColor: darkMode ? "#1B5E20" : "#8BC34A",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                transition: "background-color 0.3s ease",
                borderRadius: "0px 0px 15px 15px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                style={{
                  fontSize: "22px",
                  fontWeight: "bold",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Image
                  alt="IoTColimex Logo"
                  src="/principalicon.jpg"
                  maw={35}
                  style={{
                    marginRight: "12px",
                    borderRadius: "50%",
                    border: "2px solid white",
                  }}
                />
                IoTColimex
              </div>
              <motion.div whileHover={{ scale: 1.2 }}>
                <ActionIcon
                  variant="light"
                  size="lg"
                  onClick={() => setDarkMode(!darkMode)}
                  style={{
                    color: darkMode ? "#FFD700" : "#1B5E20",
                    transition: "color 0.3s ease",
                  }}
                >
                  {darkMode ? <IconSun size={24} /> : <IconMoon size={24} />}
                </ActionIcon>
              </motion.div>
            </Header>
          </motion.div >
        }
      >
        {children}
      </AppShell >
    </>
  );
}
