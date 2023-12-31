import { Helmet } from 'react-helmet-async';
import React, {useContext, useEffect} from 'react';
import {useTranslation} from "react-i18next";
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
    TablePagination, Box, Snackbar
} from '@mui/material';
import Alert from '@mui/material/Alert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import {ListHead, ListToolbar} from "../sections/@dashboard/list";
import EmployeeForm from "../sections/@dashboard/employee/EmployeeForm";
import EmployeeDelete from "../sections/@dashboard/employee/EmployeeDelete";
import EmployeeContext from "../hooks/employee/EmployeeContext";
import {fCurrency} from "../utils/formatNumber";

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
                    <Button sx={{textTransform: "none"}} id={'agregar-empleado'} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={(event)=> handleOpenForm(event, null)}>
                        {t('empleados.encabezado.tituloSingular')}
                    </Button>
                </Stack>

                <EmployeeForm />

                <EmployeeDelete />

                <Card>
                    <ListToolbar context={EmployeeContext} name={t('empleados.encabezado.tituloSingular')} title={'empleados'}/>
                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 1000 }}>
                            <Table>
                                <ListHead context={EmployeeContext} name={'empleados'}/>
                                <TableBody>
                                    {filteredEmployees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        const {cedula, primerNombre, primerApellido, correo, telefono, celular, salario, cargo} = row;
                                        const nombre = `${primerNombre} ${primerApellido}`;
                                        const selectedUser = selected.indexOf(nombre) !== -1;

                                        return (
                                            <TableRow hover key={cedula} tabIndex={-1} role="checkbox" selected={selectedUser}>
                                                <TableCell padding="checkbox">
                                                    <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, nombre)} />
                                                </TableCell>

                                                <TableCell align="left">{cedula}</TableCell>

                                                <TableCell align="left">{nombre}</TableCell>

                                                <TableCell align="left">{correo}</TableCell>

                                                <TableCell align="left">{telefono}</TableCell>

                                                <TableCell align="left">{celular}</TableCell>

                                                <TableCell align="left">$ {fCurrency(salario)}</TableCell>

                                                <TableCell align="left">{t(`cargos.${cargo}`)}</TableCell>

                                                <TableCell align="center" width={"5%"}>
                                                    <div style={{ display: 'flex' }}>
                                                        <IconButton id={`editar-empleado-${cedula}`}  color="inherit" onClick={(event)=>handleOpenForm(event, cedula)}>
                                                            <EditIcon />
                                                        </IconButton>

                                                        <IconButton id={`eliminar-empleado-${cedula}`}  color="error" onClick={(event)=> handleOpenDelete(event, cedula)}>
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
