import { useState, useEffect } from "react";
import {
  useUser,
  useSupabaseClient,
  Session,
} from "@supabase/auth-helpers-react";

import { createClient } from "@supabase/supabase-js";
// @ts-ignore
import { Database } from "../utils/database.types";
// COMPONENTE "Account" anida a componente "Avatar"
import { SimpleGrid, Grid, Title, Image } from "@mantine/core";
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

export default function Account({ session }: { session: Session }) {
  const supabaseClient = createClient(
    "https://frqeptoeeoyjaipcynip.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZycWVwdG9lZW95amFpcGN5bmlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY2NTk0NzAsImV4cCI6MTk5MjIzNTQ3MH0.1cDqSRfYw2qACKURNrZyyP4OU0u2ag_YZLOYzgtPhQ0"
  );

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

  type DataType = {
    temperature: number;
    atm_pressure: number;
    rel_humidity: number;
    wind_speed: number;
    soil_moisture: number;
  };

  const [temp, setTemp] = useState<any>(null);
  const [meas, setMeas] = useState<DataType | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      let response = await supabase
        .from("wx_meas")
        .select(
          "temperature ,atm_pressure, rel_humidity, wind_speed, soil_moisture"
        )
        .order("id", { ascending: false })
        .limit(1);
      // @ts-ignore
      console.log(response.data[0])
      // @ts-ignore
      setMeas(response.data[0]);
    };
    fetchData();
  }, []);



  return (
    <div>
      {/*}
      <div style={{ width: "10%" }}>
        <NativeSelect
          data={["1", "2", "3", "4"]}
          label="Nodo"
          description="Seleccionar estación"
          size="md"
        />
      </div>
      */}
      <label
        style={{ display: "block", margin: "30px 0 0 0", fontFamily: "Arial" }}
      >
        <Title order={3} fw={500}>
          Último valor sensado
        </Title>
      </label>
      


      <div style={{ padding: "70px 0 0 50px" }}>
        
         {/*<SimpleGrid cols={3} spacing="sm"> */}

          <Grid grow gutter="xl">
          <Grid.Col span={4}>
          <div>
          <Title  fz="lg">Temperatura</Title>
          <div
            style={{
              width: "200px",
              height: "100px",
              borderStyle: "solid",
              borderColor: "black",
              textAlign: "center",
              backgroundColor:"#f07575"
            }}
          >
            <Title order={1}>{meas?.temperature} °C</Title>
            <Image src="./temp.png" maw={40} mx="auto"/>
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
          </div>
          </Grid.Col>

          <Grid.Col span={4}>
          <div>
          <Title  fz="lg">Presión atmosférica</Title>
          <div
            style={{
              width: "250px",
              height: "100px",
              borderStyle: "solid",
              borderColor: "black",
              textAlign: "center",
              backgroundColor:"#99ebff",
              marginBottom:"50px"
            }}
          >
            <Title order={1}>{meas?.atm_pressure} mbar</Title>
            <Image src="./atm_pressure.png" maw={40} mx="auto"/>
          </div>
          </div>
          </Grid.Col>

          <Grid.Col span={4}>
          <div>
          <Title  fz="lg">Humedad Relativa</Title>
          <div
            style={{
              width: "200px",
              height: "100px",
              borderStyle: "solid",
              borderColor: "black",
              textAlign: "center",
              backgroundColor:"#66a3ff"
            }}
          >
            <Title order={1}>{meas?.rel_humidity}</Title>
            <Image src="./humidity.png" maw={40} mx="auto"/>
          </div>
          </div>
          </Grid.Col>

          <Grid.Col span={4} offset={2}>
          <div>
          <Title  fz="lg">Velocidad del viento</Title>
          <div
            style={{
              width: "200px",
              height: "100px",
              borderStyle: "solid",
              borderColor: "black",
              textAlign: "center",
              backgroundColor:"#e6e6e6"
            }}
          >
            <Title order={1}>{meas?.wind_speed} m/s</Title>
            <Image src="./wind_speed.png" maw={40} mx="auto"/>
          </div>
          </div>
          </Grid.Col>

          <Grid.Col span={4} offset={-2}>
          <div>
          <Title  fz="lg">Humedad del suelo</Title>
          <div
            style={{
              width: "200px",
              height: "100px",
              borderStyle: "solid",
              borderColor: "black",
              textAlign: "center",
              backgroundColor:"#806040"
            }}
          >
            <Title order={1}>{meas?.soil_moisture} %</Title>
            <Image src="./soil_moisture.png" maw={40} mx="auto"/>
          </div>
          </div>
          </Grid.Col>
        {/* </div></div></SimpleGrid>*/}
        </Grid>
      </div>
      <span style={{ padding: "50px" }}> </span>
      
    </div>




  );
}
