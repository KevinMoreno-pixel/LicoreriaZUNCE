import { useState, useEffect } from "react";
import { Box, Button, Paper, TextField, Typography, Snackbar, Alert, InputAdornment, Autocomplete } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProductoOferta = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [oferta, setOferta] = useState([]);
    const [producto, setProducto] = useState([]);
    const [ProductoOferta, setProductoOferta] = useState({
        fkProducto: "",
        fkOferta: "",
        FechaFin: "",
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllProductos = async () => {
            try {
                const res = await axios.get('http://localhost:3000/productosinoferta');
                setProducto(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllProductos();
    }, []);

    useEffect(() => {
        const fetchAllOfertas = async () => {
            try {
                const res = await axios.get('http://localhost:3000/ofertasActivas');
                setOferta(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllOfertas();
    }, []);

    const handleChange = (e) => {
        setProductoOferta(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/productoOferta", ProductoOferta);
            setOpenSnackbar(true);
            setProductoOferta({
                fkProducto: "",
                fkOferta: "",
                FechaFin: "",
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
                    Agregar oferta a un producto
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleClick}
                    sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}
                >
                    <Autocomplete
                        fullWidth
                        options={producto}
                        getOptionLabel={(option) => option.nombre}
                        value={
                            producto.find(
                                (tipo) => tipo.id === ProductoOferta.fkProducto
                            ) || null
                        }
                        onChange={(event, newValue) => {
                            handleChange({
                                target: {
                                    name: 'fkProducto',
                                    value: newValue ? newValue.id : '',
                                },
                            });
                        }}
                        isOptionEqualToValue={(option, value) =>
                            option.id === value.id
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Producto"
                                name="fkProducto"
                                required
                                fullWidth
                                variant="filled"
                                InputProps={{
                                    ...params.InputProps,
                                    sx: {
                                        color: inputStyles.input.color,
                                        ...inputStyles.underline,
                                    },
                                }}
                                InputLabelProps={{
                                    sx: { color: inputStyles.label.color },
                                }}
                            />
                        )}
                    />
                    <Autocomplete
                        fullWidth
                        options={oferta}
                        getOptionLabel={(option) => option.valor * 100 + '%'}
                        value={
                            oferta.find(
                                (tipo) => tipo.id === ProductoOferta.fkOferta
                            ) || null
                        }
                        onChange={(event, newValue) => {
                            handleChange({
                                target: {
                                    name: 'fkOferta',
                                    value: newValue ? newValue.id : '',
                                },
                            });
                        }}
                        isOptionEqualToValue={(option, value) =>
                            option.id === value.id
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Oferta"
                                name="fkOferta"
                                required
                                fullWidth
                                variant="filled"
                                InputProps={{
                                    ...params.InputProps,
                                    sx: {
                                        color: inputStyles.input.color,
                                        ...inputStyles.underline,
                                    },
                                }}
                                InputLabelProps={{
                                    sx: { color: inputStyles.label.color },
                                }}
                            />
                        )}
                    />
                    <Typography variant="subtitle1" textAlign="center" mb={2} color='white'>
                        Fecha fin:
                    </Typography>
                    <TextField
                        name="FechaFin"
                        type="date"
                        value={ProductoOferta.FechaFin}
                        onChange={handleChange}
                        required
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
                        Agregar
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
                        Oferta agregada correctamente
                    </Alert>
                </Snackbar>
            </Paper>
        </Box>
    );
};

export default AddProductoOferta;
