import { Fragment } from "react"
import { useForm } from '@mantine/form';
import { TextInput, Box, Button, NativeSelect } from '@mantine/core';
export default function Consulta_Nodos() {

    const form = useForm({
        initialValues: { identificador: '', propietario: '', ubicacion: '', clave: ''},
        // functions will be used to validate values at corresponding key
        validate: {
            identificador: (value) => (value.length < 8 ? 'Nombre debe tener al menos 8 caracteres' : null),
            propietario: (value) => (value.length < 12 ? 'Propietario debe tener al menos 12 caracteres': null),
            ubicacion: (value) => (value.length < 4 ? null : 'Ingrese un número de 10 dígitos'),
            clave: (value) => (value.length < 20 ? 'La clave consta de 20 caracteres' : null)
        },
    });
    
    return (
        <Fragment>
            <div style={{margin:"0 0 20px 0", padding:"30px", textAlign:"center"}}>
                <label style={{fontWeight:"bold", fontSize:"1.2em"}}>Consulta de Nodo</label>
            </div>
            <Box maw={320} mx="auto">
                <form onSubmit={form.onSubmit(console.log)}>
                    <div style={{margin:"0 0 0 0", borderStyle:"solid", borderColor:"black", borderRadius:"20px", padding:"20px", marginBottom:"20px"}}>
                        <div style={{textAlign:"center", marginBottom:"10px"}}>
                        <label style={{fontWeight:"bold"}}>Seleccionar Nodo</label>
                        <NativeSelect
                        data={["1", "2", "3", "4"]}
                        size="sm"
                        />
                        </div>
                        <div style={{textAlign:"center"}}>
                        <label style={{fontWeight:"bold"}}>Información de Nodo</label>
                        </div>
                        <TextInput label="Identificador" {...form.getInputProps('identificador')} />
                        <TextInput
                        label="Propietario"
                        {...form.getInputProps('propietario')}
                        />
                        <TextInput label="Ubicación" {...form.getInputProps('ubicacion')} />
                        <TextInput label="Clave Catastral" {...form.getInputProps('clave')}/>
                        
                        </div>
                        <div style={{textAlign:"center"}}>
                        <Button type="submit" mt="lg" style={{margin:"0 5px 0 0"}}>
                            Modificar Nodo
                        </Button>
                        <Button type="submit" mt="lg" style={{margin:"0 0 0 5px"}}> 
                            Eliminar Nodo
                        </Button>
                        </div>
                    
                    
                </form>
            </Box>
        </Fragment>
    )
}