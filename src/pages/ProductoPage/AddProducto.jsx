import { useEffect, useState } from 'react';
import { Autocomplete, TextField, Button, Box, Typography, Paper, Snackbar, Alert } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const AddProducto = () => {

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [imagen, setImagen] = useState(null);
  const [preview, setPreview] = useState(null);
  const [tiposDeProducto, setTiposDeProducto] = useState([]);


  useEffect(() => {
    const fetchAllTP = async () => {
      try {
        const res = await axios.get('http://localhost:3000/tipoproducto');
        setTiposDeProducto(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllTP();
  }, []);


  const [producto, setProducto] = useState({
    nombreproducto: "",
    marcaproducto: "",
    volumen: "",
    fktipoproducto: "",
    PorcentajeAlcohol: "",
    Precio: "",

  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setProducto(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Añadir los datos del producto al FormData
    Object.entries(producto).forEach(([key, value]) => {
      formData.append(key, value === "" ? null : value);
    });

    // Añadir la imagen al FormData
    if (imagen) {
      formData.append("imagen", imagen);
    }

    try {
      await axios.post("http://localhost:3000/producto", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      navigate("/AgregarLote");
      setOpenSnackbar(true);
      setProducto({
        nombreproducto: "",
        marcaproducto: "",
        volumen: "",
        fktipoproducto: "",
        PorcentajeAlcohol: "",
        Precio: "",
      });
      setImagen(null);
      setPreview(null);
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
          Agregar producto
        </Typography>

        <Box
          component="form"
          onSubmit={handleClick}
          // onSubmit={handleSubmit}
          sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, }}
        >
          <TextField

            label="Nombre"
            name="nombreproducto"
            type="text"
            value={producto.nombreproducto}
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
            label="Marca"
            name="marcaproducto"
            type="text"
            value={producto.marcaproducto}
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
            options={tiposDeProducto}
            getOptionLabel={(option) => option.NombreTP}
            value={
              tiposDeProducto.find(
                (tipo) => tipo.idtipoproducto === producto.fktipoproducto
              ) || null
            }
            onChange={(event, newValue) => {
              handleChange({
                target: {
                  name: 'fktipoproducto',
                  value: newValue ? newValue.idtipoproducto : '',
                },
              });
            }}
            isOptionEqualToValue={(option, value) =>
              option.idtipoproducto === value.idtipoproducto
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tipo"
                name="fktipoproducto"
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
            label="Volumen"
            name="volumen"
            type="text"
            value={producto.volumen}
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
            label="Porcentaje de Alcohol"
            name="PorcentajeAlcohol"
            type="text"
            value={producto.PorcentajeAlcohol}
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
            label="Precio"
            name="Precio"
            type="number"
            value={producto.Precio}
            onChange={handleChange}
            required
            fullWidth
            variant="filled"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{
                  '& .MuiTypography-root': {
                    color: 'white',
                  }
                }
                } >
                  $</InputAdornment>
              ),

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
              {imagen ? 'Imagen cargada' : 'Arrastra una imagen aquí o haz clic para seleccionar archivos .png o .jpg'}
            </Typography>
            <input
              id="imageInput"
              name="imagen"
              type="file"
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
            Agregar
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
        <Snackbar
          open={openSnackbar}
          autoHideDuration={2500}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
            Producto agregado correctamente
          </Alert>
        </Snackbar>
      </Paper >
    </Box >
  )
}

export default AddProducto