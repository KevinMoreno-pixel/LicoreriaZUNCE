import { useState } from "react";
import { useAuth } from "../Auth/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { API_URL } from "../Auth/constants";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { TextField, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rol, setRol] = useState("0");
    const [errorResponse, setErrorResponse] = useState("");
    const Auth = useAuth();
    const goTo = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                    rol: Number(rol) // envía rol como número
                }),
            });

            if (response.ok) {
                const json = await response.json();
                if (json.body.accessToken && json.body.refreshToken && json.body.user) {
                    Auth.saveUser(json);

                    const userRol = json.body.user?.rol;

                    if (userRol === 1) {
                        goTo("/app");
                    } else if (userRol === 0) {
                        goTo("/client");
                    } else {
                        setErrorResponse("Rol inválido");
                    }

                }

            } else {
                const json = await response.json();
                setErrorResponse(json.body.error);
            }
        } catch (error) {
            console.log(error);
            setErrorResponse("Network error");
        }
    }

    if (Auth.isAuthenticated) {
        if (Auth.user?.rol === 1) {
            return <Navigate to="/app" />;
        } else if (Auth.user?.rol === 0) {
            return <Navigate to="/client" />;
        } else {
            return <Navigate to="/unauthorized" />;
        }
    }


    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h3>Login Here</h3>
            {!!errorResponse && (
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert variant="outlined" severity="error">
                        {errorResponse}
                    </Alert>
                </Stack>
            )}

            <label>Username</label>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />

            <label>Password</label>
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            <label>Rol:</label>
            <TextField
                sx={{ marginTop: '20px', color: 'white' }}
                select
                value={rol}
                onChange={(e) => setRol(Number(e.target.value))}
                fullWidth
                required
            >
                <MenuItem  value={0}>Cliente</MenuItem>
                <MenuItem color="white" value={1}>Administrador</MenuItem>
            </TextField>

            <button>Log In</button>

            <Link to="/signup">

                <button>Sign Up</button>

            </Link>
        </form>
    );
}
