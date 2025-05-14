import { useState, useEffect } from "react";
import { Box, Button, Paper, TextField, Typography, Snackbar, Alert, InputAdornment, Autocomplete } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddLote = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [Producto, setProducto] = useState([]);
    const [Presentacion, setPresentacion] = useState([]);

    useEffect(() => {
        const fetchAllPre = async () => {
            try {
                const res = await axios.get('http://localhost:3000/presentacion');
                setPresentacion(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllPre();
    }, []);

    useEffect(() => {
        const fetchAllProductos = async () => {
            try {
                const res = await axios.get('http://localhost:3000/producto');
                setProducto(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllProductos();
    }, []);

    const [Lote, setLote] = useState({
        NombreLote: "",
        fkProducto: "",
        fkPresentacion: "",
        Caducidad: "",
        Stock: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setLote(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/lote", Lote);
            setOpenSnackbar(true);
            navigate("/")
            setLote({
                NombreLote: "",
                fkProducto: "",
                fkPresentacion: "",
                Caducidad: "",
                Stock: "",
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
                    Agregar Lote
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleClick}
                    sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}
                >
                    <TextField
                        label="Nombre del lote"
                        name="NombreLote"
                        type="text"
                        value={Lote.NombreLote}
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
                    <Autocomplete
                        fullWidth
                        options={Producto}
                        getOptionLabel={(option) => option.NombreProducto}
                        value={
                            Producto.find(
                                (tipo) => tipo.idproducto === Lote.fkProducto
                            ) || null
                        }
                        onChange={(event, newValue) => {
                            handleChange({
                                target: {
                                    name: 'fkProducto',
                                    value: newValue ? newValue.idproducto : '',
                                },
                            });
                        }}
                        isOptionEqualToValue={(option, value) =>
                            option.idproducto === value.idproducto
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
                        options={Presentacion}
                        getOptionLabel={(option) => option.NombrePresentacion}
                        value={
                            Presentacion.find(
                                (pre) => pre.idpresentacion === Lote.fkPresentacion
                            ) || null
                        }
                        onChange={(event, newValue) => {
                            handleChange({
                                target: {
                                    name: 'fkPresentacion',
                                    value: newValue ? newValue.idpresentacion : '',
                                },
                            });
                        }}
                        isOptionEqualToValue={(option, value) =>
                            option.idpresentacion === value.idpresentacion
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Presentación"
                                name="fkPresentacion"
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
                    <TextField
                        label="Cantidad"
                        name="Stock"
                        type="number"
                        value={Lote.Stock}
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
                    <TextField
                        name="Caducidad"
                        type="date"
                        value={Lote.Caducidad}
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
                        Lote agregado correctamente
                    </Alert>
                </Snackbar>
            </Paper>
        </Box>
    );
};

export default AddLote;
