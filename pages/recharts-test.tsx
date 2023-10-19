import { Title, Grid, SimpleGrid } from "@mantine/core";
import { Fragment, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
  ResponsiveContainer,
} from "recharts";
import { useSession,useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
// @ts-ignore
import { Database } from "../utils/database.types";



export default function ReachartsTest() {
  const session = useSession()
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

  // Definimos la fecha actual
  const currentDate = new Date()
  const time1 = new Date(
    currentDate.getFullYear(), 
    currentDate.getMonth(), 
    currentDate.getDate(),
    -6,
    0,
    0
    )
  const time2 = new Date(
    currentDate.getFullYear(), 
    currentDate.getMonth(), 
    currentDate.getDate(),
    17,
    59,
    0
  )
  const timeA = new Date(
    currentDate.getFullYear(), 
    currentDate.getMonth(), 
    currentDate.getDate(),
    2,
    0,
    0
    )
  const timeB = new Date(
    currentDate.getFullYear(), 
    currentDate.getMonth(), 
    currentDate.getDate(),
    8,
    0,
    0
  )
  const timeC = new Date(
    currentDate.getFullYear(), 
    currentDate.getMonth(), 
    currentDate.getDate(),
    14,
    0,
    0
  )
  {/* Revisamos los horarios de inicio y fin, y los tres horarios (8,14 y 20)
  console.log("Fecha INICIO: ", time1.toISOString())
  console.log("Fecha FIN: ", time2.toISOString())
  console.log("Fecha a las 8 hrs: ", timeA.toISOString())
  console.log("Fecha a las 14 hrs: ", timeB.toISOString())
  console.log("Fecha a las 20 hrs: ", timeC.toISOString())
  */}
  useEffect(() => {
    const fetchData = async () => {
      let response = await supabase
        .from("wx_meas")
        .select(
          "created_at, temperature, atm_pressure, rel_humidity, wind_speed, soil_moisture"
        )
        .gte("created_at", time1.toISOString())
        .lte("created_at", time2.toISOString())
      // @ts-ignore
      {/* 
      console.log("Respuesta general de Supabase: ",response.data)
      */}
      // @ts-ignore
      setMeas(response.data);
    };
    fetchData();
  }, []);
{/* 
  console.log(">>>> Resultado GENERAL: ", meas)
  console.log(">>>> Resultado ESPECÍFICO: ", meas?.[0])
  let temperatura:number = Number(meas?.[0]?.temperature)
*/}
  function rangoHora(created_at:any) {
    const fecha = new Date(created_at)
    const hora = fecha.getHours()
    return (hora>= 8 && hora <9) || (hora>= 14 && hora <15) || (hora>= 20 && hora <21)
  }

  const nuevoArreglo = meas?.filter((fila:any) => rangoHora(fila.created_at))
  {/* 
  console.log("ARREGLO FILTRADO: ",nuevoArreglo) 
  */}
  const fechas:any = nuevoArreglo?.map((item: { created_at: string | any[]; }) => item.created_at.slice(0,10))
  {/*
  console.log("ARREGLO DE FECHAS: ", fechas)
  */}
  
  const horas = nuevoArreglo?.map((item: { created_at: string | any[]; }) => item.created_at.slice(11,16))
  console.log("ARREGLO DE HORAS: ", horas)
  
  {/*
  console.log("Valor de temperatura: ",temperatura)
  */}
  // Aquí deberías obtener los datos que vienen de Supabase
  // Revisa el formato en que vienen para que puedas acomodarlos
  let measR: any[] = []
  let dataTemp: any[] = []
  let dataAP: any[] = []
  let dataRH: any[] = []
  let dataWS: any[] = []
  let dataSM: any[] = []
  {/* 
  console.log("Variable de Supabase: ", meas)
  */}
  {/* Obtenemos el arreglo invertido de las mediciones de SUPABASE 
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
  */}
  {/* INFORMACIÓN PARA GRAFICAR TEMPERATURA*/}
  for (let i=0; i<nuevoArreglo?.length; i++){
    console.log("Valor del contador: ",i)
    const nuevoObjetoT = 
    {
      date:horas?.[i],
      T:nuevoArreglo?.[i]?.temperature
    }
    dataTemp.push(nuevoObjetoT)
    console.log("Valor del arreglo: ",dataTemp[i])
    console.log("Valor de la hora: ",horas?.[i])
    console.log("Valor de la medición: ",nuevoArreglo?.[i]?.temperature)
  }
  {/* INFORMACIÓN PARA GRAFICAR PRESIÓN ATMOSFÉRICA*/}
  for (let i=0; i<nuevoArreglo?.length; i++){
    const nuevoObjetoAP =
      {
        date:horas?.[i],
        PA:nuevoArreglo?.[i]?.atm_pressure
      }
    dataAP.push(nuevoObjetoAP) 
  }
  {/* INFORMACIÓN PARA GRAFICAR HUMEDAD RELATIVA*/}
  for (let i=0; i<nuevoArreglo?.length; i++){
    const nuevoObjetoRH =
      {
        date:horas?.[i],
        HR:nuevoArreglo?.[i]?.rel_humidity
      }
    dataRH.push(nuevoObjetoRH)
  }
  {/* INFORMACIÓN PARA GRAFICAR VELOCIDAD DEL VIENTO*/}
  for (let i=0; i<nuevoArreglo?.length; i++){
    const nuevoObjetoWS =
      {
        date:horas?.[i],
        VV:nuevoArreglo?.[i]?.wind_speed
      }
    dataWS.push(nuevoObjetoWS)    
  }
  {/* INFORMACIÓN PARA GRAFICAR HUMEDAD DEL SUELO*/}
  for (let i=0; i<nuevoArreglo?.length; i++){
    const nuevoObjetoSM =
      {
        date:horas?.[i],
        HS:nuevoArreglo?.[i]?.soil_moisture
      }
    dataSM.push(nuevoObjetoSM) 
  }

  const fechaActual = new Date()
  const dia = fechaActual.getDate()
  const mes = fechaActual.getMonth() + 1
  const año = fechaActual.getFullYear()

  const fechaFormateada = `${dia < 10 ? '0' : ''}${dia}/${mes < 10 ? '0' : ''}${mes}/${año}`

  console.log("FECHA ACTUAL:", fechaFormateada)


















  return (
    <Fragment>
      {!session ? (
        <div
        style={{
          margin: "100px auto auto auto",
          padding: "10px 5px 0 5px",
          width: "50%",
          border: "3px solid black",
        }}
      >
        <center>
          <label style={{ color: "GrayText" }}>INICIO DE SESIÓN</label>
        </center>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={[]}
          theme="dark"
        />{" "}
      </div>
      ):(
      <Fragment>
      <Title order={1}>Mediciones</Title>

      
      <div style={{margin:"10px 0 0 0"}}>
      <SimpleGrid cols={2}>

        <div style={{borderStyle:"solid", borderColor:"#f07575", textAlign:"center"}}>
          <label> Comportamiento de la Temperatura del día {fechaFormateada.toString()}</label>
        <ResponsiveContainer width="100%" height="90%">
        <BarChart
          width={800}
          height={400}
          data={dataTemp}
          barSize={100}
          margin={{
            top: 15,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" style={{fontSize:"10px"}} angle={0}>
            <Label value="Horas" position="insideBottom" angle={0} offset={-2} />
          </XAxis>
          <YAxis>
            <Label value="Temperatura en °C" position="insideBottomLeft" angle={-90} offset={10} />
          </YAxis>
          <Tooltip />
          
          <Bar dataKey="T" fill="#f07575" />
        </BarChart>
      </ResponsiveContainer>
          
        </div>

        <div style={{borderStyle:"solid", borderColor:"#99ebff", textAlign:"center"}}>
          <label>Comportamiento de la Presión Atmosférica del día {fechaFormateada.toString()}</label>
        <ResponsiveContainer width="100%" height="90%">
        <BarChart
          width={600}
          height={300}
          data={dataAP}
          barSize={100}
          margin={{
            top: 15,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" style={{fontSize:"10px"}} angle={0}>
            <Label value="Horas" position="insideBottom" angle={0} offset={-2} />
          </XAxis>
          <YAxis>
            <Label value="Presión en mbar" position="insideBottomLeft" angle={-90} offset={10} />
          </YAxis>
          <Tooltip />
          
          <Bar dataKey="PA" fill="#99ebff" />
        </BarChart>
      </ResponsiveContainer>
        </div>

        <div style={{borderStyle:"solid", borderColor:"#66a3ff", textAlign:"center"}}>
          <label>Comportamiento de la Humedad Relativa del día {fechaFormateada.toString()}</label>
          <ResponsiveContainer width="100%" height="90%">
        <BarChart
          width={600}
          height={300}
          data={dataRH}
          barSize={100}
          margin={{
            top: 15,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" style={{fontSize:"10px"}} angle={0}>
            <Label value="Horas" position="insideBottom" angle={0} offset={-2} />
          </XAxis>
          <YAxis>
            <Label value="Humedad en %" position="insideBottomLeft" angle={-90} offset={10} />
          </YAxis>
          <Tooltip />
          
          <Bar dataKey="HR" fill="#66a3ff" />
        </BarChart>
      </ResponsiveContainer>
        </div>

        <div style={{borderStyle:"solid", borderColor:"#e6e6e6", textAlign:"center"}}>
          <label>Comportamiento de la Velocidad del Viento del día {fechaFormateada.toString()}</label>
          <ResponsiveContainer width="100%" height="90%">
        <BarChart
          width={600}
          height={300}
          data={dataWS}
          barSize={100}
          margin={{
            top: 15,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" style={{fontSize:"10px"}} angle={0}>
            <Label value="Horas" position="insideBottom" angle={0} offset={-2} />
          </XAxis>
          <YAxis>
            <Label value="Velocidad en m/s" position="insideBottomLeft" angle={-90} offset={5} />
          </YAxis>
          <Tooltip />
          
          <Bar dataKey="VV" fill="#e6e6e6" />
        </BarChart>
      </ResponsiveContainer>
        </div>

        <div style={{borderStyle:"solid", borderColor:"#806040", textAlign:"center"}}>
          <label>Comportamiento de la Humedad del Suelo del día {fechaFormateada.toString()}</label>
          <ResponsiveContainer width="100%" height="90%">
        <BarChart
          width={600}
          height={300}
          data={dataSM}
          barSize={100}
          margin={{
            top: 15,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" style={{fontSize:"10px"}} angle={0}>
            <Label value="Horas" position="insideBottom" angle={0} offset={-2} />
          </XAxis>
          <YAxis>
            <Label value="Humedad en %" position="insideBottomLeft" angle={-90} offset={10} />
          </YAxis>
          <Tooltip />
          
          {/* 
          <Line
            type="monotone"
            dataKey="AP"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          */}
          <Bar dataKey="HS" fill="#806040" />
          {/* 
          <Line type="monotone" dataKey="RH" stroke="#82ca9d" />
          <Line type="monotone" dataKey="T" stroke="#ff0000" />
          */}
        </BarChart>
      </ResponsiveContainer>
        </div>

      </SimpleGrid>
    </div>
    </Fragment>
    )}
    </Fragment>
  );
}
