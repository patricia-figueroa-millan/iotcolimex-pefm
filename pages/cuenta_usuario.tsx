import { Fragment } from "react"
import { useForm } from '@mantine/form';
import { TextInput, Button, Box, Image } from '@mantine/core';

export default function Cuenta_Usuario(){

    const form = useForm({
        initialValues: { nombre: '', tel:'', email: ''},
        // functions will be used to validate values at corresponding key
        validate: {
            nombre: (value) => (value.length < 4 ? 'Nombre debe tener al menos 8 caracteres' : null),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Correo inválido'),
            tel: (value) => (/^\d{10}$/.test(value) ? null : 'Ingrese un número de 10 dígitos')
        },
    });

    return (
        <Fragment>
            <div style={{margin:"0 0 20px 0"}}>
                <Image
                    maw={100}  
                    fit="contain" 
                    mx="auto" 
                    radius="md" 
                    src="./profile-user.png"
                />
            </div>
            <Box maw={400} mx="auto">
            <form>

            <div style={{borderStyle:"solid", padding:"20px", borderRadius:"10px", margin:"0 0 20px 0"}}>
            <label style={{fontWeight:"bold"}}>Información Básica</label>
            <br></br>
            <label>Foto</label>
            <TextInput label="Nombre" {...form.getInputProps('nombre')} />
            </div>

            <div style={{borderStyle:"solid", padding:"20px", borderRadius:"10px"}}>
            <label style={{fontWeight:"bold"}}>Información de Contacto</label>
            <TextInput
                label="Teléfono"
                {...form.getInputProps('tel')}
                />
            <TextInput label="Correo electrónico" {...form.getInputProps('email')} />
            </div>
            <div style={{textAlign:"center"}}>
                <Button type="submit" mt="lg">
                    Guardar
                </Button>
                </div>
            </form>
            </Box>
        </Fragment>
    )
}