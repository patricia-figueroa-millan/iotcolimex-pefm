//////////////////////////////////////////////////////////////// Sección nueva

import { useState, useEffect } from "react";
import { Grid, Title, Image, Center, Card, Text } from "@mantine/core";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

type DataType = {
  temperature: number;
  atm_pressure: number;
  rel_humidity: number;
  wind_speed: number;
  soil_moisture: number;
};

export default function Account() {
  const supabase = useSupabaseClient();
  const [meas, setMeas] = useState<DataType | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      let response = await supabase
        .from("wx_meas")
        .select(
          "temperature, atm_pressure, rel_humidity, wind_speed, soil_moisture"
        )
        .order("id", { ascending: false })
        .limit(1);
      setMeas(response.data?.[0]);
    };
    fetchData();
  }, [supabase]);

  const metrics = [
    {
      title: "Temperatura",
      value: `${meas?.temperature || 0} °C`,
      description: getTemperatureDescription(meas?.temperature),
      color: "#E67D22",
      icon: "./temperatura.png",
    },
    {
      title: "Presión Atmosférica",
      value: `${meas?.atm_pressure || 0} mbar`,
      description: getPressureDescription(meas?.atm_pressure),
      color: "#86959B",
      icon: "./atmosferico.png",
    },
    {
      title: "Humedad Relativa",
      value: `${meas?.rel_humidity || 0} %`,
      description: getHumidityDescription(meas?.rel_humidity),
      color: "#00A6D6",
      icon: "./humedad.png",
    },
    {
      title: "Velocidad del Viento",
      value: `${meas?.wind_speed || 0} m/s`,
      description: getWindDescription(meas?.wind_speed),
      color: "#73B1B8",
      icon: "./viento.png",
    },
    {
      title: "Humedad del Suelo",
      value: `${meas?.soil_moisture || 0} %`,
      description: getSoilMoistureDescription(meas?.soil_moisture),
      color: "#A77540",
      icon: "./suelo.png",
    },
  ];

  return (
    <div style={{ padding: "2rem" }}>
      <Grid
        gutter="xl"
        justify="center"
        align="stretch"
        style={{
          gap: "20px",
          justifyContent: "space-around",
        }}
      >
        {metrics.map((metric, index) => (
          <Grid.Col key={index} xs={12} sm={6} md={4}>
            <Card
              shadow="md"
              radius="md"
              withBorder
              style={{
                borderColor: metric.color,
                borderWidth: "2px",
                transition: "transform 0.2s ease-in-out",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.15)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1.0)")
              }
            >
              <Center>
                <Image src={metric.icon} alt={metric.title} maw={70} />
              </Center>
              <Title order={3} align="center" style={{ color: metric.color }}>
                {metric.title}
              </Title>
              <Text
                align="center"
                weight="bold"
                style={{ fontSize: "2rem", marginTop: "10px" }}
              >
                {metric.value}
              </Text>
              <Text align="center" style={{ color: metric.color, fontSize: "1.3rem", fontWeight: "bold"}}>
                {metric.description}
              </Text>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
}

function getTemperatureDescription(value?: number): string {
  if (!value) return "Sin datos";
  if (value <= 7) return "Muy frío";
  if (value <= 14) return "Fresco";
  if (value <= 21) return "Templado";
  if (value <= 28) return "Cálido";
  if (value <= 35) return "Caliente";
  return "Muy caliente";
}

function getPressureDescription(value?: number): string {
  if (!value) return "Sin datos";
  if (value < 1009) return "Baja";
  if (value <= 1023) return "Normal";
  return "Alta";
}

function getHumidityDescription(value?: number): string {
  if (!value) return "Sin datos";
  if (value < 50) return "Baja";
  if (value <= 80) return "Alta";
  return "Muy alta";
}

function getWindDescription(value?: number): string {
  if (!value) return "Sin datos";
  if (value < 0.5) return "Calmado";
  if (value < 5.5) return "Brisa";
  return "Fuerte";
}

function getSoilMoistureDescription(value?: number): string {
  if (!value) return "Sin datos";
  if (value < 15) return "Muy seco";
  if (value < 30) return "Seco";
  return "Mojado";
}







//////////////////////////////////////////////////////////////// Sección antigua pero funcional



// import { useState, useEffect } from "react";
// import {
//   useUser,
//   useSupabaseClient,
//   Session,
// } from "@supabase/auth-helpers-react";
// import Avatar from "./Avatar";
// import Data from "./Data";
// import { createClient } from "@supabase/supabase-js";
// // @ts-ignore
// import { Database } from "../utils/database.types";
// import { SimpleGrid, Grid, Title, Image, Center } from "@mantine/core";
// type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

// export default function Account({ session }: { session: Session }) {
//   const supabaseClient = createClient(
//     "https://frqeptoeeoyjaipcynip.supabase.co",
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZycWVwdG9lZW95amFpcGN5bmlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY2NTk0NzAsImV4cCI6MTk5MjIzNTQ3MH0.1cDqSRfYw2qACKURNrZyyP4OU0u2ag_YZLOYzgtPhQ0"
//   );

//   const supabase = useSupabaseClient<Database>();
//   const user = useUser();

//   const [loading, setLoading] = useState(true);
//   const [username, setUsername] = useState<Profiles["username"]>(null);
//   const [website, setWebsite] = useState<Profiles["website"]>(null);
//   const [avatar_url, setAvatarUrl] = useState<Profiles["avatar_url"]>(null);

//   useEffect(() => {
//   }, [session]);

//   {/* useEffect(() => {
//     getProfile();
//   }, [session]); */}
//   {/* 
//   async function getProfile() {
//     try {
//       setLoading(true);
//       if (!user) throw new Error("No user");

//       let { data, error, status } = await supabase
//         .from("profiles")
//         .select(`username, website, avatar_url`)
//         .eq("id", user.id)
//         .single();

//       if (error && status !== 406) {
//         throw error;
//       }

//       if (data) {
//         setUsername(data.username);
//         setWebsite(data.website);
//         setAvatarUrl(data.avatar_url);
//       }
//     } catch (error) {
//       alert("Error loading user data!");
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   }
// */}
//   async function updateProfile({
//     username,
//     website,
//     avatar_url,
//   }: {
//     username: Profiles["username"];
//     website: Profiles["website"];
//     avatar_url: Profiles["avatar_url"];
//   }) {
//     try {
//       setLoading(true);
//       if (!user) throw new Error("No user");

//       const updates = {
//         id: user.id,
//         username,
//         website,
//         avatar_url,
//         updated_at: new Date().toISOString(),
//       };

//       let { error } = await supabase.from("profiles").upsert(updates);
//       if (error) throw error;
//       alert("Profile updated!");
//     } catch (error) {
//       alert("Error updating the data!");
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   //AQUÍ SE BORRÓ CÓDIGO
//   //AQUÍ TAMBIÉN
//   type DataType = {
//     temperature: number;
//     atm_pressure: number;
//     rel_humidity: number;
//     wind_speed: number;
//     soil_moisture: number;
//   };

//   const [temp, setTemp] = useState<any>(null);
//   const [meas, setMeas] = useState<DataType | undefined>(undefined);

//   useEffect(() => {
//     const fetchData = async () => {
//       let response = await supabase
//         .from("wx_meas")
//         .select(
//           "temperature ,atm_pressure, rel_humidity, wind_speed, soil_moisture"
//         )
//         .order("id", { ascending: false })
//         .limit(1);
//       // @ts-ignore
//       console.log(response.data[0])
//       // @ts-ignore
//       setMeas(response.data[0]);
//     };
//     fetchData();
//   }, []);

  
//   let tsign
//   let pasign
//   let rhsign
//   let wsign
//   let smsign


   
//   if (meas && typeof meas.temperature === "number" && meas.temperature >= 0 && meas.temperature <= 7.00)
//     tsign = "Muy frío";
//   else if (meas && typeof meas.temperature === "number" && meas.temperature >= 7.00 && meas.temperature <= 14.00)
//     tsign = "Fresco";
//   else if (meas && typeof meas.temperature === "number" && meas.temperature >= 14.00 && meas.temperature <= 21.00)
//     tsign = "Templado";
//   else if (meas && typeof meas.temperature === "number" && meas.temperature >= 21.00 && meas.temperature <= 28.00)
//     tsign = "Cálido";
//   else if (meas && typeof meas.temperature === "number" && meas.temperature >= 28.00 && meas.temperature <= 35.00)
//     tsign = "Caliente";
//   else if (meas && typeof meas.temperature === "number" && meas.temperature > 35.00)
//     tsign = "Muy caliente";
  


//   if (meas && typeof meas.rel_humidity === "number" && meas.rel_humidity < 50.00 )
//     rhsign = "Baja";
//   else if (meas && typeof meas.rel_humidity === "number" && meas.rel_humidity >= 50.00 && meas.rel_humidity <= 80.00)
//     rhsign = "Alta";
//   else if (meas && typeof meas.rel_humidity === "number" && meas.rel_humidity > 80.00)
//     rhsign = "Muy alta";



//   if (meas && typeof meas.atm_pressure === "number" && meas.atm_pressure < 1009.144 )
//     pasign = "Baja";
//   else if (meas && typeof meas.atm_pressure === "number" && meas.atm_pressure >= 1009.144 && meas.atm_pressure <= 1022.689)
//     pasign = "Normal";
//   else if (meas && typeof meas.atm_pressure === "number" && meas.atm_pressure > 1022.689)
//     pasign = "Alta";
  

//   if (meas && typeof meas.soil_moisture === "number" && meas.soil_moisture < 15.00)
//     smsign = "Muy seco";
//   else if (meas && typeof meas.soil_moisture === "number" && meas.soil_moisture >= 15.00 && meas.soil_moisture < 20.00)
//     smsign = "Seco";
//   else if (meas && typeof meas.soil_moisture === "number" && meas.soil_moisture >= 20.00 && meas.soil_moisture < 25.00)
//     smsign = "Moderado";
//   else if (meas && typeof meas.soil_moisture === "number" && meas.soil_moisture >= 25.00 && meas.soil_moisture < 30.00)
//     smsign = "Mojado";
//   else if (meas && typeof meas.soil_moisture === "number" && meas.soil_moisture >= 30.00)
//     smsign = "Muy mojado";



//   if (meas && typeof meas.wind_speed === "number" && meas.wind_speed < 0.277)
//     wsign = "Calmado";
//   else if (meas && typeof meas.wind_speed === "number" && meas.wind_speed >= 0.277 && meas.wind_speed < 1.666)
//     wsign = "Aire ligero";
//   else if (meas && typeof meas.wind_speed === "number" && meas.wind_speed >= 1.666 && meas.wind_speed < 3.333)
//     wsign = "Brisa Ligera";
//   else if (meas && typeof meas.wind_speed === "number" && meas.wind_speed >= 3.333 && meas.wind_speed < 5.555)
//     wsign = "Brisa suave";
//   else if (meas && typeof meas.wind_speed === "number" && meas.wind_speed >= 5.555 && meas.wind_speed < 8.055)
//     wsign = "Brisa moderada";
//   else if (meas && typeof meas.wind_speed === "number" && meas.wind_speed >= 8.055 && meas.wind_speed < 10.833)
//     wsign = "Brisa fresca";
//   else if (meas && typeof meas.wind_speed === "number" && meas.wind_speed >= 10.833 && meas.wind_speed < 13.888)
//     wsign = "Brisa fuerte";
//   else if (meas && typeof meas.wind_speed === "number" && meas.wind_speed >= 13.888 && meas.wind_speed < 17.222)
//     wsign = "Viento moderado";
//   else if (meas && typeof meas.wind_speed === "number" && meas.wind_speed >= 17.222 && meas.wind_speed < 20.833)
//     wsign = "Viento fresco";
//   else if (meas && typeof meas.wind_speed === "number" && meas.wind_speed >= 20.833 && meas.wind_speed < 24.722)
//     wsign = "Viento fuerte";
//   else if (meas && typeof meas.wind_speed === "number" && meas.wind_speed >= 24.722 && meas.wind_speed < 28.611)
//     wsign = "Viento muy fuerte";
//   else if (meas && typeof meas.wind_speed === "number" && meas.wind_speed >= 28.611 && meas.wind_speed < 32.5)
//     wsign = "Tormenta";
//   else if (meas && typeof meas.wind_speed === "number" && meas.wind_speed >= 32.5)
//     wsign = "Huracán"; 

    
//   return (
//     <div>
//       {/*}
//       <div style={{ width: "10%" }}>
//         <NativeSelect
//           data={["1", "2", "3", "4"]}
//           label="Nodo"
//           description="Seleccionar estación"
//           size="md"
//         />
//       </div>
//       */}
//       <div style={{ padding: "5px 0 0 50px" }}>
        
//          {/*<SimpleGrid cols={3} spacing="sm"> */}

//           <Grid  gutter="xs" justify="left" align="stretch">

//           <Grid.Col  span={4}>
          
//           <Title order={2} color="#12486B" style={{marginLeft:"0px"}}>Temperatura</Title>
//           <div
//             style={{
//               width: "340px",
//               height: "240px",
//               textAlign: "center",
//               backgroundColor:"#E67D22"
//             }}
//           >
//             <Title style={{fontSize:"45px", marginTop:"0px", color:"white"}} order={1}>{meas?.temperature} °C</Title>
//             <Image src="./temperatura.png" maw={95} style={{marginTop:"5px"}} mx="auto"/>
//             <Title order={1} style={{marginTop:"10px", color:"WHITE"}}>{tsign}</Title>
//             {/*
//             <button onClick={getData}>Click me</button>
//              */}
//             {/*<table>
//              <tr>
//                 <td>{temp[0]}</td>
//                 <td>{temp[1]}</td>
//                 <td>{temp[2]}</td>
//                 <td>{temp[3]}</td>
//                 <td>{temp[4]}</td>
//               </tr>
//             </table>*/}
//             {/*<h1>{temp[0]}</h1>*/}
//           </div>
          
//           </Grid.Col>

//           <Grid.Col span={4}>
//           <div>
//           <Title order={2} color="#12486B">Presión atmosférica</Title>
//           <div
//             style={{
//               width: "340px",
//               height: "240px",
//               textAlign: "center",
//               backgroundColor:"#86959B",
//               marginBottom:"50px"
//             }}
//           >
//             <Title order={2} style={{fontSize:"45px", marginTop:"0px", color:"WHITE"}}>{meas?.atm_pressure} mbar</Title>
//             <Image src="./atmosferico.png" maw={95} style={{marginTop:"10px"}} mx="auto"/>
//             <Title order={1} style={{marginTop:"10px", color:"WHITE"}}>{pasign}</Title>
//           </div>
//           </div>
//           </Grid.Col>

//           <Grid.Col span={4}>
//           <div>
//           <Title  order={2} color="#12486B" >Humedad Relativa</Title>
//           <div
//             style={{
//               width: "340px",
//               height: "240px",
//               textAlign: "center",
//               backgroundColor:"#00A6D6"
//             }}
//           >
//             <Title order={2} style={{fontSize:"45px", marginTop:"0px", color:"white"}}>{meas?.rel_humidity} %</Title>
//             <Image src="./humedad.png" maw={95} style={{marginTop:"5px"}} mx="auto"/>
//             <Title order={1} style={{marginTop:"10px", color:"WHITE"}}>{rhsign}</Title>
//           </div>
//           </div>
//           </Grid.Col>

//           <Grid.Col span={4}>
//           <div>
//           <Title  order={2} color="#12486B" >Velocidad del viento</Title>
//           <div
//             style={{
//               width: "340px",
//               height: "240px",
//               textAlign: "center",
//               backgroundColor:"#73B1B8"
//             }}
//           >
//             <Title  style={{fontSize:"45px", marginTop:"0px", color:"WHITE"}} order={1}>{meas?.wind_speed} m/s</Title>
//             <Image src="./viento.png" maw={95} mx="auto" style={{marginTop:"10px"}}/>
//             <Title order={1} style={{marginTop:"10px", color:"WHITE"}}>{wsign}</Title>
//           </div>
//           </div>
//           </Grid.Col>

//           <Grid.Col span={4}>
//           <div>
//           <Title  order={2} color="#12486B" >Humedad del suelo</Title>
//           <div
//             style={{
//               width: "340px",
//               height: "240px",
//               textAlign: "center",
//               backgroundColor:"#A77540"
//             }}
//           >
//             <Title style={{fontSize:"45px", marginTop:"0px", color:"white"}} order={1}>{meas?.soil_moisture} %</Title>
//             <Image src="./suelo.png" maw={95} style={{marginTop:"3px"}} mx="auto"/>
//             <Title order={1} style={{marginTop:"10px", color:"WHITE"}}>{smsign}</Title>
//           </div>
//           </div>
//           </Grid.Col>
//         {/* </div></div></SimpleGrid>*/}
//         </Grid>
        
//       </div>
//       <span style={{ padding: "50px" }}> </span>
      
//     </div>




//   );
// }
