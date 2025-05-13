import * as React from 'react'
import { useState } from 'react';
import { TextField, Button, Box, Typography, Paper, Snackbar, Alert } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';


const UpdateProducto = () => {

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [imagen, setImagen] = useState(null);
    const [preview, setPreview] = useState(null);

    const [producto, setProducto] = useState({
        Precio: "",
    });

    const navigate = useNavigate();
    const location = useLocation();

    const productoid = location.pathname.split("/")[2]


    const handleChange = (e) => {
        setProducto(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async e => {

        e.preventDefault()
        try {
            await axios.put("http://localhost:3000/producto/" + productoid, producto);
            await actualizarImagen();
            setOpenSnackbar(true);
            setProducto({ //LIMPIAR FORMULARIO
                Precio: ""
            });
        } catch (err) {
            console.log(err)
        }
    };

    const actualizarImagen = async () => {
        if (!imagen) return; // Si no se seleccionó nueva imagen, no hacemos nada

        const formData = new FormData();
        formData.append("imagen", imagen);

        try {
            await axios.put(`http://localhost:3000/imagen/${productoid}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("Imagen actualizada correctamente");
        } catch (err) {
            console.error("Error al actualizar imagen:", err);
        }
    };

    const inputStyles = {
        input: { color: 'white' },
        label: { color: 'gray' },
        underline: {
            '&:before': { borderBottomColor: 'white' },
        },
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
            setImagen(file);
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            setImagen(file);
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',

            }}
        >
            <Paper elevation={3}
                sx={{
                    p: 4,
                    width: '100%',
                    maxWidth: 500,
                    bgcolor: 'rgba(17, 17, 17, 0.74)',
                    borderRadius: 5,
                    boxShadow: 5,
                }}>
                <Typography variant="h5" textAlign="center" mb={2} color='white'>
                    Actualizar producto
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleClick}
                    // onSubmit={handleSubmit}
                    sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, }}
                >
                    <TextField

                        label="Nuevo precio"
                        name="Precio"
                        type="number"
                        value={producto.Precio}
                        onChange={handleChange}
                        fullWidth
                        variant="filled"
                        InputProps={{
                            sx: {
                                color: inputStyles.input.color,
                                ...inputStyles.underline,
                            },
                        }}
                        InputLabelProps={{
                            sx: { color: inputStyles.label.color },
                        }}
                    />
                    <Box
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        sx={{
                            border: '2px dashed #ccc',
                            borderRadius: 2,
                            p: 2,
                            textAlign: 'center',
                            color: 'white',
                            width: '100%',
                            cursor: 'pointer',
                            '&:hover': { borderColor: '#999' }
                        }}
                        onClick={() => document.getElementById('imageInput').click()}
                    >
                        <Typography variant="body1">
                            {imagen ? 'Imagen cargada' : 'Arrastra una imagen aquí o haz clic para seleccionar, archivos .png o .jpg'}
                        </Typography>
                        <input
                            id="imageInput"
                            type="file"
                            name="imagen"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                        {preview && (
                            <Box mt={2}>
                                <img src={preview} alt="Vista previa" style={{ maxWidth: '100%', maxHeight: 150 }} />
                            </Box>
                        )}
                    </Box>

                    <Button
                        type="submit"
                        variant="outlined"
                        color="primary" fullWidth>
                        Actualizar
                    </Button>
                    <Button
                        type="button"
                        variant="outlined"
                        color="primary"
                        fullWidth
                        onClick={() => navigate(-1)}>
                        Volver
                    </Button>
                </Box>
            </Paper >
            <Snackbar
                open={openSnackbar}
                autoHideDuration={2500}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
                    Producto actualizado correctamente
                </Alert>
            </Snackbar>
        </Box >
    )
}

export default UpdateProducto