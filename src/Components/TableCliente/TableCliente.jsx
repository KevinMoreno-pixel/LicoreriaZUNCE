import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import LensIcon from '@mui/icons-material/Lens';

const TableCliente = ({ clientes }) => {
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'nombre', headerName: 'Nombre', width: 170 },
        { field: 'apellido', headerName: 'Apellido', width: 170 },
        { field: 'telefono', headerName: 'Teléfonos', width: 200 },
        { field: 'factura', headerName: 'Factura', width: 70 },
        { field: 'total', headerName: 'Total', width: 170 },
        { field: 'metodo', headerName: 'Metodo de pago', width: 120 },


        {
            field: 'estado',
            headerName: 'Estado',
            width: 100,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => (
                <LensIcon
                    style={{
                        color: params.value === 'A' ? 'limegreen' : 'crimson',
                        fontSize: 16
                    }}
                />
            )
        }
    ];

    const rows = clientes.map((c) => ({
        id: c.id,
        nombre: `${c.Nombre} ${c.Nombre2 ?? ''}`,
        apellido: `${c.Apellido} ${c.Apellido2}`,
        telefono: `${c.Cel1},  ${c.Cel2 ?? ''}`,
        factura: `${c.Factura ?? ''}`,
        total: `${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(c.Total ?? 0)}`,
        metodo: `${c.MetodoDePago ?? ''}`,
        estado: c.Estado
    }));

    return (
        <div style={{ height: 400, width: '100vh', justifyContent: 'center', height: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
                checkboxSelection
                sx={{
                    color: 'white',
                    backgroundColor: 'rgba(0, 0, 0, 0.87)',
                    border: '1px solid rgba(255, 255, 255, 0.14)',
                    borderRadius: 2,
                    boxShadow: 4,

                    // Estilo para encabezado de columnas
                    '& .MuiDataGrid-columnHeaders': {
                        color: 'black',
                        fontWeight: 'bold',
                    },

                    // Estilo para filas
                    '& .MuiDataGrid-row': {
                        '&:hover': {
                            backgroundColor: '#2a2a2a',
                        }
                    },

                    // Selección de fila
                    '& .MuiDataGrid-row.Mui-selected': {
                        backgroundColor: '#424242',
                    },

                    // Checkbox
                    '& .MuiCheckbox-root': {
                        color: 'white',
                    },

                    // Scrollbar para dark mode
                    '& .MuiDataGrid-virtualScroller::-webkit-scrollbar': {
                        width: '8px',
                        height: '8px',
                    },
                    '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb': {
                        backgroundColor: '#555',
                        borderRadius: '4px',
                    },
                    '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-track': {
                        backgroundColor: '#222',
                    },
                }}
            />

        </div>
    );
};


export default TableCliente;