import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { LocalSessionContext } from "@/hooks/use-local-session";
import { Paper, TextInput, PasswordInput, Button, Title, Text, Container, Group, Stack } from "@mantine/core";
import Link from "next/link";
import { IconLock, IconMail } from "@tabler/icons-react";
import Image from "next/image";

const Login = () => {
  const router = useRouter();
  const { login } = useContext(LocalSessionContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (response.ok && result.data.session) {
      login();
    } else {
      setErrorMessage(result.message);
      return;
    }

    router.replace("/dashboard");
  };

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "url('/background-lemon.jpg') no-repeat center center",
      backgroundSize: "cover"
    }}>
      <Container size={420} p="md">
        <Paper withBorder shadow="md" p={30} radius="md" style={{ background: "rgba(255, 255, 255, 0.9)", backdropFilter: "blur(10px)" }}>

          {/* Logo */}
          <div style={{ textAlign: "center" }}>
            <Image src="/logo.png" alt="IoTColimex logo" width={100} height={100} />
          </div>

          <Title order={2} align="center" mt="md" color="green">
            Bienvenido a IoTColimex
          </Title>
          <Text size="sm" align="center" color="dimmed" mt={5}>
            Inicia sesión para monitorear tus cultivos
          </Text>

          <form onSubmit={handleLogin}>
            <Stack spacing="sm" mt="md">
              <TextInput
                label="Correo electrónico"
                placeholder="tuemail@example.com"
                icon={<IconMail size={18} />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <PasswordInput
                label="Contraseña"
                placeholder="********"
                icon={<IconLock size={18} />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {errorMessage && <Text color="red" size="sm">{errorMessage}</Text>}

              <Button type="submit" fullWidth mt="md" color="green">
                Iniciar sesión
              </Button>
            </Stack>
          </form>

          <Group position="center" mt="md">
            <Text size="xs" color="dimmed">¿Olvidaste tu contraseña? <Link href="/forgot-password" style={{ color: "green" }}>Recupérala aquí</Link></Text>
          </Group>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
