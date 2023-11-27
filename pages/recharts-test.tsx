import { Title, SimpleGrid, Modal, Button } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks'
import { Fragment, useEffect, useState } from "react";
import { format, subDays } from 'date-fns'
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
import { DatePickerInput } from '@mantine/dates'
import React from "react";


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

  let measR: any[] = []
  let dataTemp: any[] = []
  let dataTemp2: any[] = []
  let dataAP: any[] = []
  let dataRH: any[] = []
  let dataWS: any[] = []
  let dataSM: any[] = []

  // Definimos la fecha actual
  const currentDate = new Date()
  // Calcula el día anterior al actual
  const defaultDate = subDays(currentDate, 1)
  
  // time1.toISOString() = 2023-11-22T00:00:00.000Z (fecha actual y hora inicial del día)
  const time1 = new Date(
    currentDate.getFullYear(), 
    currentDate.getMonth(), 
    currentDate.getDate(),
    -6,
    0,
    0
    )
    
  
    // time1.toISOString() = 2023-11-22T23:59:00.000Z (fecha actual y hora final del día)
  const time2 = new Date(
    currentDate.getFullYear(), 
    currentDate.getMonth(), 
    currentDate.getDate(),
    17,
    59,
    0
  )
  

  
  // FUNCIÓN para obtener día anterior con hora determinada
  function obtenerHoraParaDiaAnterior(hora: number | undefined, minutos: number | undefined, segundos: number | undefined) {
    const currentDate = new Date();
    
    // Restar un día a la fecha actual
    const ayer = new Date(currentDate);
    ayer.setDate(currentDate.getDate() - 1);
  
    // Crear una nueva fecha con la hora deseada para el día anterior
    const horaParaAyer = new Date(
      ayer.getFullYear(),
      ayer.getMonth(),
      ayer.getDate(),
      hora,
      minutos,
      segundos
    );
  
    return horaParaAyer;
  }
  
  // Uso de la función para obtener la hora deseada para el día anterior

  const timeDA1 = obtenerHoraParaDiaAnterior(2, 0, 0);
  const timeDA2 = obtenerHoraParaDiaAnterior(15, 0, 0);
  console.log("FECHA timeDA1: ",timeDA1.toISOString())
  console.log("FECHA timeDA2: ",timeDA2.toISOString())

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
    15,
    0,
    0
    )
    
//////////////////////////////////////////////////////////////////////////////
  function rangoHora(created_at:any) {
    const fecha = new Date(created_at)
    const hora = fecha.getHours()
    return (hora>= 8 && hora <9) || (hora>= 14 && hora <15) || (hora>= 20 && hora <21)
  }

  const nuevoArreglo = meas?.filter((fila:any) => rangoHora(fila.created_at))
  
  
  const fechas:any = nuevoArreglo?.map((item: { created_at: string | any[]; }) => item.created_at.slice(0,10))
  

  
  const horas = nuevoArreglo?.map((item: { created_at: string | any[]; }) => item.created_at.slice(11,16))
  
  
  {/*
  console.log("Valor de temperatura: ",temperatura)
  */}
  // Aquí deberías obtener los datos que vienen de Supabase
  // Revisa el formato en que vienen para que puedas acomodarlos
 
 


  const fechaActual = new Date()
  const dia = fechaActual.getDate()
  const mes = fechaActual.getMonth() + 1
  const año = fechaActual.getFullYear()
  // FECHA ACTUAL EN FORMATO
  const fechaFormateada = `${dia < 10 ? '0' : ''}${dia}/${mes < 10 ? '0' : ''}${mes}/${año}`
  // FECHA ANTERIOR CON FORMATO
  


  const [startDate, setStartDate] = useState<Date | null>(subDays(new Date(), 1))
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(subDays(new Date(), 1));

  interface DateSelectorProps {
    selectedDate: Date | null;
    onChange: (date: Date | null) => void;
    label: string;
}

  function DateSelector({ selectedDate, onChange, label }: DateSelectorProps) {
    


    return (
      <DatePickerInput
        value={selectedDate}
        onChange={(date) => {
          onChange(date);
          setSelectedDate(date)
        }}
        label={label}
        placeholder="Selecciona una fecha"
        valueFormat="DD MMM YYYY" // Formato de fecha deseado
        labelProps={{ style: { fontSize: '18px' } }} // Ajusta el tamaño de la fuente de la etiqueta
      />
    );
  }
  console.log("FECHA DEL SELECTOR: ",selectedDate)

  // CONSTRUCCIÓN DE TIEMPO CON ESTADOS
  const timeAS = selectedDate ? new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    selectedDate.getDate(),
    2,
    0,
    0
  ): new Date()
  console.log("FECHA timeAS: ",timeAS.toISOString())
  const timeBS = selectedDate ? new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    selectedDate.getDate(),
    15,
    0,
    0
  ): new Date()
  console.log("FECHA timeBS: ",timeBS.toISOString())

