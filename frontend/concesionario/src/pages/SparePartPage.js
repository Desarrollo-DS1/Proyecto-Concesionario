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
    TablePagination, Box, Snackbar, List, ListItem,
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
// import SparePartForm from "../sections/@dashboard/vehicle/VehicleForm";
// import SparePartDelete from "../sections/@dashboard/vehicle/VehicleDelete";
// context
import SparePartContext from "../hooks/sparePart/SparePartContext";
import Label from "../components/label";
import AuthContext from "../hooks/auth/AuthContext";

// ----------------------------------------------------------------------

export default function SparePartPage() {

    const {
        spareParts,
        openSnackbar,
        messageSnackbar,
        typeSnackbar,
        getSpareParts,
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
        filteredSpareParts,
        emptyRows,
        isNotFound} = useContext(SparePartContext);

    const {
        user} = useContext(AuthContext);

    useEffect(() => {
        getSpareParts();
    }, []);

    const { t } = useTranslation("lang");

    return (
        <>
            <Helmet>
                <title>{t('repuestos.encabezado.tituloPlural')}</title>
            </Helmet>

            <Box sx={{margin: 2}}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                    <Typography variant="h4" gutterBottom>
                        {t('repuestos.encabezado.tituloPlural')}
                    </Typography>
                    {user.tipoUsuario !== "Vendedor" &&
                        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={(event)=> handleOpenForm(event, null)}>
                            {t('repuestos.encabezado.tituloSingular')}
                        </Button>}
                </Stack>

                <Card>
                    <ListToolbar context={SparePartContext} name={t('repuestos.encabezado.tituloSingular')} title={'repuestos'}/>
                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 1000 }}>
                            <Table>
                                <ListHead context={SparePartContext} name={'repuestos'}/>
                                <TableBody>
                                    {filteredSpareParts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        const { id, nombre, precio, modelos} = row;
                                        const selectedSparePart = selected.indexOf(id) !== -1;

                                        return (
                                            <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedSparePart}>
                                                <TableCell padding="checkbox">
                                                    <Checkbox checked={selectedSparePart} onChange={(event) => handleClick(event, id)} />
                                                </TableCell>

                                                <TableCell align="left">{id}</TableCell>

                                                <TableCell align="left">{nombre}</TableCell>

                                                <TableCell align="left">$ {precio}</TableCell>

                                                <TableCell align="left">
                                                    <List sx={{ listStyleType: 'disc', paddingLeft: 1}}>
                                                        {modelos.map((option) => (
                                                            <ListItem key={option.id} sx={{ display: 'list-item', paddingLeft: 0  }} dense>
                                                                {option.nombre}
                                                            </ListItem>
                                                        ))}
                                                    </List>
                                                </TableCell>

                                                <TableCell align="center" width={"5%"}>
                                                    <div style={{ display: 'flex' }}>

                                                        {user.tipoUsuario !== "Jefe de Taller" &&
                                                            <IconButton color="inherit" onClick={(event)=>handleOpenForm(event, id)}>
                                                                <EditIcon />
                                                            </IconButton>}

                                                        {user.tipoUsuario !== "Jefe de Taller" &&
                                                            <IconButton color="error" onClick={(event)=> handleOpenDelete(event, id)}>
                                                                <DeleteIcon />
                                                            </IconButton>}
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
                        count={spareParts.length}
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
