import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Button, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CardFactura from '../../Components/CardFactura/CardFactura';
import { Link } from 'react-router-dom';

const Factura = () => {
    const [facturas, setFacturas] = useState([]);


    useEffect(() => {
        const fetchAllFacturas = async () => {
            try {
                const res = await axios.get('http://localhost:3000/infofactura');
                setFacturas(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllFacturas();
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
            <Typography variant="h3" gutterBottom sx={{ color: 'white', fontWeight: 'bold' }}>
                FACTURAS
            </Typography>

            <Grid container spacing={5} sx={{ justifyContent: 'center', minHeight: '100vh' }}>
                {facturas.map((factura) => (
                    <Grid key={factura.id}>
                        <CardFactura factura={factura} />
                    </Grid>
                ))}

            </Grid>

        </Container>
    );
};

export default Factura;
