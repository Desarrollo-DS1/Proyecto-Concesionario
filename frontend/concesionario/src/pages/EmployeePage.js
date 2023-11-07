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
// components
import {Alert} from "@mui/lab";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import {ListHead, ListToolbar} from "../sections/@dashboard/list";
import EmployeeForm from "../sections/@dashboard/employee/EmployeeForm";
import EmployeeDelete from "../sections/@dashboard/employee/EmployeeDelete";
// context
import EmployeeContext from "../hooks/employee/EmployeeContext";

// ----------------------------------------------------------------------

export default function EmployeePage() {

    const {
        employees,
        openSnackbar,
        messageSnackbar,
        typeSnackbar,
        getEmployees,
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
        filteredEmployees,
        emptyRows,
        isNotFound} = useContext(EmployeeContext);

    useEffect(() => {
        getEmployees();
    }, []);

    // useEffect(() => {
    //     getBloodTypes();
    // }, [bloodTypes]);
    //
    // useEffect(() => {
    //     getEpss();
    // }, [epss]);
    //
    // useEffect(() => {
    //     getArls();
    // }, [arls]);
    //
    // useEffect(() => {
    //     getPositions();
    // }, [positions]);

    const { t } = useTranslation("lang");

    return (
        <>
            <Helmet>
                <title>{t('empleados.encabezado.tituloPlural')}</title>
            </Helmet>

            <Box sx={{margin: 2}}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                    <Typography variant="h4" gutterBottom>
                        {t('empleados.encabezado.tituloPlural')}
                    </Typography>
                    <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={(event)=> handleOpenForm(event, null)}>
                        {t('empleados.encabezado.tituloSingular')}
                    </Button>
                </Stack>

                <EmployeeForm />

                <EmployeeDelete />

                <Card>
                    <ListToolbar context={EmployeeContext} name={t('empleados.encabezado.tituloSingular')}/>
                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 1000 }}>
                            <Table>
                                <ListHead context={EmployeeContext} name={'empleados'}/>
                                <TableBody>
                                    {filteredEmployees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        const { id, cedula, primerNombre, primerApellido, correo, telefono, celular, ciudad, direccion, fechaIngreso, fechaRetiro, salario, cargo} = row;
                                        const nombre = `${primerNombre} ${primerApellido}`;
                                        const selectedUser = selected.indexOf(nombre) !== -1;

                                        return (
                                            <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                                                <TableCell padding="checkbox">
                                                    <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, nombre)} />
                                                </TableCell>

                                                <TableCell align="left">{cedula}</TableCell>

                                                <TableCell align="left">{nombre}</TableCell>

                                                <TableCell align="left">{correo}</TableCell>

                                                <TableCell align="left">{telefono}</TableCell>

                                                <TableCell align="left">{celular}</TableCell>

                                                <TableCell align="left">{direccion}</TableCell>

                                                <TableCell align="left">{ciudad}</TableCell>

                                                <TableCell align="left">{fechaIngreso}</TableCell>

                                                <TableCell align="left">{fechaRetiro}</TableCell>

                                                <TableCell align="left">{salario}</TableCell>

                                                <TableCell align="left">{cargo}</TableCell>

                                                <TableCell align="right">
                                                    <div style={{ display: 'flex' }}>
                                                        <IconButton color="inherit" onClick={(event)=>handleOpenForm(event, cedula)}>
                                                            <EditIcon />
                                                        </IconButton>

                                                        <IconButton color="error" onClick={(event)=> handleOpenDelete(event, cedula)}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </div>
                                                </TableCell>

                                            </TableRow>
                                        );
                                    })}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={12} />
                                        </TableRow>
                                    )}
                                </TableBody>

                                {isNotFound && (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="center" colSpan={12} sx={{ py: 3 }}>
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
                        count={employees.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelRowsPerPage = {t('general.dataTable.filasPorPagina')}
                    />
                </Card>
            </Box>

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={typeSnackbar} sx={{ width: '100%'}}>
                    {t(messageSnackbar)}
                </Alert>
            </Snackbar>
        </>
    );
}
