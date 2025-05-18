import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import { Backdrop, CircularProgress } from '@mui/material'
import { useState, useEffect } from 'react'
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import './App.css'

const App = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000); // Espera 2 segundos

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setLoading(false);
    };

    return (
        <>
            <Backdrop
                open={loading}
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    height: '100vh',
                    zIndex: (theme) => theme.zIndex.drawer + 999,
                    color: '#fff',
                    backgroundColor: 'rgba(0, 0, 0, 0.85)',
                }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            {!loading && (
                <Box
                    sx={{
                        backgroundColor: 'rgb(0, 0, 5)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        Height: '100vh',
                    }}
                >
                    {/* Contenedor general con blur */}
                    <Box
                        sx={{
                            backgroundColor: 'rgba(2, 200, 255, 0.12)',
                            backdropFilter: 'blur(10px)',
                            minHeight: '100vh',
                        }}
                    >
                        <div className='caja'>
                            <Navbar />
                        </div>
                        <Outlet />
                        <Footer />
                    </Box>
                </Box>
            )}

        </>
    )
}

export default App