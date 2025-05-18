import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Button, Grid } from '@mui/material';
import { Link, Navigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import TableOferta from '../../Components/TableOferta/TableOferta';
import Tableofertavalor from '../../Components/TableOfertaValor/ofertavalor';

const Oferta = () => {
    const [Oferticas, setOferticas] = useState([]);
    const [Ofertas, setOfertas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllOfertas = async () => {
            try {
                const res = await axios.get('http://localhost:3000/infoOferta');
                setOfertas(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllOfertas();
    }, []);

    useEffect(() => {
        const fetchAllOferticas = async () => {
            try {
                const res = await axios.get('http://localhost:3000/Oferta');
                setOferticas(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllOferticas();
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
                    OFERTAS
                </Typography>

                <Box display="flex" justifyContent="space-evenly" mb={2} width="100%" alignItems="center">
                    <Typography variant='h6' sx={{ color: 'white', padding: '20px' }}>Agregar una oferta: </Typography>
                    <Button
                        component={Link}
                        to="/app/AgregarOferta"
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
                    <Typography variant='h6' sx={{ color: 'white', padding: '20px' }}>Agregar oferta a producto: </Typography>
                    <Button
                        component={Link}
                        to="/app/AgregarProductoOferta"
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
                {/* Tableofertavalor: ancho ajustado a su contenido */}
                <Grid item sx={{ width: '100%' }}>
                    <Typography variant="h5" gutterBottom sx={{ color: 'white' }}>
                        Tipo de ofertas
                    </Typography>

                    <Tableofertavalor
                        ofertica={Oferticas}
                        onEdit={(oferticas) => {
                            navigate(`/app/ActualizarOferta/${oferticas.id}`);
                        }}
                        onDelete={(oferticas) => {
                            console.log('Eliminar cliente:', oferticas);
                        }}
                    />
                </Grid>

                {/* TableOferta: ancho completo */}
                <Grid item sx={{ width: '100%', marginTop: '20px' }}>
                    <Typography variant="h5" gutterBottom sx={{ color: 'white' }}>
                        Productos en ofertas
                    </Typography>
                    <TableOferta
                        ofertas={Ofertas}
                        onEdit={(ofertas) => {
                            navigate(`/app/ActualizarLote/${ofertas.id}`);
                        }}
                        onDelete={(ofertas) => {
                            const [fkProducto, fkOferta] = ofertas.id.split('-');

                            if (window.confirm('¿Estás seguro de que deseas eliminar esta oferta del producto?')) {
                                axios.delete(`http://localhost:3000/productoOferta/${fkProducto}/${fkOferta}`)
                                    .then(() => {
                                        setOfertas((prev) =>
                                            prev.filter(
                                                o => `${o.idproducto}-${o.idoferta}` !== ofertas.id
                                            )
                                        );


                                    })

                                    .catch((err) => {
                                        if (err.response) {
                                            console.error('❌ Error del servidor - status:', err.response.status);
                                        } else if (err.request) {
                                            console.error('❌ No hubo respuesta del servidor:', err.request);
                                        } else {
                                            console.error('❌ Error al enviar la petición:', err.message);
                                        }
                                    });


                            }
                        }}
                    />
                </Grid>

            </Container>

        </>

    )
}

export default Oferta