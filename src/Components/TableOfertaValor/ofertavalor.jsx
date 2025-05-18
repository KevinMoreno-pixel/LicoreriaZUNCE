import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LensIcon from '@mui/icons-material/Lens';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

const Tableofertavalor = ({ ofertica, onEdit, onDelete }) => {
    const columns = [
        { field: 'id', headerName: 'id', width: 50 },
        { field: 'valor', headerName: 'Valor', width: 100 },
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

    const rows = ofertica.map((o, index) => ({
        id: `${o.id ?? ''}`,
        valor: `${o.valor*100 ?? ''} %`,
        estado: `${o.estado ?? ''}`
    }));

    return (
        <div style={{ height: '100%', width: 'fit-content' }}>
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


export default Tableofertavalor;