import {useSession, useSupabaseClient} from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Fragment, useEffect, useState, useRef } from "react";
// @ts-ignore
import { Database } from "../utils/database.types";
import { Title, Table, Button } from "@mantine/core";
import { DatePickerInput } from '@mantine/dates'
import { format} from 'date-fns'
// import { CSVLink, CSVDownload } from "react-csv";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
{/* import { autoTable, RowInput } from 'jspdf-autotable'; */}
export default function Reports() {
    const session = useSession()
    const supabase = useSupabaseClient<Database>();
    type DataType = {
        id: number;
        fecha: Date;
        hora: String;
        created_at: Date;
        temperature: number;
        atm_pressure: number;
        rel_humidity: number;
        wind_speed: number;
        soil_moisture: number;
      };
    const [tableData, setTableData] = useState<DataType | undefined | any>([])

    interface DateSelectorProps {
        selectedDate: Date | null;
        onChange: (date: Date | null) => void;
        label: string;
    }
    
    type CSVRow = {
      Id: number;
      Fecha: string;
      Hora: string;
      Temperatura: number;
      "Presión Atmosférica": number;
      "Humedad Relativa": number;
      "Velocidad Viento": number;
      "Humedad Suelo": number;
    };

    function DateSelector({ selectedDate, onChange, label }: DateSelectorProps) {
        return (
          <DatePickerInput
            value={selectedDate}
            onChange={onChange}
            label={label}
            placeholder="Selecciona una fecha"
            valueFormat="DD MMM YYYY" // Formato de fecha deseado
          />
        );
      }

    const formatStartDate = (date: Date | null): string | null => {
        if (date) {
          return format(date, "yyyy-MM-dd'T'00:00:00");
        }
        return null;
    };

    const formatEndDate = (date: Date | null): string | null => {
        if (date) {
          return format(date, "yyyy-MM-dd'T'23:59:59");
        }
        return null;
    };

    const [startDate, setStartDate] = useState <Date | null>(null)
    const [endDate, setEndDate] = useState<Date | null>(null)
    const [tableLoaded, setTableLoaded] = useState(false)


    useEffect(() => {
    async function fetchData() {
        const formattedStartDate = formatStartDate(startDate)
        const formattedEndDate = formatEndDate(endDate)
        const {data, error} = await supabase
        .from("wx_meas")
        .select(
          "id, created_at, temperature, atm_pressure, rel_humidity, wind_speed, soil_moisture"
        )
        
        .gte("created_at", formattedStartDate)
        .lte("created_at", formattedEndDate)

        if (data) {
            const formattedData = data.map((item) => {
              const createdAt = new Date(item.created_at);
              const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
              const fecha = createdAt.toLocaleDateString('es', options); // Obtiene la fecha en formato de cadena
              const hora = createdAt.toLocaleTimeString(); // Obtiene la hora en formato de cadena
      
              return {
                ...item,
                fecha,
                hora,
              };
            });
            // @ts-ignore
        setTableData(formattedData);
        setTableLoaded(true)
        }
        if (error) {
            console.error('Error al obtener datos de Supabase:', error);
            return [];
        }
    }
        fetchData()
    }, [startDate, endDate])





    const [csvData, setCSVData] = useState(null)
    {/* FUNCIÓN PARA EXPORTAR A CSV */}
    const handleExportCSV = () => {
        if (tableData.length > 0) {
            console.log("SI HAY DATOS EN LA TABLA")
            const formattedCSVData = tableData.map((item:DataType) => ({
            Id: item.id,
            Fecha: `"${item.fecha}"`,
            Hora: item.hora,
            Temperatura: item.temperature,
            "Presión Atmosférica": item.atm_pressure,
            "Humedad Relativa": item.rel_humidity,
            "Velocidad Viento": item.wind_speed,
            "Humedad Suelo": item.soil_moisture,
          }));
          
          const csvHeaders = Object.keys(formattedCSVData [0]);
          const csvFileName = "data.csv";
          setCSVData(formattedCSVData)
          // Descargar el archivo CSV
          const csvBlob = new Blob([csvHeaders.join(",") + "\n" + formattedCSVData.map((row: { [x: string]: any; }) => csvHeaders.map(header => row[header]).join(",")).join("\n")], { type: 'text/csv' });
          const csvUrl = URL.createObjectURL(csvBlob);
          const a = document.createElement("a");
          a.href = csvUrl;
          a.download = csvFileName;
          a.click();
        }
        console.log("NO HAY DATOS EN LA TABLA y agregar return null")
      };

      
      
      {/* FUNCIÓN PARA EXPORTAR A PDF */}
      const handleSavePDF = () => {
      if (tableData.length > 0) {
        console.log("Generando PDF")
        
        const doc = new jsPDF({
          orientation:'landscape'
        })
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const imageWidth = 45; // Ancho de la imagen en milímetros
        const imageHeight = 15; // Alto de la imagen en milímetros
        const imageX = pageWidth - imageWidth - 8; // Posición X de la imagen (derecha)
        const imageY = 3; // Posición Y de la imagen (arriba)
        doc.setFontSize(16)
        doc.text('Sistema IoT para Monitorización de Condiciones Climáticas en Cultivos de Limón Mexicano', 10, 10);
        doc.setFontSize(13)
        doc.text('Reporte histórico por periodo', 10, 17,);
        const imageUrl = './coeplim.png'
        doc.addImage(imageUrl, 'PNG',  imageX, imageY, imageWidth, imageHeight)
      // Define las columnas y filas de la tabla
      const columns = ["Id", "Fecha", "Hora", "Temperatura", "Presión Atmosférica", "Humedad Relativa", "Velocidad Viento", "Humedad Suelo"];
      type DataRow = [number, string, string, number, number, number, number, number];
      const data: DataRow[] = tableData.map((item:DataType) => [
          item.id,
          item.fecha.toString(),
          item.hora.toString(),
          item.temperature,
          item.atm_pressure,
          item.rel_humidity,
          item.wind_speed,
          item.soil_moisture,
        ]);
      
      // Agrega la tabla al documento PDF
      (doc as jsPDF & { autoTable: any }).autoTable({
          head: [columns],
          body: data,
          startY: 20, // Posición vertical de inicio de la tabla
          margin: { left: 10, right: 10 }, // Márgenes izquierdo y derecho
    });
      // Guarda el PDF con un nombre específico
      doc.save('tabla.pdf');

  }
  
  };

    return(
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
        <Title order={1} style={{marginBottom:"20px",textAlign:"center"}}>Datos de la Tabla</Title>
          
        <div id="parent" style={{display:"flex"}}>
            <div id="wide" style={{flex:"1"}}>
            <DateSelector
                selectedDate={startDate}
                onChange={(date) => setStartDate(date)}
                label="Fecha de Inicio"
            />
            </div>
            <div id="narrow" style={{width:"50%"}}>
            <DateSelector
                selectedDate={endDate}
                onChange={(date) => setEndDate(date)}
                label="Fecha de Fin"
            />
            </div>
        </div>
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Temperatura</th>
                        <th>Presión Atmosférica</th>
                        <th>Humedad Relativa</th>
                        <th>Velocidad Viento</th>
                        <th>Humedad Suelo</th>
                    </tr>
                </thead>
                <tbody>
                {tableData.map((item:any) => (
                    <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.fecha}</td>
                    <td>{item.hora}</td>
                    <td>{item.temperature}</td>
                    <td>{item.atm_pressure}</td>
                    <td>{item.rel_humidity}</td>
                    <td>{item.wind_speed}</td>
                    <td>{item.soil_moisture}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
        <div style={{float:"right"}}>
        {/* 
        <Button style={{ color: "white", backgroundColor: "green" }} onClick={handleExportCSV}>
          Descargar CSV
        </Button>

        <Button style={{ color: "white", backgroundColor: "red" }} onClick={handleSavePDF}>
          Descargar PDF
        </Button>
        */}
        <Button
    style={{ color: "white", backgroundColor: "green" }}
    onClick={handleExportCSV}
    disabled={!tableLoaded} // Deshabilita el botón si la tabla no se ha cargado
  >
    Descargar CSV
  </Button>

  <Button
    style={{ color: "white", backgroundColor: "red" }}
    onClick={handleSavePDF}
    disabled={!tableLoaded} // Deshabilita el botón si la tabla no se ha cargado
  >
    Descargar PDF
  </Button>
          </div>
  </Fragment>
          )}
    </Fragment>
    
    )
}