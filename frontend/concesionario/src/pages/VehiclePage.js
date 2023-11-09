import { Helmet } from 'react-helmet-async';
import React, {useContext, useEffect} from 'react';
import {useTranslation} from "react-i18next";
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
    TablePagination, Box, Snackbar,
} from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import SellIcon from '@mui/icons-material/Sell';
// components
import Alert from '@mui/material/Alert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import {ListHead, ListToolbar} from "../sections/@dashboard/list";
import VehicleForm from "../sections/@dashboard/vehicle/VehicleForm";
import VehicleDelete from "../sections/@dashboard/vehicle/VehicleDelete";
// context
import VehicleContext from "../hooks/vehicle/VehicleContext";
import Label from "../components/label";

// ----------------------------------------------------------------------

export default function VehiclePage() {

    const {
        vehicles,
        openSnackbar,
        messageSnackbar,
        typeSnackbar,
        getVehicles,
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
        filteredVehicles,
        emptyRows,
        isNotFound} = useContext(VehicleContext);

    useEffect(() => {
         getVehicles();
    }, []);

    const { t } = useTranslation("lang");

    return (
        <>
            <Helmet>
                <title>{t('vehiculos.encabezado.tituloPlural')}</title>
            </Helmet>

            <Box sx={{margin: 2}}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                    <Typography variant="h4" gutterBottom>
                        {t('vehiculos.encabezado.tituloPlural')}
                    </Typography>
                    <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={(event)=> handleOpenForm(event, null)}>
                        {t('vehiculos.encabezado.tituloSingular')}
                    </Button>
                </Stack>

                <VehicleForm />

                <VehicleDelete />

                <Card>
                    <ListToolbar context={VehicleContext} name={t('vehiculos.encabezado.tituloSingular')}/>
                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 1000 }}>
                            <Table>
                                <ListHead context={VehicleContext} name={'vehiculos'}/>
                                <TableBody>
                                    {filteredVehicles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        const { vin, nombreModelo, nombreSucursal, nombreColor, disponibleVenta} = row;
                                        const selectedVehicle = selected.indexOf(vin) !== -1;

                                        return (
                                            <TableRow hover key={vin} tabIndex={-1} role="checkbox" selected={selectedVehicle}>
                                                <TableCell padding="checkbox">
                                                    <Checkbox checked={selectedVehicle} onChange={(event) => handleClick(event, vin)} />
                                                </TableCell>

                                                <TableCell align="left">{vin}</TableCell>

                                                <TableCell align="left">{nombreModelo}</TableCell>

                                                <TableCell align="left">{nombreSucursal}</TableCell>

                                                <TableCell align="left">{nombreColor}</TableCell>

                                                <TableCell align="left"><Label startIcon={disponibleVenta ? <InventoryIcon /> : <SellIcon/> } color={disponibleVenta ? 'success' : 'error'}>{disponibleVenta ? t('vehiculos.disponible.enStock') : t('vehiculos.disponible.vendido')}</Label></TableCell>

                                                <TableCell align="center" width={"5%"}>
                                                    <div style={{ display: 'flex' }}>
                                                        <IconButton disabled={!disponibleVenta} color="inherit" onClick={(event)=>handleOpenForm(event, vin)}>
                                                            <EditIcon />
                                                        </IconButton>

                                                        <IconButton disabled={!disponibleVenta} color="error" onClick={(event)=> handleOpenDelete(event, vin)}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </div>
                                                </TableCell>

                                            </TableRow>
                                        );
                                    })}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={5} />
                                        </TableRow>
                                    )}
                                </TableBody>

                                {isNotFound && (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="center" colSpan={5} sx={{ py: 3 }}>
                                                <Paper
                                                    sx={{
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    <Typography variant="h6" paragraph>
                                                        {t('general.dataTable.noEncontrado')}
                                                    </Typography>

                                                    <Typography variant="body2">
                                                        {t('general.dataTable.noResultados')} &nbsp;
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
                        count={vehicles.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelRowsPerPage = {t('general.dataTable.filasPorPagina')}
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
