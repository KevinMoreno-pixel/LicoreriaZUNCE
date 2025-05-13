import { useState } from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    CardActions,
    Button
} from '@mui/material';
import LensIcon from '@mui/icons-material/Lens';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
const CardProducto = ({ producto }) => {

    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <Card
            sx={{
                width: 350,
                height: 500,
                backgroundColor: 'transparent',
                color: 'white',
                border: '1px solid static',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.6s ease-in-out',
                '&:hover': {
                    scale: 1.05,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
            }}
        >
            <Box sx={{ position: 'relative', width: '100%', height: '200px' }}>
                {!imageLoaded && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(0, 0, 0, 0.1)',
                            zIndex: 1,
                        }}
                    >
                        <CircularProgress color="inherit" />
                    </Box>
                )}
                <CardMedia
                    component="img"
                    alt={`Poster de ${producto.Nombre}`}
                    image={`http://localhost:3000/imagen/${producto.id}`}
                    onLoad={() => setImageLoaded(true)}
                    sx={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'contain',
                        display: imageLoaded ? 'block' : 'none',
                    }}
                />
            </Box>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="div">
                    {producto.Nombre}
                </Typography>
                <Typography variant="body2" color="grey">
                    {producto.Marca},  {producto.Tipo}
                </Typography>
                <Typography variant="body1" sx={{ gap: '4' }}>
                    {producto.Presentacion}
                </Typography>
                <Typography variant="body1">
                    {producto.Volumen}
                </Typography>
                <Typography variant="body1">
                    {producto.Porcentajeal}
                </Typography>
                <Typography variant="h5" sx={{ display: 'flex', justifyContent: 'end' }}>
                    {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(producto.Precio)}
                </Typography>
                <Typography variant="body1" sx={{ display: 'flex', justifyContent: 'end', gap: 0.5 }}>
                    <LensIcon
                        color={producto.Estado === 'A' ? 'success' : producto.Estado === 'I' ? 'error' : 'inherit'}
                        fontSize='small' />
                </Typography>
            </CardContent>

            <CardActions
                sx={{
                    justifyContent: 'flex-end',
                }}
            >

                <Button
                    component={Link}
                    to={`/ActualizarProducto/${producto.id}`}
                    size="small"
                    sx={{
                        minWidth: '40px',
                        minHeight: '40px',
                        borderRadius: '50%',
                        color: 'white',
                        borderColor: 'white',
                        '&:hover': {
                            color: 'Gray'
                        }
                    }}
                >
                    <SettingsIcon fontSize='small' />
                </Button>
                <Button
                    size="small"
                    sx={{
                        minWidth: '40px',
                        minHeight: '40px',
                        borderRadius: '50%',
                        color: 'white',
                        borderColor: 'white',
                        '&:hover': {
                            color: 'Gray'
                        }
                    }}
                >
                    <DeleteIcon fontSize='small' />
                </Button>
            </CardActions>
        </Card >
    );
};

export default CardProducto;