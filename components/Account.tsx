import { useState, useEffect } from "react";
import {
  useUser,
  useSupabaseClient,
  Session,
} from "@supabase/auth-helpers-react";

import { createClient } from "@supabase/supabase-js";
// @ts-ignore
import { Database } from "../utils/database.types";
import { SimpleGrid, Grid, Title, Image, Center } from "@mantine/core";
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

export default function Account({ session }: { session: Session }) {
  const supabaseClient = createClient(
    "https://frqeptoeeoyjaipcynip.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZycWVwdG9lZW95amFpcGN5bmlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY2NTk0NzAsImV4cCI6MTk5MjIzNTQ3MH0.1cDqSRfYw2qACKURNrZyyP4OU0u2ag_YZLOYzgtPhQ0"
  );

  const supabase = useSupabaseClient<Database>();
  const user = useUser();
  //AQUÍ SE BORRÓ CÓDIGO
  //AQUÍ TAMBIÉN
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
      <div style={{ padding: "5px 0 0 50px" }}>
        
         {/*<SimpleGrid cols={3} spacing="sm"> */}

          <Grid  gutter="xs" justify="center" align="stretch">

          <Grid.Col  span={4}>
          
          <Title order={2} color="#12486B" style={{marginLeft:"0px"}}>Temperatura</Title>
          <div
            style={{
              width: "340px",
              height: "240px",
              textAlign: "center",
              backgroundColor:"#E67D22"
            }}
          >
            <Title style={{fontSize:"45px", marginTop:"0px", color:"white"}} order={1}>{meas?.temperature} °C</Title>
            <Image src="./temperatura.png" maw={95} style={{marginTop:"5px"}} mx="auto"/>
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
          
          </Grid.Col>

          <Grid.Col span={4}>
          <div>
          <Title order={2} color="#12486B">Presión atmosférica</Title>
          <div
            style={{
              width: "340px",
              height: "240px",
              textAlign: "center",
              backgroundColor:"#86959B",
              marginBottom:"50px"
            }}
          >
            <Title order={2} style={{fontSize:"45px", marginTop:"0px", color:"WHITE"}}>{meas?.atm_pressure} mbar</Title>
            <Image src="./atmosferico.png" maw={95} style={{marginTop:"10px"}} mx="auto"/>
          </div>
          </div>
          </Grid.Col>

          <Grid.Col span={4}>
          <div>
          <Title  order={2} color="#12486B" >Humedad Relativa</Title>
          <div
            style={{
              width: "340px",
              height: "240px",
              textAlign: "center",
              backgroundColor:"#00A6D6"
            }}
          >
            <Title order={2} style={{fontSize:"45px", marginTop:"0px", color:"white"}}>{meas?.rel_humidity} %</Title>
            <Image src="./humedad.png" maw={95} style={{marginTop:"5px"}} mx="auto"/>
          </div>
          </div>
          </Grid.Col>

          <Grid.Col span={4}>
          <div>
          <Title  order={2} color="#12486B" >Velocidad del viento</Title>
          <div
            style={{
              width: "340px",
              height: "240px",
              textAlign: "center",
              backgroundColor:"#73B1B8"
            }}
          >
            <Title  style={{fontSize:"45px", marginTop:"0px", color:"WHITE"}} order={1}>{meas?.wind_speed} m/s</Title>
            <Image src="./viento.png" maw={95} mx="auto" style={{marginTop:"10px"}}/>
            <Title order={1} style={{marginTop:"10px", color:"WHITE"}}>Brisa moderada</Title>
          </div>
          </div>
          </Grid.Col>

          <Grid.Col span={4}>
          <div>
          <Title  order={2} color="#12486B" >Humedad del suelo</Title>
          <div
            style={{
              width: "340px",
              height: "240px",
              textAlign: "center",
              backgroundColor:"#A77540"
            }}
          >
            <Title style={{fontSize:"45px", marginTop:"0px", color:"white"}} order={1}>{meas?.soil_moisture} %</Title>
            <Image src="./suelo.png" maw={95} style={{marginTop:"3px"}} mx="auto"/>
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
