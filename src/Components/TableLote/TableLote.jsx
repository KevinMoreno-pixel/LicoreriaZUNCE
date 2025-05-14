import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LensIcon from '@mui/icons-material/Lens';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

const TableLote = ({ lotes, onEdit, onDelete }) => {
    const columns = [
        {field: 'id', headerName: 'id'},
        { field: 'Lote', headerName: 'Lote', width: 200 },
        { field: 'Producto', headerName: 'Producto', width: 200 },
        { field: 'Marca', headerName: 'Marca', width: 150 },
        { field: 'Precio', headerName: 'Precio', width: 110 },
        { field: 'Porcentaje', headerName: 'Porcentaje Alcohol', width: 90 },
        { field: 'Presentacion', headerName: 'Presentación', width: 70 },
        { field: 'Cantidad', headerName: 'Stock', width: 70 },
        { field: 'Caducidad', headerName: 'Caducidad', width: 90 },
        {
            field: 'Estado',
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
        },
        {
            field: 'acciones',
            headerName: 'Acciones',
            width: 120,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <>
                    <IconButton
                        onClick={() => onEdit(params.row)} color="primary">
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => onDelete(params.row)} color="error">
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        }
    ];

    const rows = lotes.map((l, index) => ({
        id: l.id,
        Lote: `${l.Lote ?? ''}`,
        Producto: `${l.Producto ?? ''}`,
        Marca: `${l.Marca ?? ''}`,
        Precio: `${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(l.Precio ?? 0)}`,
        Porcentaje: `${l.Porcentaje ?? ''}`,
        Presentacion: `${l.Presentacion ?? ''}`,
        Cantidad: `${l.Cantidad ?? ''}`,
        Caducidad: `${new Date(l.Caducidad).toLocaleDateString()}`,
        Estado: `${l.Estado ?? ''}`
    }));

    return (
        <div style={{ height: '100vh', width: '100vh' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
                sx={{
                    color: 'white',
                    backgroundColor: '#121212',
                    border: '1px solid rgba(255, 255, 255, 0.14)',
                    borderRadius: 2,
                    boxShadow: 4,

                    // Encabezado
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: '#1f1f1f',
                        color: 'black',
                        fontWeight: 'bold',
                    },

                    // Filas
                    '& .MuiDataGrid-row': {
                        '&:hover': {
                            backgroundColor: '#2a2a2a',
                        }
                    },

                    // Selección
                    '& .MuiDataGrid-row.Mui-selected': {
                        backgroundColor: '#333',
                    },

                    // Acciones
                    '& .MuiIconButton-root': {
                        color: '#fff',
                    },

                    // Scrollbar
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


export default TableLote;