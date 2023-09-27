import {useSupabaseClient} from "@supabase/auth-helpers-react";
import { Fragment, useEffect, useState } from "react";
// @ts-ignore
import { Database } from "../utils/database.types";
import { Title, Table } from "@mantine/core";
import { DatePickerInput } from '@mantine/dates'
import { format, startOfDay, endOfDay } from 'date-fns'
export default function Reports() {

    const supabase = useSupabaseClient<Database>();
    type DataType = {
        created_at: Date;
        temperature: number;
        atm_pressure: number;
        rel_humidity: number;
        wind_speed: number;
        soil_moisture: number;
      };
    const [tableData, setTableData] = useState<DataType | undefined | any>([]);

    interface DateSelectorProps {
        selectedDate: Date | null;
        onChange: (date: Date | null) => void;
        label: string;
    }
    
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
    const [endDate, setEndDate] = useState<Date | null>(null);

    useEffect(() => {
    async function fetchData() {
        const formattedStartDate = formatStartDate(startDate)
        const formattedEndDate = formatStartDate(endDate)
        const {data, error} = await supabase
        .from("wx_meas")
        .select(
          "id, created_at, temperature, atm_pressure, rel_humidity, wind_speed, soil_moisture"
        )
        .gte("created_at", formattedStartDate)
        .lte("created_at", formattedEndDate)
        if (error) {
            console.error('Error al obtener datos de Supabase:', error);
            return [];
        }
        // @ts-ignore
        setTableData(data);
    }

    
        fetchData()
    }, [startDate, endDate])
    
    return(
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
                        <th>Fecha y Hora</th>
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
                    <td>{item.created_at}</td>
                    <td>{item.temperature}</td>
                    <td>{item.atm_pressure}</td>
                    <td>{item.rel_humidity}</td>
                    <td>{item.wind_speed}</td>
                    <td>{item.soil_moisture}</td>
                    </tr>
                ))}
                </tbody>
            </Table>

      {/* 
      <ul>
        {tableData.map((item:any) => (
          <li>{item.created_at}</li>
        ))}
      </ul>
      */}
        </div>
    </Fragment>
    
    )
}