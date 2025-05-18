import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Button, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CardProductoCliente from '../../Components/CardProductoCliente/Cardcliente';
import { Link } from 'react-router-dom';

const ProductoCliente = () => {
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

            <Grid container spacing={5} sx={{ justifyContent: 'center', minHeight: '100vh' }}>
                {productos
                    .filter((p) => p.Estado?.trim().toUpperCase() === 'A')
                    .map((p) => (
                        <Grid key={p.id}>
                            <CardProductoCliente producto={p} />
                        </Grid>
                    ))}

            </Grid>

        </Container>
    );
};

export default ProductoCliente;
