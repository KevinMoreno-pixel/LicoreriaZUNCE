import { Box, Typography, Card, CardContent, CardMedia, Grid, Button, Divider } from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FeaturedProducts from '../../Components/Destacadas/images'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CardInfo from '../../Components/CardInfo/Cardinfo'
import { Link } from 'react-router-dom';

export default function home() {

    return (
        <Box sx={{ maxHeight: '100%', px: 6, py: 5, backgroundColor: 'rgba(0, 0, 0, 0.9)', color: 'white' }}>
            {/* Encabezado */}
            <Box textAlign="center" mb={6}>
                <Typography variant="h2" fontWeight="bold" sx={{ color: '#FFD700', textShadow: '0 0 10px #FFD700' }}>
                    Bienvenidos a ZUN<span style={{ color: 'white' }}>CE</span>
                </Typography>
                <Typography variant="h5" sx={{ mt: 2, maxWidth: '800px', mx: 'auto' }}>
                    Tu licorería y market de confianza. Licores, cervezas artesanales, vinos finos y mucho más.
                    Calidad, sabor y exclusividad, todo en un solo lugar.
                </Typography>
                <Button
                    component={Link}
                    to="/client/catalogo"
                    variant="outlined"
                    size="large"
                    color='white'
                    sx={{
                        mt: 4,
                        '&:hover': {
                            color: 'yellow',
                            borderColor: 'transparent',
                            boxShadow: '0 0 30px rgb(255, 234, 0)',
                            textShadow: '0 0 10px #FFD700'
                        }
                    }}
                    startIcon={<LocalBarIcon />}
                >
                    Catálogo
                </Button>
                <Button
                    color='white'
                    variant="outlined"
                    size="large"
                    sx={{
                        mt: 4,
                        '&:hover': {
                            color: 'yellow',
                            borderColor: 'transparent',
                            boxShadow: '0 0 30px rgb(255, 234, 0)',
                            textShadow: '0 0 10px #FFD700'
                        }
                    }}
                    startIcon={<ShoppingCartIcon />}
                >
                    Comprar
                </Button>

            </Box>

            <Divider sx={{ borderColor: '#FFD700', mb: 6 }} />

            {/* Productos destacados */}
            <Box mb={10}>
                <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
                    Productos Destacados
                </Typography>

                <Grid container spacing={4} justifyContent="center" mt={2}>
                    <FeaturedProducts />
                </Grid>
            </Box>
            {/* Acerca de nosotros */}
            <Box textAlign="center" mb={10}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    ¿Quiénes Somos?
                </Typography>
                <Typography sx={{ maxWidth: '700px', mx: 'auto', color: 'gray' }}>
                    En <strong>ZUNCE</strong> somos apasionados por ofrecer lo mejor del mundo de las bebidas.
                    Con años de experiencia, nos especializamos en brindar productos de alta calidad,
                    atención personalizada y un ambiente ideal para encontrar lo que buscas.
                </Typography>
            </Box>
            {/* Ubicación */}
            <Box textAlign="center" mb={6}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    ¿Dónde nos ubicamos?
                </Typography>
                <Typography sx={{ maxWidth: '600px', mx: 'auto', color: 'gray', mb: 2 }}>
                    Encuéntranos en el corazón de la ciudad. Te esperamos con los brazos abiertos
                    para ofrecerte una experiencia única.
                </Typography>
                <Box display="flex" justifyContent="center" alignItems="center" gap={2}>
                    <LocationOnIcon color="warning" />
                    <Typography variant="body1">
                        Florencia,Caquetà Colombia
                        Barrio Porvenir
                        Transversal 6 #14A 26
                    </Typography>
                </Box>
            </Box>
            {/* Informacion del desarrollador */}
            <Box textAlign="center" mb={10}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Desarrollado por:
                </Typography>
                <CardInfo />
            </Box>



        </Box>
    );
}
