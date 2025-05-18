import { useState } from "react";
import { useAuth } from "../Auth/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { API_URL } from "../Auth/constants";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { TextField, MenuItem } from "@mui/material";

export default function Signup() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorResponse, setErrorResponse] = useState("");
    const [rol, setRol] = useState("0");

    const Auth = useAuth();
    const goTo = useNavigate();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {

            const response = await fetch(`${API_URL}/signup`, {

                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                    rol: Number(rol)
                }),
            })

            if (response.ok) {
                console.log("User created successfully");
                setErrorResponse("");

                goTo("/");
            } else {
                console.log("Error creating user");

                const json = await response.json();
                setErrorResponse(json.body.error);
            }

        } catch (error) {
            console.log(error);
        }
    }

    if (Auth.isAuthenticated) {
        return <Navigate to="/App" />;
    }
    return (
        <>

            <form className="login-form" onSubmit={handleSubmit}>

                <h3>Sign Up</h3>
                {!!errorResponse && ( // <-- si hay error, mostramos el Alert
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert variant="outlined" severity="error">
                            {errorResponse}
                        </Alert>
                    </Stack>
                )}

                <label>Username</label>
                <input type="text" placeholder="Nombre de usuario" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />

                <label>Password</label>
                <input type="password" placeholder="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                <TextField
                    sx={{ marginTop: '20px' }}
                    select
                    value={rol}
                    onChange={(e) => setRol(Number(e.target.value))}
                    fullWidth
                    required
                >
                    <MenuItem color="white" value={0}>Cliente</MenuItem>
                    <MenuItem color="white" value={1}>Administrador</MenuItem>
                </TextField>
                <button>Confirmar</button>
                <button
                    onClick={() => navigate('/')}
                >
                    Volver
                </button>

            </form>
        </>
    );
}