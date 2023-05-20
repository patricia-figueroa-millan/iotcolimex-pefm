import { NativeSelect, Grid, SimpleGrid } from "@mantine/core";
import { DatePickerInput } from '@mantine/dates';
import { Fragment } from "react";
import { ResponsiveLine } from '@nivo/line'
export default function Reportes_Graficos() { 
  return (
    <Fragment>
    <div style={{padding:"0 0 20px 0"}}>
      <Grid>
      <Grid.Col span={4}>
        <NativeSelect
          data={["1", "2", "3", "4"]}
          label="ESTACIÓN"
          size="sm"
        />
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
        <div style={{borderStyle:"solid", borderColor:"blue"}}>
          <label>Temperatura</label>
        </div>
        <div style={{borderStyle:"solid", borderColor:"green"}}>
          <label>Presión Atmosférica</label>
        </div>
        <div style={{borderStyle:"solid", borderColor:"red"}}>
          <label>Humedad Relativa</label>
        </div>
        <div style={{borderStyle:"solid", borderColor:"orange"}}>
          <label>Velocidad del viento</label>
        </div>
        <div style={{borderStyle:"solid", borderColor:"brown"}}>
          <label>Humedad del suelo</label>
        </div>
      </SimpleGrid>
    </div>
    </Fragment>
  )  
}
