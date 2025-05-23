import { useState, useEffect } from "react";
import { Box, Button, Paper, TextField, Typography, Snackbar, Alert, InputAdornment, Autocomplete } from "@mui/material";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateCliente = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [cliente, setCliente] = useState({
        Nombre1: "",
        Nombre2: "",
        Apellido: "",
        Apellido2: "",
        celC1: "",
        celC2: "",
    });

    const navigate = useNavigate();
    const location = useLocation();

    const clienteid = location.pathname.split("/")[3]

    const handleChange = (e) => {
        setCliente(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/cliente/${clienteid}`, cliente);
            setOpenSnackbar(true);
            setCliente({
                Nombre1: "",
                Nombre2: "",
                Apellido: "",
                Apellido2: "",
                celC1: "",
                celC2: "",
            });
        } catch (err) {
            console.log(err);
        }
    };

    const inputStyles = {
        input: { color: 'white' },
        label: { color: 'gray' },
        underline: {
            '&:before': { borderBottomColor: 'white' },
        },
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
                    Actualizar cliente
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleClick}
                    sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}
                >
                    <TextField
                        label="Nuevo primer Nombre"
                        name="Nombre1"
                        type="text"
                        value={cliente.Nombre1}
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
                    <TextField
                        label="nuevo segundo Nombre"
                        name="Nombre2"
                        type="text"
                        value={cliente.Nombre2}
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
                    <TextField
                        label="nuevo Primer Apellido"
                        name="Apellido"
                        type="text"
                        value={cliente.Apellido}
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
                    <TextField
                        label="nuevo Segundo Apellido"
                        name="Apellido2"
                        type="text"
                        value={cliente.Apellido2}
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
                    <TextField
                        label="nuevo Numero Celular"
                        name="celC1"
                        type="text"
                        value={cliente.celC1}
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
                    <TextField
                        label="nuevo Teléfono"
                        name="celC2"
                        type="text"
                        value={cliente.celC2}
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
                    <Button type="submit" variant="outlined" color="primary" fullWidth>
                        Actualizar
                    </Button>
                    <Button
                        type="button"
                        variant="outlined"
                        color="primary"
                        fullWidth
                        onClick={() => navigate(-1)}
                    >
                        Volver
                    </Button>
                </Box>

                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={2500}
                    onClose={() => setOpenSnackbar(false)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
                        Cliente Actualizado correctamente
                    </Alert>
                </Snackbar>
            </Paper>
        </Box>
    );
};

export default UpdateCliente