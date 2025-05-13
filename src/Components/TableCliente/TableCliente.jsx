import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LensIcon from '@mui/icons-material/Lens';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

const TableCliente = ({ clientes, onEdit, onDelete }) => {
    const columns = [
        { field: 'nombre', headerName: 'Nombre', width: 300 },
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

    const rows = clientes.map((c, index) => ({
        id: c.id,
        nombre: `${c.Nombre} ${c.Nombre2 ?? ''} ${c.Apellido} ${c.Apellido2}`,
        telefono: `${c.Cel1},  ${c.Cel2 ?? ''}`,
        factura: `${c.Factura ?? ''}`,
        total: `${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(c.Total ?? 0)}`,
        metodo: `${c.MetodoDePago ?? ''}`,
        estado: c.Estado

    }));

    return (
        <div style={{ height: 450, width: '100%' }}>
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


export default TableCliente;