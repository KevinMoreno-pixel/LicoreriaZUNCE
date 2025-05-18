import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LensIcon from '@mui/icons-material/Lens';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

const TableProveedor = ({ proveedor, onEdit, onDelete }) => {
    const columns = [
        { field: 'id', headerName: 'id', width: 10 },
        { field: 'empresa', headerName: 'Empresa', width: 230 },
        { field: 'direccion', headerName: 'Dirección', width: 250 },
        { field: 'contacto', headerName: 'Contacto', width: 210 },
        { field: 'nit', headerName: 'nit', width: 110 },
        { field: 'tipo', headerName: 'Tipo', width: 160 },
        { field: 'lotes', headerName: 'Lotes', width: 250},
        {
            field: 'estado',
            headerName: 'Estado',
            width: 70,
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
            width: 100,
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

    const rows = proveedor.map((p, index) => ({
        id: `${p.id}`,
        empresa: `${p.empresa}`,
        direccion: `${p.numero}, ${p.calle}, ${p.barrio ?? ''}`,
        contacto: `${p.nombre} ${p.apellido}, ${p.celular}`,
        nit: `${p.nit}`,
        tipo: `${p.tipo}`,
        lotes: `${p.Lotes ?? ''}`,
        estado: `${p.estado}`

    }));

    return (
        <div style={{ height: '100%', width: '100%' }}>
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


export default TableProveedor;