import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LensIcon from '@mui/icons-material/Lens';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

const TableOferta = ({ ofertas, onEdit, onDelete }) => {
    const columns = [
        { field: 'id', headerName: 'id', width: 90 },
        { field: 'producto', headerName: 'Producto', width: 230 },
        { field: 'descuento', headerName: 'Descuento', width: 90 },
        {
            field: 'precioviejo',
            headerName: 'Precio anterior',
            width: 120,
            renderCell: (params) => (
                <span style={{ color: 'red' }}>
                    {params.value}
                </span>
            ),
        },
        {
            field: 'precionuevo',
            headerName: 'Precio nuevo',
            width: 120,
            renderCell: (params) => (
                <span style={{ color: 'greenyellow' }}>
                    {params.value}
                </span>
            ),
        },
        { field: 'inicio', headerName: 'Fecha inicio', width: 120 },
        { field: 'fin', headerName: 'Fecha fin', width: 120 },
        {
            field: 'estado',
            headerName: 'Estado',
            width: 130,
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

    const rows = ofertas.map((o, index) => ({
        id: `${o.idproducto}-${o.idoferta}`,
        producto: `${o.producto ?? ''}`,
        descuento: `${o.descuento * 100 ?? ''} %`,
        precioviejo: `${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(o.precioviejo)}`,
        precionuevo: `${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(o.precionuevo)}`,
        inicio: `${new Date(o.inicio).toLocaleDateString()}`,
        fin: `${new Date(o.fin).toLocaleDateString()}`,
        estado: `${o.estado ?? ''}`
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


export default TableOferta;