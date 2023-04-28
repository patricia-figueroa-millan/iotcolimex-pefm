import { useState } from 'react';
import {
  Button,
  AppShell,
  Navbar,
  Header,
  useMantineTheme,
} from '@mantine/core';
import Link from 'next/link';
// @ts-ignore
import { Database } from '../utils/database.types'
import { NativeSelect } from '@mantine/core';
import { Badge, Box, NavLink } from '@mantine/core';
import { SimpleGrid } from '@mantine/core';
import { useUser, useSupabaseClient, Session } from '@supabase/auth-helpers-react'
export default function ApplicationShell() {
  const supabase = useSupabaseClient<Database>()
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
    return(
      
      <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 200 }} height={600} p="xs">{
          <Box w={240}>
            <div style={{margin:"0 60px 0 0"}}>
                <NavLink label="DASHBOARD"/> 
            </div>

            <div style={{margin:"0 60px 0 0"}}>
            <NavLink label="REPORTES" childrenOffset={28}>
              
              <div style={{margin:"0 60px 0 0"}}>
              <NavLink label="GRÁFICOS" />
              </div>
              <div style={{margin:"0 60px 0 0"}}>
              <NavLink label="TABULAR" />
              </div>
              </NavLink>
            </div>

            <div style={{margin:"0 60px 0 0"}}>
            <NavLink label="REGISTRO USUARIOS"/>
            </div>
            <div style={{margin:"0 60px 0 0"}}>
            <NavLink label="LISTAR USUARIOS" />
            </div>
            <div style={{margin:"0 60px 0 0"}}>
            <NavLink label="REGISTRO NODOS" />
            </div>
            <div style={{margin:"0 60px 0 0"}}>
            <NavLink label="CONSULTA NODOS" />
            </div>
          </Box>}
          <Button className="button block" onClick={() => supabase.auth.signOut()}>
        Sign Out
       </Button>
        </Navbar>
      }

      header={
        <Header 
          height={60} p="xs">{/* Header content */}
            <div style={{padding:"10px 0 0 20px"}}>
              <label>MENÚ</label>
            </div>
        </Header>
      }
      
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
      {/* Your application here */}
      
      <div style={{width:"10%"}}>
        <NativeSelect
        data={['1','2','3','4','5']}
        label="Nodo"
        description="Seleccionar estación"
        size="md"
        />
      </div>
      <label style={{display:"block", margin:"30px 0 0 0", fontFamily:"Arial"}}>Último valor sensado</label>
      <div style={{padding:"30px 0 0 0"}}>
          <SimpleGrid cols={5} spacing="sm">
          <div style={{width:"200px", height:"200px", borderStyle:"solid", borderColor:"black"}}></div>
          <div style={{width:"200px", height:"200px", borderStyle:"solid", borderColor:"black"}}></div>
          <div style={{width:"200px", height:"200px", borderStyle:"solid", borderColor:"black"}}></div>
          <div style={{width:"200px", height:"200px", borderStyle:"solid", borderColor:"black"}}></div>
          <div style={{width:"200px", height:"200px", borderStyle:"solid", borderColor:"black"}}></div>
          </SimpleGrid>
      </div>
      <span style={{padding:"50px"}}> </span>
      <div style={{width:"1200px", height:"200px", borderStyle:"solid", borderColor:"black"}}></div>
    </AppShell>
    )
}