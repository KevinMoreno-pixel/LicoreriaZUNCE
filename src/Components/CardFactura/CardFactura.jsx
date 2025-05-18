import React from "react";
import {
    Card,
    CardContent,
    Typography,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Divider,
} from "@mui/material";

const CardFactura = ({ factura }) => {

    return (
        <Card sx={{ maxWidth: 800, margin: "auto", mt: 4, boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    Factura #{factura.id}
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="subtitle1">
                            <strong>Cliente:</strong> {factura.nombre} {factura.apellido}
                        </Typography>
                        <Typography variant="body2">Celular: {factura.celular}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="subtitle1">
                            <strong>Fecha:</strong> {new Date(factura.fecha).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2"> <strong>Metodo de pago:</strong> {factura.metodo}</Typography>
                    </Grid>
                </Grid>

                <TableContainer component={Paper} sx={{ mt: 3 }}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Producto</strong></TableCell>
                                <TableCell><strong>Cantidad</strong></TableCell>
                                <TableCell><strong>Valor</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {factura.detalles.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.producto}</TableCell>
                                    <TableCell>{item.cantidad}</TableCell>
                                    <TableCell>
                                        {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(item.valor)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                </TableContainer>

                <Divider sx={{ mt: 2, mb: 1 }} />
                <Typography variant="body1" align="left" mt={4}>
                    <strong>Subtotal:</strong>
                    {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(factura.sub)}

                </Typography>
                <Typography variant="body1" align="left">
                    <strong>Iva:</strong> {factura.imp * 100}%
                </Typography>
                <Typography variant="h5" align="right" mt={4}>
                    <strong>Total:</strong>
                    {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(factura.total)}

                </Typography>
            </CardContent>
        </Card>
    );
};

export default CardFactura;
