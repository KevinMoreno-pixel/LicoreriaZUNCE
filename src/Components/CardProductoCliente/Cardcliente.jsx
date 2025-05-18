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
                height: 450,
                backgroundColor: 'rgba(0, 0, 0, 0.91)',
                color: 'white',
                border: '1px solid static',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.6s ease-in-out',
                '&:hover': {
                    scale: 1.05,
                    backgroundColor: 'rgba(17, 1, 1, 0.51)',
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
                <Typography variant="h5" sx={{ textShadow: '0 0 20px', color: 'yellow', display: 'flex', justifyContent: 'end' }}>
                    {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(producto.Precio)}
                </Typography>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    {producto.descuento != null && (
                        <Box
                            sx={{
                                display: 'inline-block',
                                backgroundColor: 'orange',
                                borderRadius: '20px',
                                padding: '2px 10px',
                            }}
                        >
                            <Typography variant="body2" fontWeight="bold">
                                -{Math.round(producto.descuento * 100)}%
                            </Typography>
                        </Box>
                    )}


                    <Typography variant="h6" sx={{ display: 'flex', justifyContent: 'end', color: 'grey', textDecoration: 'line-through' }}>
                        {producto.valorAnterior != null
                            ? new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(producto.valorAnterior)
                            : ''}
                    </Typography>
                </Box>
            </CardContent>
        </Card >
    );
};

export default CardProducto;