///////////////////////////////////////////////////////////////////////////////////

const formattedDate = selectedDate ? format(selectedDate, 'dd/MM/yyyy') : ''








  {/* Revisamos los horarios de inicio y fin, y los tres horarios (8,14 y 20)
  console.log("Fecha INICIO: ", time1.toISOString())
  console.log("Fecha FIN: ", time2.toISOString())
  console.log("Fecha a las 8 hrs: ", timeA.toISOString())
  console.log("Fecha a las 14 hrs: ", timeB.toISOString())
  console.log("Fecha a las 20 hrs: ", timeC.toISOString())
  */}
  const [opened, { open, close }] = useDisclosure(false)
 





  
  useEffect(() => {
    const fetchData = async () => {
      let response = await supabase
        .from("wx_meas")
        .select(
          "created_at, temperature, atm_pressure, rel_humidity, wind_speed, soil_moisture"
        )
        // Se realiza la consulta de los datos en el rango de fechas correpondientes a un día anterior (timeA y timeB)
        // Realizar consulta con base en VALOR de SELECTOR DE FECHA
        // Si se utilizarán timeAS y timeBS quitar el uso del método toISOString()
        .gte("created_at", timeAS.toISOString())
        .lte("created_at", timeBS.toISOString())
      // @ts-ignore
      
      console.log("Respuesta general de Supabase: ",response.data)
      
      if(response.data && response.data.length > 0){
      // @ts-ignore
      setMeas(response.data);
       
      console.log("RESPUESTA DE SUPABASE: ",response.data)
      
    } else {
      console.log("No hay datos disponibles para el rango de horas especificado")
      openModal()
    }
    };
    fetchData();
  }, [selectedDate]);


   // Función para abrir el modal
   const openModal = () => {
    open();
  };

  function calcularPromedio(datos: any[]) {
    if (datos.length === 0) return 0;
    const suma = datos.reduce((total: any, valor: any) => total + valor, 0);
    const promedio = suma / datos.length
    return parseFloat(promedio.toFixed(3));
  }













  // Filtrar las mediciones para obtener solo las que corresponden a los horarios específicos
  const medicionesFiltradas = meas?.filter((medicion: { created_at: string | number | Date; }) => {
  const horaMedicion = new Date(medicion.created_at).getHours();

  // Verificar si la hora de la medición está en uno de los tres rangos específicos
  return (
    (horaMedicion >= 8 && horaMedicion < 9) ||
    (horaMedicion >= 14 && horaMedicion < 15) ||
    (horaMedicion >= 20 && horaMedicion < 21)
  );
});
if (medicionesFiltradas && medicionesFiltradas.length > 0) {
  // Procesar las mediciones filtradas
  // ...
} else {
  console.log("No hay mediciones disponibles para los horarios especificados.");
}
// El arreglo "medicionesFiltradas" ahora contiene solo las mediciones correspondientes a los horarios específicos
{/* 
console.log("ARREGLO FILTRADO1: ",medicionesFiltradas);
*/}
if(medicionesFiltradas && medicionesFiltradas.length > 0){
const medicionesOrdenadas = medicionesFiltradas.sort((a: { created_at: string | number | Date; }, b: { created_at: string | number | Date; }) => {
  const horaA = new Date(a.created_at).getHours();
  const horaB = new Date(b.created_at).getHours();

  // Ordenar en orden descendente según los horarios específicos
  if (horaA > horaB) return -1;
  if (horaA < horaB) return 1;

  return 0;
})

// El arreglo "medicionesOrdenadas" ahora está ordenado según los horarios específicos en orden descendente
{/* 
console.log("ARREGLO ORDENADO: ",medicionesOrdenadas);
*/}
const medicionesRevertidas = medicionesOrdenadas.reverse()
{/* 
console.log("ARREGLO ORDENADO INVERTIDO : ",medicionesRevertidas)
*/}
const medicionesHorario1 = medicionesRevertidas.filter((medicion: { created_at: string | number | Date; }) => {
  const hora = new Date(medicion.created_at).getHours();
  return hora >= 8 && hora < 9;
});

const medicionesHorario2 = medicionesRevertidas.filter((medicion: { created_at: string | number | Date; }) => {
  const hora = new Date(medicion.created_at).getHours();
  return hora >= 14 && hora < 15;
});

const medicionesHorario3 = medicionesRevertidas.filter((medicion: { created_at: string | number | Date; }) => {
  const hora = new Date(medicion.created_at).getHours();
  return hora >= 20 && hora < 21;
});

const promedioHorario1 = {
  temperatura: calcularPromedio(medicionesHorario1.map((medicion: { temperature: number; }) => medicion.temperature)),
  presionAtmosferica: calcularPromedio(medicionesHorario1.map((medicion: { atm_pressure: number; }) => medicion.atm_pressure)),
  humedadRelativa: calcularPromedio(medicionesHorario1.map((medicion: { rel_humidity: number; }) => medicion.rel_humidity)),
  velocidadViento: calcularPromedio(medicionesHorario1.map((medicion: { wind_speed: number; }) => medicion.wind_speed)),
  humedadSuelo: calcularPromedio(medicionesHorario1.map((medicion: { soil_moisture: number; }) => medicion.soil_moisture)),
}


const promedioHorario2 = {
  temperatura: calcularPromedio(medicionesHorario2.map((medicion: { temperature: number; }) => medicion.temperature)),
  presionAtmosferica: calcularPromedio(medicionesHorario2.map((medicion: { atm_pressure: number; }) => medicion.atm_pressure)),
  humedadRelativa: calcularPromedio(medicionesHorario2.map((medicion: { rel_humidity: number; }) => medicion.rel_humidity)),
  velocidadViento: calcularPromedio(medicionesHorario2.map((medicion: { wind_speed: number; }) => medicion.wind_speed)),
  humedadSuelo: calcularPromedio(medicionesHorario2.map((medicion: { soil_moisture: number; }) => medicion.soil_moisture)),
}


const promedioHorario3 = {
  temperatura: calcularPromedio(medicionesHorario3.map((medicion: { temperature: number; }) => medicion.temperature)),
  presionAtmosferica: calcularPromedio(medicionesHorario3.map((medicion: { atm_pressure: number; }) => medicion.atm_pressure)),
  humedadRelativa: calcularPromedio(medicionesHorario3.map((medicion: { rel_humidity: number; }) => medicion.rel_humidity)),
  velocidadViento: calcularPromedio(medicionesHorario3.map((medicion: { wind_speed: number; }) => medicion.wind_speed)),
  humedadSuelo: calcularPromedio(medicionesHorario3.map((medicion: { soil_moisture: number; }) => medicion.soil_moisture)),
}


const arregloFinal = [
  {
    horario: '8am-9am',
    temperatura: promedioHorario1.temperatura,
    presionAtmosferica: promedioHorario1.presionAtmosferica,
    humedadRelativa: promedioHorario1.humedadRelativa,
    velocidadViento:promedioHorario1.velocidadViento,
    humedadSuelo: promedioHorario1.humedadSuelo
  },
  {
    horario: '2pm-3pm',
    temperatura: promedioHorario2.temperatura,
    presionAtmosferica: promedioHorario2.presionAtmosferica,
    humedadRelativa: promedioHorario2.humedadRelativa,
    velocidadViento:promedioHorario2.velocidadViento,
    humedadSuelo: promedioHorario2.humedadSuelo
  },
  {
    horario: '8pm-9pm',
    temperatura: promedioHorario3.temperatura,
    presionAtmosferica: promedioHorario3.presionAtmosferica,
    humedadRelativa: promedioHorario3.humedadRelativa,
    velocidadViento:promedioHorario3.velocidadViento,
    humedadSuelo: promedioHorario3.humedadSuelo
  }
]
arregloFinal.forEach((horario) => {
  // Crear un nuevo objeto con las propiedades date y T
  const nuevoObjetoT = {
    date: horario.horario,
    T: horario.temperatura,
  };
  // Agregar el nuevo objeto al arreglo dataTemp
  dataTemp.push(nuevoObjetoT);
});

arregloFinal.forEach((horario) => {
  // Crear un nuevo objeto con las propiedades date y AP
  const nuevoObjetoAP = {
    date: horario.horario,
    PA: horario.presionAtmosferica,
  };
  // Agregar el nuevo objeto al arreglo dataTemp
  dataAP.push(nuevoObjetoAP);
});

arregloFinal.forEach((horario) => {
  // Crear un nuevo objeto con las propiedades date y RH
  const nuevoObjetoRH = {
    date: horario.horario,
    HR: horario.humedadRelativa,
  };
  // Agregar el nuevo objeto al arreglo dataTemp
  dataRH.push(nuevoObjetoRH);
});

arregloFinal.forEach((horario) => {
  // Crear un nuevo objeto con las propiedades date y WS
  const nuevoObjetoWS = {
    date: horario.horario,
    WS: horario.velocidadViento,
  };
  // Agregar el nuevo objeto al arreglo dataTemp
  dataWS.push(nuevoObjetoWS);
});

arregloFinal.forEach((horario) => {
  // Crear un nuevo objeto con las propiedades date y SM
  const nuevoObjetoSM = {
    date: horario.horario,
    HS: horario.humedadRelativa,
  };
  // Agregar el nuevo objeto al arreglo dataTemp
  dataSM.push(nuevoObjetoSM);
});

// Ahora, dataTemp contiene objetos con las propiedades date y T
console.log("Objeto de temperatura: ",dataTemp)
console.log("Objeto de presion: ",dataAP)
console.log("Objeto de humedad relativa: ",dataRH)
console.log("Objeto de velocidad del viento: ",dataWS)
console.log("Objeto de humedad del suelo: ",dataSM)
}
else {
  console.log("No hay mediciones disponibles para los horarios especificados.")
}

