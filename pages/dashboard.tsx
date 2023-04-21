import { Title } from "@mantine/core"
import { NativeSelect } from '@mantine/core';
import { TextInput } from '@mantine/core';
import { Button } from '@mantine/core';
import { Table } from '@mantine/core';
const elements = [
    { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
    { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
    { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
    { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
    { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
  ];
function Dashboard(){
    const rows = elements.map((element) => (
        <tr key={element.name}>
          <td>{element.position}</td>
          <td>{element.name}</td>
          <td>{element.symbol}</td>
          <td>{element.mass}</td>
        </tr>
      ));
    return (

    <><>
    <Title order={1}>Título de Dashboard</Title>
    <NativeSelect
            data={['Estación 1', 'Estación 2', 'Estación 3', 'Estación N']}
            label="Seleccionar Nodo"
            description="Estaciones disponibles"
            radius="md"
            withAsterisk />
            <TextInput
                placeholder="Nombre"
                label="Nombre Completo"
                withAsterisk /></><Button>
                Guardar cambio
            </Button>
            <Table>
      <thead>
        <tr>
          <th>Element position</th>
          <th>Element name</th>
          <th>Symbol</th>
          <th>Atomic mass</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
            </>
            
    )
}
 export default Dashboard