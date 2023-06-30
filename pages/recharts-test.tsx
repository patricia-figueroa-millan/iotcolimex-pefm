import { Title, Grid, SimpleGrid } from "@mantine/core";
import { Fragment, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
// @ts-ignore
import { Database } from "../utils/database.types";
export default function ReachartsTest() {
  const supabase = useSupabaseClient<Database>();
  type DataType = {
    created_at: Date;
    temperature: number;
    atm_pressure: number;
    rel_humidity: number;
    wind_speed: number;
    soil_moisture: number;
  };
  const [meas, setMeas] = useState<DataType | undefined | any>(undefined);
  useEffect(() => {
    const fetchData = async () => {
      let response = await supabase
        .from("wx_meas")
        .select(
          "created_at, temperature"
        )
        .order("id", { ascending: false })
        .limit(7);
      // @ts-ignore
      console.log("Respuesta general de Supabase: ",response.data)

      // @ts-ignore
      setMeas(response.data);
    };
    fetchData();
  }, []);
  console.log(">>>> Resultados obtenidos: ", meas)
  let temperatura:number = Number(meas?.[0]?.temperature)
  console.log("Valor de temperatura: ",temperatura)
  // Aquí deberías obtener los datos que vienen de Supabase
  // Revisa el formato en que vienen para que puedas acomodarlos
  let measR: any[] = []
  let dataTemp = []
  let dataAP = []
  let dataRH = []
  let dataWS = []
  let dataSM = []

  console.log("Variable de Supabase: ", meas)
  {/* Obtenemos el arreglo invertido de las mediciones de SUPABASE */}
  if (meas) {
    for (let i=meas.length - 1; i >= 0; i--){
    const valueAtIndex = meas[i]
    measR.push(valueAtIndex)
  }
  } else {
    console.log("Algo no salió bien") 
  }
  console.log("Arreglo normal : ",meas)
  console.log("Arreglo invertido: ",measR)
  
  const data = [
    {
      date: measR?.[0]?.created_at,
      T: measR?.[0]?.temperature,
    },
    {
      date: measR?.[1]?.created_at,
      T: measR?.[1]?.temperature,
    },
    {
      date: measR?.[2]?.created_at,
      T: measR?.[2]?.temperature,
    },
    {
      date: measR?.[3]?.created_at,
      T: measR?.[3]?.temperature,
    },
    {
      date: measR?.[4]?.created_at,
      T: measR?.[4]?.temperature,
    },
    {
      date: measR?.[5]?.created_at,
      T: measR?.[5]?.temperature,
    },
    {
      date: measR?.[6]?.created_at,
      T: measR?.[6]?.temperature,
    },
  ];

  return (
    <>
      <Title order={1}>Mediciones</Title>

      
      <div style={{margin:"10px 0 0 0"}}>
      <SimpleGrid cols={2}>
        <div style={{borderStyle:"solid", borderColor:"#f07575", textAlign:"center"}}>
          <label>Temperatura</label>
          
          <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" style={{fontSize:"10px"}} angle={-20}/>
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="AP"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="RH" stroke="#82ca9d" />
          <Line type="monotone" dataKey="T" stroke="#ff0000" />
        </LineChart>
      </ResponsiveContainer>
          
        </div>

        <div style={{borderStyle:"solid", borderColor:"#99ebff", textAlign:"center"}}>
          <label>Presión Atmosférica</label>
          <div style={{height:"200px"}}>
          </div>
        </div>
        <div style={{borderStyle:"solid", borderColor:"#66a3ff", textAlign:"center"}}>
          <label>Humedad Relativa</label>
          <div style={{height:"200px"}}>
          </div>
        </div>

        <div style={{borderStyle:"solid", borderColor:"#e6e6e6", textAlign:"center"}}>
          <label>Velocidad del viento</label>
          <div style={{height:"200px"}}>
          </div>
        </div>

        <div style={{borderStyle:"solid", borderColor:"#806040", textAlign:"center"}}>
          <label>Humedad del suelo</label>
          <div style={{height:"200px"}}>
          </div>
        </div>
      </SimpleGrid>
    </div>
    </>
  );
}
