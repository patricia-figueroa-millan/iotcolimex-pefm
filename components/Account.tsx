import { useState, useEffect } from "react";
import {
  useUser,
  useSupabaseClient,
  Session,
} from "@supabase/auth-helpers-react";

import { createClient } from '@supabase/supabase-js'
// @ts-ignore
import { Database } from "../utils/database.types";
// COMPONENTE "Account" anida a componente "Avatar"
import Avatar from "./Avatar";
import { SimpleGrid } from "@mantine/core";
import Data from "./Data";
import ApplicationShell from "./ApplicationShell";
import Layout from "./Layout";

import { Button } from "@mantine/core";
import { AppShell, Navbar, Header } from "@mantine/core";
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];
import { NativeSelect } from "@mantine/core";

export default function Account({ session }: { session: Session }) {
  
  const supabaseClient = createClient('https://frqeptoeeoyjaipcynip.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZycWVwdG9lZW95amFpcGN5bmlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY2NTk0NzAsImV4cCI6MTk5MjIzNTQ3MH0.1cDqSRfYw2qACKURNrZyyP4OU0u2ag_YZLOYzgtPhQ0')

  const supabase = useSupabaseClient<Database>();
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<Profiles["username"]>(null);
  const [website, setWebsite] = useState<Profiles["website"]>(null);
  const [avatar_url, setAvatarUrl] = useState<Profiles["avatar_url"]>(null);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!user) throw new Error("No user");

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert("Error loading user data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: Profiles["username"];
    website: Profiles["website"];
    avatar_url: Profiles["avatar_url"];
  }) {
    try {
      setLoading(true);
      if (!user) throw new Error("No user");

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      };

      let { error } = await supabase.from("profiles").upsert(updates);
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  
  const [temp, setTemp] = useState<any>(null)

  useEffect (()=> {
    const fetchTemp = async () => {
      let data = await supabaseClient 
    .from('wx_meas')
    .select('temperature ,atm_pressure, rel_humidity, wind_speed, soil_moisture')
    .order('id',{ascending:false})
    .limit(1)
    let {data:datos} = data
    console.log(datos)    
    let datos_array = Object.values(datos[0])
    console.log(datos_array)
    // @ts-ignore
    console.log(datos[0].temperature)
    setTemp(datos_array)
    }
    fetchTemp()
  },[])
 
  

    {/*
  async function getData() {   
  let {data,error} = await supabaseClient 
    .from('wx_meas')
    .select()
    .order('id',{ascending:false})
    .limit(1)
    let dataTemp = JSON.stringify(data,null,0)
    return (
    console.log(data),
    console.log(typeof(data)),
    console.log(dataTemp),
    console.log(typeof(dataTemp))
    )}
   */}

  
  return (
    <div>
      <div style={{ width: "10%" }}>
        <NativeSelect
          data={["1", "2", "3", "4"]}
          label="Nodo"
          description="Seleccionar estación"
          size="md"
        />
      </div>
      <label
        style={{ display: "block", margin: "30px 0 0 0", fontFamily: "Arial" }}
      >
        Último valor sensado
      </label>
      <div style={{ padding: "30px 0 0 0" }}>
        <SimpleGrid cols={5} spacing="sm">
          <div
            style={{
              width: "200px",
              height: "100px",
              borderColor: "black",
              backgroundColor:"red",
              color:"white",
              textAlign:"center"
            }}
          >
            {/*
            <button onClick={getData}>Click me</button>
             */}
             {/*<table>
             <tr>
                <td>{temp[0]}</td>
                <td>{temp[1]}</td>
                <td>{temp[2]}</td>
                <td>{temp[3]}</td>
                <td>{temp[4]}</td>
              </tr>
            </table>*/}
            {/*<h1>{temp[0]}</h1>*/}
                  
          </div>
          <div
            style={{
              width: "200px",
              height: "100px",
              borderStyle: "solid",
              borderColor: "black",
              textAlign:"center"
            }}  
          >
            {/*<h1>{temp[0]}</h1>*/}
          </div>
          <div
            style={{
              width: "200px",
              height: "100px",
              borderStyle: "solid",
              borderColor: "black",
              textAlign:"center"
            }}
          >
            {/*<h1>{temp[0]}</h1>*/}
          </div>
          <div
            style={{
              width: "200px",
              height: "100px",
              borderStyle: "solid",
              borderColor: "black",
              textAlign:"center"
            }}
          >
            {/*<h1>{temp[0]}</h1>*/}
          </div>
          <div
            style={{
              width: "200px",
              height: "100px",
              borderStyle: "solid",
              borderColor: "black",
              textAlign:"center"
            }}
          >
            {/*<h1>{temp[0]}</h1>*/}
          </div>
        </SimpleGrid>
      </div>
      <span style={{ padding: "50px" }}> </span>
      <div
        style={{
          width: "1200px",
          height: "200px",
          borderStyle: "solid",
          borderColor: "black",
          textAlign:"center"
        }}
      >
        
      </div>
    </div>
  );
}
