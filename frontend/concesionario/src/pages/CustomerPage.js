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
import CustomerListToolbar from "../sections/@dashboard/customer/CustomerListToolbar";
import CustomerListHead from "../sections/@dashboard/customer/CustomerListHead";
// mock
import USERLIST from '../_mock/user';
import CustomerForm from "../sections/@dashboard/customer/CustomerForm";
import CustomerContext from "../hooks/customer/CustomerContext";

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
    getCustomers,
    getCustomer,
    getCustomerError,
    order,
    orderBy,
    setOrder,
    setOrderBy,
    selected,
    setSelected,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    filterName,
    setFilterName,
    filteredCustomers,
    emptyRows,
    isNotFound,
    openSnackbar,
    setOpenSnackbar,
    openForm,
    setOpenForm,
    edit,
    customers,
    setCustomers} = useContext(CustomerContext);

  // useEffect(() => {
  //       getCustomers();
  //   }, []);

  useEffect(() => {
    setCustomers(customers);
  }, [customers]);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  }

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  }

  const handleOpenForm = (event, id) => {
    getCustomerError();
    getCustomer(id);
    setOpenForm(true)
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

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

        <Card>
          <CustomerListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 1000 }}>
              <Table>
                <CustomerListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={USERLIST.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                />
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

                            <IconButton color="error">
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
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {edit? 'Cliente actualizado correctamente' : 'Cliente guardado correctamente'}
        </Alert>
      </Snackbar>
    </>
  );
}
