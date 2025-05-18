import { useState, useEffect } from "react";
import { Box, Button, Paper, TextField, Typography, Snackbar, Alert, InputAdornment, Autocomplete } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProveedorLote = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [Proveedor, setProveedor] = useState([]);
    const [Lote, setLote] = useState([]);

    useEffect(() => {
        const fetchAllPro = async () => {
            try {
                const res = await axios.get('http://localhost:3000/proveedor');
                setProveedor(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllPro();
    }, []);

    useEffect(() => {
        const fetchAlllotes = async () => {
            try {
                const res = await axios.get('http://localhost:3000/lote');
                setLote(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAlllotes();
    }, []);

    const [proveedorlote, setProveedorlote] = useState({
        fkProveedor: "",
        fkLote: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setProveedorlote(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/proveedorlote", proveedorlote);
            setOpenSnackbar(true);
            setProveedorlote({
                fkProveedor: "",
                fkLote: "",
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
                    Agregar lote a proveedor
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleClick}
                    sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}
                >
                    <Autocomplete
                        fullWidth
                        options={Proveedor}
                        getOptionLabel={(option) => option.Nombre}
                        value={
                            Proveedor.find(
                                (tipo) => tipo.id === proveedorlote.fkProveedor
                            ) || null
                        }
                        onChange={(event, newValue) => {
                            handleChange({
                                target: {
                                    name: 'fkProveedor',
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
                                label="Provedor"
                                name="fkProveedor"
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
                        options={Lote}
                        getOptionLabel={(option) => option.nombre}
                        value={
                            Lote.find(
                                (pre) => pre.id === proveedorlote.fkLote
                            ) || null
                        }
                        onChange={(event, newValue) => {
                            handleChange({
                                target: {
                                    name: 'fkLote',
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
                                label="Lote"
                                name="fkLote"
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
                        Lote agregado a proveedor correctamente
                    </Alert>
                </Snackbar>
            </Paper>
        </Box>
    );
};

export default AddProveedorLote;
