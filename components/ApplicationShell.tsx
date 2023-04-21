import { useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from '@mantine/core';

import { Badge, Box, NavLink } from '@mantine/core';


export default function ApplicationShell() {

  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
    return(
      <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
      <Box w={240}>
        <NavLink label="DASHBOARD" />
        <NavLink label="REPORTES"/>
        <NavLink label="GRÁFICOS" />
        <NavLink label="TABULAR"/>
        <NavLink label="REGISTRO USUARIOS"/>
        <NavLink label="LISTAR USUARIOS"/>
        <NavLink label="REGISTRO NODOS"/>
        <NavLink label="CONSULTA NODOS"/>
      </Box>
        </Navbar>
      }
      
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <label>MENÚ</label>
          </div>
        </Header>
      }
    >

    </AppShell>
    )
}