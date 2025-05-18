import { useState, useEffect } from "react";
import { Box, Button, Paper, TextField, Typography, Snackbar, Alert, InputAdornment, Autocomplete } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProveedor = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [tpproveedor, setTpproveedor] = useState([]);
    const [proveedor, setProveedor] = useState({
        NombreEmpresa: "",
        NumeroDireccion: "",
        barriodireccion: "",
        CalleDireccion: "",
        NombreContacto: "",
        ApellidoContacto: "",
        celp1: "",
        celp2: "",
        Nit: "",
        fkTipoProveedor: ""
    });

    useEffect(() => {
        const fetchAllTP = async () => {
            try {
                const res = await axios.get('http://localhost:3000/tipoproveedor');
                setTpproveedor(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllTP();
    }, []);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setProveedor(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/proveedor", proveedor);
            setOpenSnackbar(true);
            setProveedor({
                NombreEmpresa: "",
                NumeroDireccion: "",
                barriodireccion: "",
                CalleDireccion: "",
                NombreContacto: "",
                ApellidoContacto: "",
                celp1: "",
                celp2: "",
                Nit: "",
                fkTipoProveedor: ""
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
                height: '100%',
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
                    Agregar proveedor
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleClick}
                    sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}
                >
                    <TextField
                        label="Nombre del proveedor"
                        name="NombreEmpresa"
                        type="text"
                        value={proveedor.NombreEmpresa}
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
                        options={tpproveedor}
                        getOptionLabel={(option) => option.NombreTpro}
                        value={
                            tpproveedor.find(
                                (tipo) => tipo.idtipoproveedor === proveedor.fkTipoProveedor
                            ) || null
                        }
                        onChange={(event, newValue) => {
                            handleChange({
                                target: {
                                    name: 'fkTipoProveedor',
                                    value: newValue ? newValue.idtipoproveedor : '',
                                },
                            });
                        }}
                        isOptionEqualToValue={(option, value) =>
                            option.idtipoproveedor === value.idtipoproveedor
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Tipo"
                                name="fkTipoProveedor"
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
                        label="Numero de dirección"
                        name="NumeroDireccion"
                        type="text"
                        value={proveedor.NumeroDireccion}
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
                        label="Barrio de dirección"
                        name="barriodireccion"
                        type="text"
                        value={proveedor.barriodireccion}
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
                        label="calle de dirección"
                        name="CalleDireccion"
                        type="text"
                        value={proveedor.CalleDireccion}
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
                        label="Nombre de contacto"
                        name="NombreContacto"
                        type="text"
                        value={proveedor.NombreContacto}
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
                        label="Apellido de contacto"
                        name="ApellidoContacto"
                        type="text"
                        value={proveedor.ApellidoContacto}
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
                        label="Numero de celular"
                        name="celp1"
                        type="text"
                        value={proveedor.celp1}
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
                        label="Numero de celular opcional"
                        name="celp2"
                        type="text"
                        value={proveedor.celp2}
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
                        label="NIT"
                        name="Nit"
                        type="text"
                        value={proveedor.Nit}
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
                        Proveedor agregado correctamente
                    </Alert>
                </Snackbar>
            </Paper>
        </Box>
    );
};

export default AddProveedor;
