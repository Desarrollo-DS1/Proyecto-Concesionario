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
    TablePagination, Box, Snackbar,
} from '@mui/material';
// components
import {Alert} from "@mui/lab";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import EmployeeListToolbar from "../sections/@dashboard/employee/EmployeeListToolbar";
import EmployeeListHead from "../sections/@dashboard/employee/EmployeeListHead";
import EmployeeForm from "../sections/@dashboard/employee/EmployeeForm";
// import CustomerDelete from "../sections/@dashboard/customer/CustomerDelete";
// context
import EmployeeContext from "../hooks/employee/EmployeeContext";
import EmployeeDelete from "../sections/@dashboard/employee/EmployeeDelete";


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
        handleCloseDelete,
        handleCloseSnackbar,
        filterName,
        page,
        rowsPerPage,
        selected,
        handleClick,
        handleChangePage,
        handleChangeRowsPerPage,
        filteredCustomers,
        emptyRows,
        isNotFound} = useContext(EmployeeContext);

    useEffect(() => {
        getEmployees();
    }, [employees]);

    return (
        <>
            <Helmet>
                <title>Empleados</title>
            </Helmet>

            <Box sx={{margin: 2}}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                    <Typography variant="h4" gutterBottom>
                        Empleados
                    </Typography>
                    <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenForm}>
                        Empleado
                    </Button>
                </Stack>

                <EmployeeForm />

                <EmployeeDelete />

                <Card>
                    <EmployeeListToolbar />
                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 1000 }}>
                            <Table>
                                <EmployeeListHead />
                                <TableBody>
                                    {filteredCustomers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        const { id, cedula, primerNombre, segundoNombre, primerApellido, segundoApellido, correo, telefono, celular, ciudad, direccion, fechaNacimiento, genero, clave, fechaIngreso, fechaRetiro, salario, tipoSangre, eps, arl, cargo} = row;
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
                                            <TableCell colSpan={7} />
                                        </TableRow>
                                    )}
                                </TableBody>

                                {isNotFound && (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="center" colSpan={7} sx={{ py: 3 }}>
                                                <Paper
                                                    sx={{
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    <Typography variant="h6" paragraph>
                                                        No encontrado
                                                    </Typography>

                                                    <Typography variant="body2">
                                                        No hay resultados para &nbsp;
                                                        <strong>&quot;{filterName}&quot;</strong>.
                                                        <br /> Compruebe si hay errores tipográficos o utilizar palabras completas.
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
                        labelRowsPerPage = "Filas por página"
                    />
                </Card>
            </Box>

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={typeSnackbar} sx={{ width: '100%' }}>
                    {messageSnackbar}
                </Alert>
            </Snackbar>
        </>
    );
}
