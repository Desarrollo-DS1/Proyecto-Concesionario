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
    TablePagination, Box, Snackbar, List, ListItem, Chip,
} from '@mui/material';
// components
import Alert from '@mui/material/Alert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import HomeRepairServiceRoundedIcon from '@mui/icons-material/HomeRepairServiceRounded';
import MiscellaneousServicesRoundedIcon from '@mui/icons-material/MiscellaneousServicesRounded';
import Scrollbar from '../components/scrollbar';
import Iconify from '../components/iconify';
import Label from "../components/label";
import LabelPlate from "../components/label-plate";
// sections
import {ListHead, ListToolbar} from "../sections/@dashboard/list";
import ServiceWorkOrderForm from "../sections/@dashboard/workOrder/ServiceWorkOrderForm";
import WorkOrderForm from "../sections/@dashboard/workOrder/WorkOrderForm";
// import WorkOrderDelete from "../sections/@dashboard/workOrder/WorkOrderDelete";
// context
import WorkOrderContext from "../hooks/workOrder/WorkOrderContext";
import AuthContext from "../hooks/auth/AuthContext";
import WorkOrderDelete from "../sections/@dashboard/workOrder/WorkOrderDelete";


// ----------------------------------------------------------------------

export default function WorkOrderPage() {

    const {
        workOrders,
        openSnackbar,
        messageSnackbar,
        typeSnackbar,
        getWorkOrders,
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
        filteredWorkOrders,
        emptyRows,
        isNotFound,
        handleOpenServiceForm} = useContext(WorkOrderContext);

    const {
        user} = useContext(AuthContext);

    useEffect(() => {
        getWorkOrders();
    }, []);

    const { t } = useTranslation("lang");

    return (
        <>
            <Helmet>
                <title>{t('ordenesTrabajo.encabezado.tituloPlural')}</title>
            </Helmet>

            <Box sx={{margin: 2}}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                    <Typography variant="h4" gutterBottom>
                        {t('ordenesTrabajo.encabezado.tituloPlural')}
                    </Typography>
                    <Button sx={{textTransform: "none"}} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={(event)=> handleOpenForm(event, null)}>
                        {t('ordenesTrabajo.encabezado.tituloSingular')}
                    </Button>
                </Stack>

                <WorkOrderForm/>

                <ServiceWorkOrderForm/>

                <WorkOrderDelete/>

                <Card>
                    <ListToolbar context={WorkOrderContext} name={t('ordenesTrabajo.encabezado.tituloSingular')} title={'ordenesTrabajo'}/>
                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 1000 }}>
                            <Table>
                                <ListHead context={WorkOrderContext} name={'ordenesTrabajo'}/>
                                <TableBody>
                                    {filteredWorkOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        const {id, cedulaCliente, nombreCliente, fechaInicio, fechaEsperada, modelo, placa, estado} = row;
                                        const selectedWorkOrder = selected.indexOf(id) !== -1;

                                        return (
                                            <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedWorkOrder}>
                                                <TableCell padding="checkbox">
                                                    <Checkbox checked={selectedWorkOrder} onChange={(event) => handleClick(event, id)} />
                                                </TableCell>

                                                <TableCell align="left">{id}</TableCell>

                                                <TableCell align="left">{cedulaCliente}</TableCell>

                                                <TableCell align="left">{nombreCliente}</TableCell>

                                                <TableCell align="left">{fechaInicio}</TableCell>

                                                <TableCell align="left">{fechaEsperada}</TableCell>

                                                <TableCell align="left">{modelo}</TableCell>

                                                <TableCell align="left"><LabelPlate plate={placa} /></TableCell>

                                                <TableCell align="left">
                                                    <Label
                                                        startIcon={estado ? <DoneRoundedIcon /> : <MiscellaneousServicesRoundedIcon/> }
                                                        color={estado ? 'success' : 'warning'}
                                                    >
                                                        {estado ? t('ordenesTrabajo.estado.entregado') : t('ordenesTrabajo.estado.taller')}
                                                    </Label>
                                                </TableCell>

                                                <TableCell align="center" width={"5%"}>
                                                    <div style={{ display: 'flex' }}>
                                                        <IconButton color="inherit" onClick={(event)=>handleOpenForm(event, id)}>
                                                            <EditIcon />
                                                        </IconButton>
                                                        <IconButton disabled={!estado} color="error" onClick={(event)=> handleOpenDelete(event, id)}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                        <IconButton color="primary" onClick={(event)=>handleOpenServiceForm(event, id, modelo)}>
                                                            <HomeRepairServiceRoundedIcon />
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
                        count={workOrders.length}
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
