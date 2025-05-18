import React from 'react'
import Footer from './Components/Footer/Footer'
import Home from './pages/Homepage/home'
import { Backdrop, CircularProgress } from '@mui/material'
import { useState, useEffect } from 'react'
import Navbarclient from './Components/Navbarclient/Navarclient'
import { Outlet } from 'react-router-dom';

const Client = () => {
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
        <>
          <Navbarclient />
          <Outlet />
          <Footer />

        </>
      )}

    </>
  )
}

export default Client