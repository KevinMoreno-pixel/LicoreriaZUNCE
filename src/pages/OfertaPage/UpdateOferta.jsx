import { useState, useEffect } from "react";
import { Box, Button, Paper, TextField, Typography, Snackbar, Alert, InputAdornment, Autocomplete } from "@mui/material";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const UpdateOferta = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [oferta, setOferta] = useState({
        ValorOferta: "",
        FechaOferta: "",
        HoraOferta: "",
        EstadoOferta: ""
    });

    const navigate = useNavigate();
    const location = useLocation();

    const ofertaid = location.pathname.split("/")[3]

    const handleChange = (e) => {
        setOferta(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/oferta/${ofertaid}`, oferta);
            setOpenSnackbar(true);
            setOferta({
                ValorOferta: "",
                FechaOferta: "",
                HoraOferta: "",
                EstadoOferta: ""
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
                    Actualizar oferta
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleClick}
                    sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}
                >
                    <TextField
                        label="Porcentaje de la oferta"
                        name="ValorOferta"
                        type="number"
                        value={oferta.ValorOferta}
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
                        name="FechaOferta"
                        type="date"
                        value={oferta.FechaOferta}
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
                        name="HoraOferta"
                        type="time"
                        value={oferta.HoraOferta}
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
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                        <FormControl>
                            <FormLabel sx={{ color: inputStyles.label.color, textAlign: 'center' }}>
                                Estado de la oferta
                            </FormLabel>
                            <RadioGroup
                                row
                                name="EstadoOferta"
                                value={oferta.EstadoOferta}
                                onChange={handleChange}
                                sx={{ justifyContent: 'center' }}
                            >
                                <FormControlLabel
                                    value="A"
                                    control={<Radio sx={{ color: inputStyles.input.color }} />}
                                    label="Activo"
                                    sx={{ color: inputStyles.input.color }}
                                />
                                <FormControlLabel
                                    value="I"
                                    control={<Radio sx={{ color: inputStyles.input.color }} />}
                                    label="Inactivo"
                                    sx={{ color: inputStyles.input.color }}
                                />
                            </RadioGroup>
                        </FormControl>
                    </Box>

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
                        Oferta actualizada correctamente
                    </Alert>
                </Snackbar>
            </Paper>
        </Box>
    );
};

export default UpdateOferta;
