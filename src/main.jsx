import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Producto from './pages/ProductoPage/producto';
import AddProducto from './pages/ProductoPage/AddProducto.jsx';
import UpdateProducto from './pages/ProductoPage/UpdateProducto.jsx';
import Lote from './pages/LotePage/Lote'
import AddLote from './pages/LotePage/AddLote.jsx';
import UpdateLote from './pages/LotePage/UpdateLote.jsx';
import Cliente from './pages/ClientePage/Cliente.jsx';
import AddCliente from './pages/ClientePage/AddCliente.jsx';
import UpdateCliente from './pages/ClientePage/UpdateCliente.jsx';
import Proveedor from './pages/ProveedorPage/Proveedor.jsx'
import AddProveedor from './pages/ProveedorPage/AddProveedor.jsx';
import UpdateProveedor from './pages/ProveedorPage/UpdateProveedor.jsx';
import AddProveedorLote from './pages/ProveedorLote/AddProveedorLote.jsx';
import Oferta from './pages/OfertaPage/Oferta.jsx';
import AddOferta from './pages/OfertaPage/AddOferta.jsx';
import UpdateOferta from './pages/OfertaPage/UpdateOferta.jsx';
import App from './App.jsx';
import Home from './pages/Homepage/home.jsx';
import Login from './routes/Login.jsx';
import Signup from './routes/Signup.jsx';
import Client from './Client.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import Unauthorized from './routes/Rutanoautorizada.jsx';
import { AuthProvider } from './Auth/AuthProvider.jsx';
import ProductoCliente from './pages/ProductoCliente/ProductoCliente.jsx';
import Factura from './pages/FacturaPage/Factura.jsx';
import AddProductoOferta from './pages/OfertaPage/AddProductoOferta.jsx';
import AddCompra from './pages/CompraPage/AddCompra.jsx';
import UpdateCompra from './pages/CompraPage/UpdateCompra.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
  {
    path: '/client',
    element: <ProtectedRoute requiredRole={0} />,
    children: [
      {
        element: <Client />,
        children: [
          {
            index: true,
            element: <Home />
          },
          {
            path: 'Catalogo',
            element: <ProductoCliente />
          }
        ]
      }
    ]
  },
  {
    path: '/App',
    element: <ProtectedRoute requiredRole={1} />,
    children: [
      {
        element: <App />, // Aquí empieza a aparecer el Navbar y el Footer
        children: [

          {
            index: true, // /app
            element: <Home />,
          },
          {
            path: 'producto', // /app/info
            element: <Producto />,
          },
          {
            path: 'AgregarProducto',
            element: <AddProducto />
          },
          {
            path: 'ActualizarProducto/:id',
            element: < UpdateProducto />
          },
          {
            path: 'lote',
            element: < Lote />
          },
          {
            path: 'AgregarLote',
            element: <AddLote />
          },
          {
            path: 'ActualizarLote/:id',
            element: <UpdateLote />
          },
          {
            path: 'Cliente',
            element: <Cliente />
          },
          {
            path: 'AgregarCliente',
            element: <AddCliente />
          },
          {
            path: 'ActualizarCliente/:id',
            element: <UpdateCliente />
          },
          {
            path: 'Factura',
            element: <Factura />
          },
          {
            path: 'Proveedor',
            element: <Proveedor />
          },
          {
            path: 'AgregarProveedor',
            element: <AddProveedor />
          },
          {
            path: 'ActualizarProveedor/:id',
            element: <UpdateProveedor />
          },
          {
            path: 'Proveedorlote',
            element: <AddProveedorLote />
          },
          {
            path: 'oferta',
            element: <Oferta />
          },
          {
            path: 'AgregarOferta',
            element: <AddOferta />
          },
          {
            path: 'ActualizarOferta/:id',
            element: <UpdateOferta />
          },
          {
            path: 'AgregarProductoOferta',
            element: <AddProductoOferta />
          },
          {
            path: 'AgregarCompra',
            element: <AddCompra />
          },
          {
            path: 'ActualizarCompra/:id',
            element: <UpdateCompra />
          },
        ],
      },
    ],
  },

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
