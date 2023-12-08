import { Helmet } from 'react-helmet-async';
import React, {useContext, useEffect} from 'react';
// @mui
import {
    Card,
    Table,
    Stack,
    Paper,
    Button,
    Checkbox,
    TableRow,
    TableBody,
    TableCell,
    Typography,
    IconButton,
    TableContainer,
    TablePagination, Box, Snackbar, List, ListItem, MenuItem, ListItemIcon,
} from '@mui/material';
// translations
import {useTranslation} from "react-i18next";
// components
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import {ListHead, ListToolbar} from "../sections/@dashboard/list";
import PriceForm from "../sections/@dashboard/price/PriceForm";
// import SaleDelete from "../sections/@dashboard/sale/SaleDelete";
// mock
import PriceContext from "../hooks/price/PriceContext";

// ----------------------------------------------------------------------

export default function SalePage() {

    const {
        prices,
        openSnackbar,
        messageSnackbar,
        typeSnackbar,
        getPrices,
        handleOpenForm,
        handleOpenDelete,
        handleCloseSnackbar,
        filterName,
        page,
        rowsPerPage,
        selected,
        handleClick,
        handleChangePage,
        handleChangeRowsPerPage,
        filteredPrices,
        emptyRows,
        isNotFound,
        filterField} = useContext(PriceContext);

    const { t } = useTranslation("lang");

    useEffect(() => {
        getPrices();
    }, []);

    return (
        <>
            <Helmet>
                <title>{t('cotizaciones.encabezado.tituloPlural')}</title>
            </Helmet>

            <Box sx={{margin: 2}}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                    <Typography variant="h4" gutterBottom>
                        {t('cotizaciones.encabezado.tituloPlural')}
                    </Typography>
                    <Button sx={{textTransform: "none"}} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={(event)=>handleOpenForm(event, null)}>
                        {t('cotizaciones.encabezado.tituloSingular')}
                    </Button>
                </Stack>

                <PriceForm/>

                <Card>
                    <ListToolbar context={PriceContext} name={t('cotizaciones.encabezado.tituloSingular')} title={"cotizaciones"}/>

                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 1000 }}>
                            <Table>
                                <ListHead context={PriceContext} name={"cotizaciones"} />
                                <TableBody>
                                    {filteredPrices.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        const {id, cedulaCliente, nombreCliente, cedulaVendedor, nombreVendedor, fechaCotizacion, valorCotizacion, modelos,cotizacionModelo} = row;
                                        const selectedSale = selected.indexOf(id) !== -1;


                                        return (
                                            <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedSale}>
                                                <TableCell padding="checkbox">
                                                    <Checkbox checked={selectedSale} onChange={(event) => handleClick(event, id)} />
                                                </TableCell>

                                                <TableCell align="left">{id}</TableCell>

                                                <TableCell align="left">{cedulaCliente}</TableCell>

                                                <TableCell align="left">{nombreCliente}</TableCell>

                                                <TableCell align="left">{cedulaVendedor}</TableCell>

                                                <TableCell align="left">{nombreVendedor}</TableCell>

                                                <TableCell align="left">{fechaCotizacion}</TableCell>

                                                <TableCell align="left">$ {valorCotizacion}</TableCell>

                                                <TableCell align="left">
                                                    <List sx={{ listStyleType: 'disc', paddingLeft: 1}}>
                                                        {cotizacionModelo.map((option) => (
                                                            <ListItem key={option.modelo} sx={{ display: 'list-item', paddingLeft: 0  }} dense>
                                                                {option.nombreVehiculo}
                                                            </ListItem>
                                                        ))}
                                                    </List>
                                                </TableCell>

                                                <TableCell align="center" width={"2%"}>
                                                    <div style={{ display: 'flex' }}>
                                                        <IconButton color="inherit" onClick={(event)=>handleOpenForm(event, id)}>
                                                            <EditIcon />
                                                        </IconButton>
                                                    </div>
                                                </TableCell>

                                            </TableRow>
                                        );
                                    })}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={10} />
                                        </TableRow>
                                    )}
                                </TableBody>

                                {isNotFound && (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="center" colSpan={10} sx={{ py: 3 }}>
                                                <Paper
                                                    sx={{
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    <Typography variant="h6" paragraph>
                                                        {t('general.dataTable.noEncontrado')}
                                                    </Typography>

                                                    <Typography variant="body2">
                                                        {t('general.dataTable.noResultados')}&nbsp;
                                                        <strong>&quot;{filterName}&quot;</strong>.
                                                        <br /> {t('general.dataTable.mensajeNoResultados')}
                                                    </Typography>
                                                </Paper>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                )}
                            </Table>
                        </TableContainer>
                    </Scrollbar>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={prices.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelRowsPerPage={t('general.dataTable.filasPorPagina')}
                    />
                </Card>
            </Box>

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={typeSnackbar} sx={{ width: '100%' }}>
                    {t(messageSnackbar)}
                </Alert>
            </Snackbar>

        </>
    );
}