{/* 
  console.log(">>>> Resultado GENERAL: ", meas)
  console.log(">>>> Resultado ESPECÍFICO: ", meas?.[0])
  let temperatura:number = Number(meas?.[0]?.temperature)
*/}



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
      <Title order={1}>Seleccionar día para mostrar variables microclimáticas</Title>

      <div id="parent" style={{display:"flex"}}>
            <div id="wide" style={{flex:"1"}}>
            <DateSelector
                selectedDate={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                label="Fecha"
            />
            </div>
            
        </div>

      <div style={{margin:"10px 0 0 0"}}>
      
      <SimpleGrid cols={2}>
        
        
        
        <div style={{borderStyle:"solid", borderColor:"#f07575", textAlign:"center"}}>
          <label> Comportamiento de la Temperatura del día {formattedDate.toString()}</label>
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
          <label>Comportamiento de la Presión Atmosférica del día {formattedDate.toString()}</label>
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
          <label>Comportamiento de la Humedad Relativa del día {formattedDate.toString()}</label>
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
          <label>Comportamiento de la Velocidad del Viento del día {formattedDate.toString()}</label>
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
          
          <Bar dataKey="WS" fill="#e6e6e6" />
        </BarChart>
      </ResponsiveContainer>
        </div>

        <div style={{borderStyle:"solid", borderColor:"#806040", textAlign:"center"}}>
          <label>Comportamiento de la Humedad del Suelo del día {formattedDate.toString()}</label>
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
      <Modal opened={opened} onClose={close} withCloseButton={false}>
        <p>No hay datos disponibles para la fecha seleccionada. <br></br>
          Por favor, seleccione una fecha con datos.</p>
      </Modal>
    </div>
    </Fragment>
    )}
    </Fragment>
  );
}
