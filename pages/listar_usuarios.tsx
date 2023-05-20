import { Fragment } from "react"
import { Table } from '@mantine/core';
export default function Listar_Usuarios() {
    return (
        <Fragment>
            <div style={{borderStyle:"solid", textAlign:"center"}}>
                <label style={{fontWeight:"bold"}}> Usuarios </label>
            </div>
            <div style={{borderStyle:"solid", margin:"20px 0 0 0", textAlign:"center"}}>
            <Table>
                    <thead>
                        <tr>
                        <th style={{textAlign:"center"}}>Id</th>
                        <th style={{textAlign:"center"}}>Nombre</th>
                        <th style={{textAlign:"center"}}>Teléfono</th>
                        <th style={{textAlign:"center"}}>Correo</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </Table>
            </div>
        </Fragment>
    )
}