import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Producto from './pages/ProductoPage/producto'
import AddProducto from './pages/ProductoPage/AddProducto'
import UpdateProducto from './pages/ProductoPage/UpdateProducto'
import Navbar from './Components/Navbar/Navbar'
import Cliente from './pages/ClientePage/Cliente'
import Footer from './Components/Footer/Footer'
import AddCliente from './pages/ClientePage/AddCliente'
import './App.css'

const App = () => {
    return (
        <>
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
                </Routes>
                <Footer />
            </BrowserRouter>
        </>
    )
}

export default App