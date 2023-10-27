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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {Alert} from "@mui/lab";
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import {ListHead, ListToolbar} from "../sections/@dashboard/list";
import CustomerForm from "../sections/@dashboard/customer/CustomerForm";
import CustomerDelete from "../sections/@dashboard/customer/CustomerDelete";
// mock
import CustomerContext from "../hooks/customer/CustomerContext";
import EmployeeContext from "../hooks/employee/EmployeeContext";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'cedula', label: 'Cedula', alignRight: false },
  { id: 'nombre', label: 'Nombre', alignRight: false },
  { id: 'correo', label: 'Correo', alignRight: false },
  { id: 'telefono', label: 'Telefono', alignRight: false },
  { id: 'celular', label: 'Celular', alignRight: false },
  { id: 'direccion', label: 'Direccion', alignRight: false },
  { id: 'ciudad', label: 'Ciudad', alignRight: false },
  { id: 'fechaNacimiento', label: 'Fecha Nacimiento', alignRight: false },
  { id: 'genero', label: 'Genero', alignRight: false },
  { id: '' },
];

export default function CustomerPage() {

  const {
    customers,
    openSnackbar,
    messageSnackbar,
    typeSnackbar,
    getCustomers,
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
    filteredCustomers,
    emptyRows,
    isNotFound} = useContext(CustomerContext);

  // useEffect(() => {
  //       getCustomers();
  //   }, []);

  useEffect(() => {
    getCustomers();
  }, [customers]);

  return (
    <>
      <Helmet>
        <title>Clientes</title>
      </Helmet>

      <Box sx={{margin: 2}}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h4" gutterBottom>
            Clientes
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenForm}>
            Cliente
          </Button>
        </Stack>

        <CustomerForm open={openForm} onClose={handleCloseForm} onSuccess={handleOpenSnackbar}/>

        <CustomerDelete open={openDelete} onClose={handleCloseDelete} />

        <Card>
          <ListToolbar context={CustomerContext} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 1000 }}>
              <Table>
                <ListHead context={CustomerContext} name={"cliente"} />
                <TableBody>
                  {filteredCustomers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, cedula, primerNombre, segundoNombre, primerApellido, segundoApellido, correo, telefono, celular, ciudad, direccion, fechaNacimiento, genero, clave} = row;
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

                        <TableCell align="left">{fechaNacimiento}</TableCell>

                        <TableCell align="left">{genero}</TableCell>

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
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
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
