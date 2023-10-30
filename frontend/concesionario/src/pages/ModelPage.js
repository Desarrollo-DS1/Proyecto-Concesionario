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
import ModelForm from "../sections/@dashboard/model/ModelForm";
import ModelDelete from "../sections/@dashboard/model/ModelDelete";
// context
import ModelContext from "../hooks/model/ModelContext";




// ----------------------------------------------------------------------

export default function ModelPage() {

    const {
        models,
        openSnackbar,
        messageSnackbar,
        typeSnackbar,
        getModels,
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
        filteredModels,
        emptyRows,
        isNotFound} = useContext(ModelContext);

    useEffect(() => {
        getModels();
    }, [models, getModels]);

    // useEffect(() => {
    //     getBodyworks();
    // }, [bodyworks]);
    //
    // useEffect(() => {
    //     getFuels();
    // }, [fuels]);

    const { t } = useTranslation("lang");

    return (
        <>
            <Helmet>
                <title>{t('modelos.encabezado.tituloPlural')}</title>
            </Helmet>

            <Box sx={{margin: 2}}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                    <Typography variant="h4" gutterBottom>
                        {t('modelos.encabezado.tituloPlural')}
                    </Typography>
                    <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenForm}>
                        {t('modelos.encabezado.tituloSingular')}
                    </Button>
                </Stack>

                <ModelForm />

                <ModelDelete />

                <Card>
                    <ListToolbar context={ModelContext} name={t('modelos.encabezado.tituloSingular')}/>
                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 1000 }}>
                            <Table>
                                <ListHead context={ModelContext} name={'modelos'}/>
                                <TableBody>
                                    {filteredModels.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        const { id, nombre, año, carroceria, cilindraje, potencia, combustible, numeroPasajeros, precioBase} = row;
                                        const selectedUser = selected.indexOf(nombre) !== -1;

                                        return (
                                            <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                                                <TableCell padding="checkbox">
                                                    <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, nombre)} />
                                                </TableCell>

                                                <TableCell align="left">{nombre}</TableCell>

                                                <TableCell align="left">{año}</TableCell>

                                                <TableCell align="left">{carroceria}</TableCell>

                                                <TableCell align="left">{cilindraje}</TableCell>

                                                <TableCell align="left">{potencia}</TableCell>

                                                <TableCell align="left">{combustible}</TableCell>

                                                <TableCell align="left">{numeroPasajeros}</TableCell>

                                                <TableCell align="left">{precioBase}</TableCell>

                                                <TableCell align="right">
                                                    <div style={{ display: 'flex' }}>
                                                        <IconButton color="inherit" onClick={(event)=>handleOpenForm(event, id)}>
                                                            <EditIcon />
                                                        </IconButton>

                                                        <IconButton color="error" onClick={(event)=> handleOpenDelete(event, id)}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </div>
                                                </TableCell>

                                            </TableRow>
                                        );
                                    })}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={9} />
                                        </TableRow>
                                    )}
                                </TableBody>

                                {isNotFound && (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="center" colSpan={9} sx={{ py: 3 }}>
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
                        count={models.length}
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
