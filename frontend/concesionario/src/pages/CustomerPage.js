import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import React, { useState } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination, Box, Snackbar,
} from '@mui/material';
// components
import {Alert} from "@mui/lab";
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/customer';
// mock
import USERLIST from '../_mock/user';
import CustomerForm from "../sections/@dashboard/customer/CustomerForm";

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

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => {
      const nombre = (`${_user.primerNombre} ${  _user.primerApellido}`).toLowerCase();
      const queryLowercase = query.toLowerCase();
      return nombre.indexOf(queryLowercase) !== -1;});
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function CustomerPage() {

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [openMenu, setOpenMenu] = useState(null);

  const [openForm, setOpenForm] = useState(false);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [selectedClient, setSelectedClient] = useState(null);

  const [edit, setEdit] = useState(null);

  const handleActiveEdit = () => {
    setEdit(true)
  };

  const handleDesactiveEdit = () => {
    if(edit !== null)
    {
      setEdit(null)
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  }

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  }

  const handleOpenForm = (event) => {
    handleCloseMenu();
    setOpenForm(true)
  };

  const handleCloseForm = () => {
    handleDesactiveEdit();
    setOpenForm(false);
  };

  const handleOpenMenu = (event, rowData, name) => {
    handleActiveEdit();
    setSelectedClient(rowData);
    setOpenMenu(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenu(false);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.nombre);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
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

  const handleDeleteRow = () => {
    const nombre = (`${selectedClient.row.primerNombre} ${selectedClient.row.primerApellido}`).toLowerCase();
    setFilterName(nombre);
    handleCloseMenu();
    handleDesactiveEdit();
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

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

        <CustomerForm open={openForm} onClose={handleCloseForm} initialData={selectedClient} edit={edit} onSuccess={handleOpenSnackbar}/>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 1000 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
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
                          <IconButton size="large" color="inherit" onClick={(event) => handleOpenMenu(event, {row})}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
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

      <Popover
        open={Boolean(openMenu)}
        anchorEl={openMenu}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick={handleOpenForm}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }}/>
          Editar
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }} onClick={handleDeleteRow}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Eliminar
        </MenuItem>
      </Popover>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          El cliente se ha guardado correctamente
        </Alert>
      </Snackbar>
    </>
  );
}
