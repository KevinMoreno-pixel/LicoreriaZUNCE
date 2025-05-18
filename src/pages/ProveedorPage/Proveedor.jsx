import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Button, Grid } from '@mui/material';
import { Link, Navigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import TableProveedor from '../../Components/TableProveedor/TableProveedor';

const proveedor = () => {

    const [proveedores, setProveedores] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllProveedor = async () => {
            try {
                const res = await axios.get('http://localhost:3000/infoproveedor');
                setProveedores(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllProveedor();
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
                    PROVEEDORES
                </Typography>

                 <Box display="flex" justifyContent="space-between" mb={2} width="100%" alignItems="center">
                    <Typography variant='h6' sx={{ color: 'white', padding: '20px' }}>Agregar un proveedor: </Typography>
                    <Button
                        component={Link}
                        to="/app/AgregarProveedor"
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
                    <Typography variant='h6' sx={{ color: 'white', padding: '20px' }}>Agregar un lote a proveedor: </Typography>
                    <Button
                        component={Link}
                        to="/app/ProveedorLote"
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
                    <TableProveedor
                        proveedor={proveedores}
                        onEdit={(proveedor) => {
                            navigate(`/app/ActualizarProveedor/${proveedor.id}`)
                        }}
                        onDelete={(proveedor) => {
                            console.log('Eliminar proveedor:', proveedor);
                            // Aquí podrías mostrar un dialogo de confirmación y luego eliminar
                        }}
                    />
                </Grid>

            </Container>

        </>

    )
}

export default proveedor