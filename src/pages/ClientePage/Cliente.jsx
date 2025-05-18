import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Button, Grid } from '@mui/material';
import TableCliente from '../../Components/TableCliente/TableCliente'
import { Link, Navigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

const Cliente = () => {
    const [Clientes, setClientes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllClientes = async () => {
            try {
                const res = await axios.get('http://localhost:3000/infocliente');
                setClientes(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllClientes();
    }, []);

    return (
        <>
            <Container
                sx={{
                    mt: 5,
                    justifyContent: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: 2,
                }}
            >
                <Typography variant="h4" gutterBottom sx={{ color: 'white' }}>
                    CLIENTES
                </Typography>

                <Box display="flex" justifyContent="flex-start" mb={2} width="85%" alignItems="center">
                    <Typography variant='h6' sx={{ color: 'white', padding: '20px' }}>Agregar un Cliente: </Typography>
                    <Button
                        component={Link}
                        to="/app/AgregarCliente"
                        size="small"
                        variant="outlined"
                        sx={{
                            color: 'white',
                            borderColor: 'white',
                            minWidth: '40px',
                            minHeight: '40px',
                            borderRadius: '50%',
                            padding: 0,
                            '&:hover': {
                                color: 'gray',
                                borderColor: 'transparent',
                                boxShadow: '0 0 30px rgb(29, 118, 235)'

                            }
                        }}
                    >
                        <AddIcon />
                    </Button>
                </Box>

                <Grid sx={{ minHeight: '100vh', width: '100%' }}>
                    <TableCliente
                        clientes={Clientes}
                        onEdit={(cliente) => {
                            navigate(`/app/ActualizarCliente/${cliente.id}`)
                        }}
                        onDelete={(cliente) => {
                            console.log('Eliminar cliente:', cliente);
                            // Aquí podrías mostrar un dialogo de confirmación y luego eliminar
                        }}
                    />
                </Grid>

            </Container>

        </>

    )
}

export default Cliente