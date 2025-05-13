import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Button, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CardProducto from '../../Components/CardProducto/Card';
import { Link } from 'react-router-dom';

const Producto = () => {
    const [productos, setProductos] = useState([]);


    useEffect(() => {
        const fetchAllProductos = async () => {
            try {
                const res = await axios.get('http://localhost:3000/infoproducto');
                setProductos(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllProductos();
    }, []);

    return (
        <Container
            sx={{
                mt: 5,
                justifyContent: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 2,
                gap: 4
            }}
        >
            <Typography variant="h4" gutterBottom sx={{ color: 'white' }}>
                Productos 🛒
            </Typography>

            <Box display="flex" justifyContent="flex-start" mb={2} width="100%" alignItems="center">
                <Typography variant='h6' sx={{ color: 'white', padding: '10px' }}>Agregar un producto: </Typography>
                <Button
                    component={Link}
                    to="/AgregarProducto"
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

            <Grid container spacing={5} sx={{ justifyContent: 'center', minHeight: '100vh' }}>
                {productos.map((producto) => (
                    <Grid key={producto.id}>
                        <CardProducto producto={producto} />
                    </Grid>
                ))}
            </Grid>

        </Container>
    );
};

export default Producto;
