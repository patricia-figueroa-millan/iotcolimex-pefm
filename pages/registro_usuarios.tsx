import { Fragment } from "react"
import { useForm } from '@mantine/form';
import { TextInput, Button, Box, Select, PasswordInput } from '@mantine/core';
export default function Registro_Usuarios() {
    const form = useForm({
        initialValues: { nombre: '', tel:'', email: '', password: undefined, confirmPassword:'', rol:undefined },
        // functions will be used to validate values at corresponding key
        validate: {
            nombre: (value) => (value.length < 4 ? 'Nombre debe tener al menos 4 caracteres' : null),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Correo inválido'),
            tel: (value) => (/^\d{10}$/.test(value) ? null : 'Ingrese un número de 10 dígitos'),
            password: (value) => (value === undefined ? 'Contraseña requerida': null),
            confirmPassword: (value, values) =>
                value !== values.password ? 'Las contraseñas no coinciden' : null,
            rol: (value) => (value === undefined ? 'Rol requerido' : null)
        },
    });
    return (
        <Fragment>
        <div style={{margin:"0 0 20px 0",  textAlign:"center"}}>
            <label style={{fontWeight:"bold", fontSize:"1.2em"}}>Nuevo Usuario</label>
        </div>
        
        <Box maw={320} mx="auto">
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
                <div style={{borderStyle:"solid", padding:"20px", borderRadius:"20px"}}>
                <div style={{margin:"20px 0 0 0"}}>
                <div style={{textAlign:"center"}}>
                <label style={{fontWeight:"bold", textDecoration:"underline"}}>Información Básica</label>
                </div>
                <TextInput label="Nombre" {...form.getInputProps('nombre')} />
                </div>
                <div style={{margin:"20px 0 0 0"}}>
                <div style={{textAlign:"center"}}>
                <label style={{fontWeight:"bold", textDecoration:"underline"}}>Información de Contacto</label>
                </div>
                <TextInput
                label="Teléfono"
                {...form.getInputProps('tel')}
                />
                <TextInput label="Correo electrónico" {...form.getInputProps('email')} />
                </div>
                <div style={{margin:"20px 0 0 0"}}>
                <div style={{textAlign:"center"}}>
                <label style={{fontWeight:"bold", textDecoration:"underline"}}>Información de Acceso</label>
                </div>
                <PasswordInput label="Contraseña" {...form.getInputProps('password')}/>
                <PasswordInput label="Confirmar contraseña" {...form.getInputProps('confirmPassword')}/>
                <Select
                    label="Rol"
                    searchable
                    nothingFound="No options"
                    data={['Usuario', 'Administrador']}
                    {...form.getInputProps('rol')}
                />
                </div>
                </div>
                <div style={{textAlign:"center"}}>
                <Button type="submit" mt="lg">
                    Registrar Usuario
                </Button>
                </div>
            </form>
        </Box>
            
        </Fragment>
    )
}