import { NativeSelect, Grid, Table } from "@mantine/core";
import { DatePickerInput } from '@mantine/dates';
import { Fragment } from "react"

const elements = [
    { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
    { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
    { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
    { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
    { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
  ];
export default function Reportes_Tabular() {
    
    const rows = elements.map((element) => (
        <tr key={element.name}>
          <td>{element.position}</td>
          <td>{element.name}</td>
          <td>{element.symbol}</td>
          <td>{element.mass}</td>
        </tr>
      ));
    

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
                <Table>
                    <thead>
                        <tr>
                        <th style={{textAlign:"center"}}>Id</th>
                        <th style={{textAlign:"center"}}>Id_dispositivo</th>
                        <th style={{textAlign:"center"}}>Temperatura</th>
                        <th style={{textAlign:"center"}}>Presión</th>
                        <th style={{textAlign:"center"}}>Humedad_rel</th>
                        <th style={{textAlign:"center"}}>Vel_viento</th>
                        <th style={{textAlign:"center"}}>Humedad_Suelo</th>
                        </tr>
                    </thead>
                    <tbody></tbody>

                </Table>
            </div>
        </Fragment>
    )
}