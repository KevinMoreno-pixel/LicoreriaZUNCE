import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Producto from './pages/ProductoPage/producto'
import AddProducto from './pages/ProductoPage/AddProducto'
import UpdateProducto from './pages/ProductoPage/UpdateProducto'
import Navbar from './Components/Navbar/Navbar'
import Cliente from './pages/ClientePage/Cliente'
import Footer from './Components/Footer/Footer'
import AddCliente from './pages/ClientePage/AddCliente'
import UpdateCliente from './pages/ClientePage/UpdateCliente'
import { Backdrop, CircularProgress } from '@mui/material'
import { useState, useEffect } from 'react'
import Lote from './pages/LotePage/Lote'
import AddLote from './pages/LotePage/AddLote'
import UpdateLote from './pages/LotePage/UpdateLote'
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
                <div>
                    <BrowserRouter>
                        <div className='caja'>
                            <Navbar />
                        </div>
                        <Routes>
                            <Route path="/" element={<Producto />} />
                            <Route path="/AgregarProducto" element={<AddProducto />} />
                            <Route path="/ActualizarProducto/:id" element={<UpdateProducto />} />
                            <Route path="/Cliente" element={<Cliente />} />
                            <Route path="/AgregarCliente" element={<AddCliente />} />
                            <Route path="/ActualizarCliente/:id" element={<UpdateCliente />} />
                            <Route path="/Lote" element={<Lote />} />
                            <Route path="/AgregarLote" element={<AddLote />} />
                            <Route path="/ActualizarLote/:id" element={<UpdateLote />} />


                        </Routes>
                        <Footer />
                    </BrowserRouter>
                </div>
            )}

        </>
    )
}

export default App