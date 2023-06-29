import { NativeSelect, Grid, SimpleGrid } from "@mantine/core";
import { DatePickerInput } from '@mantine/dates';
import { Fragment, useEffect, useState } from "react";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
// @ts-ignore
import { Database } from "../utils/database.types";
export default function Reportes_Graficos() { 
  const supabase = useSupabaseClient<Database>();
  type DataType = {
    created_at: Date;
    temperature: number;
    atm_pressure: number;
    rel_humidity: number;
    wind_speed: number;
    soil_moisture: number;
  };
  const [temp, setTemp] = useState<any>(null);
  const [meas, setMeas] = useState<DataType | undefined | any>(undefined);
  let limit:number = 5
  useEffect(() => {
    const fetchData = async () => {
      let response = await supabase
        .from("wx_meas")
        .select(
          "created_at,temperature ,atm_pressure, rel_humidity, wind_speed, soil_moisture"
        )
        .order("id", { ascending: false })
        .limit(5);
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


{/* Declaración de arreglos que contendrán datos para graficar  

let measR: any[] = []
let DataTempe: any[] = []
let DataAtmP: any[] = []
let DataRelH: any[] = []
let DataWiSp: any[] = []
let DataSoMo: any[] = []

console.log("Variable de Supabase: ", meas)

{/* Obtenemos el arreglo invertido de las mediciones de SUPABASE  
for (let i=meas.length - 1; i >= 0; i--){
  const valueAtIndex = meas[i]
  measR.push(valueAtIndex)
}

console.log("Arreglo normal : ",meas)
console.log("Arreglo invertido: ",measR)

{/* Ciclos FOR para llenar arreglo de objetos con propiedades X: fecha y Y: medición  
for(let i=0; i<measR.length; i++) {
  DataTempe.splice(i,0,
    {
      "x":measR?.[i]?.created_at,
      "y":measR?.[i]?.temperature
    }
  )
}

for(let i=0; i<measR.length; i++) {
  DataAtmP.splice(i,0,
    {
      "x":measR?.[i]?.created_at,
      "y":measR?.[i]?.atm_pressure
    }
  )
}

for(let i=0; i<measR.length; i++) {
  DataRelH.splice(i,0,
    {
      "x":measR?.[i]?.created_at,
      "y":measR?.[i]?.rel_humidity
    }
  )
}

for(let i=0; i<measR.length; i++) {
  DataWiSp.splice(i,0,
    {
      "x":measR?.[i]?.created_at,
      "y":measR?.[i]?.wind_speed
    })
}

for(let i=0; i<measR.length; i++) {
  DataSoMo.splice(i,0,
    {
      "x":measR?.[i]?.created_at,
      "y":measR?.[i]?.soil_moisture
    })
}
 
 Cargamos el array con los datos a la sintaxis de NIVO para 
const dataT = [
  {
    "id": "Estación 1",
    "color": "hsl(26, 70%, 50%)",
    "data": DataTempe
  }
]
const dataPA = [
  {
    "id":"Estación 1",
    "color": "hsl(26, 70%, 50%)",
    "data": DataAtmP
  },
]
const dataRH = [
  {
    "id":"Estación 1",
    "color": "hsl(26, 70%, 50%)",
    "data": DataRelH
  },
]
const dataWS = [
  {
    "id":"Estación 1",
    "color": "hsl(26, 70%, 50%)",
    "data": DataWiSp
  },
]
const dataSM = [
  {
    "id":"Estación 1",
    "color": "hsl(26, 70%, 50%)",
    "data": DataSoMo
  },
]
*/}


  return (
    <Fragment>
    <div style={{padding:"0 0 20px 0"}}>
      <Grid>
      <Grid.Col span={4}>
        {/*
        <NativeSelect
          data={["1", "2", "3", "4"]}
          label="ESTACIÓN"
          size="sm"
        />
        */}
      </Grid.Col>
      <Grid.Col span={4}>
        <DatePickerInput
          clearable
          defaultValue={new Date()}
          label="Fecha INICIO"
          placeholder="Seleccionar fecha"
          mx="auto"
          maw={400}
        />
      </Grid.Col>
      <Grid.Col span={4}>
      <DatePickerInput
          clearable
          defaultValue={new Date()}
          label="Fecha FIN"
          placeholder="Seleccionar fecha"
          mx="auto"
          maw={400}
        />
      </Grid.Col>
    </Grid>
    </div>

    <div style={{margin:"20px 0 0 0"}}>
      <SimpleGrid cols={2}>
        <div style={{borderStyle:"solid", borderColor:"#f07575", textAlign:"center"}}>
          <label>Temperatura</label>
          <div style={{height:"200px"}}>
          </div>
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
    </Fragment>
  )  
}
