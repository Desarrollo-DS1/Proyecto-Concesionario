import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
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
// translations
import {useTranslation} from "react-i18next";
// components
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import {ListHead, ListToolbar} from "../sections/@dashboard/list";
//import BranchForm from "../sections/@dashboard/branch/BranchForm";
//import BranchDelete from "../sections/@dashboard/branch/BranchDelete";
import BranchContext from "../hooks/branch/BranchContext";
import AuthContext from "../hooks/auth/AuthContext";

// ----------------------------------------------------------------------

export default function BranchPage() {
    const {
        branches,
        openSnackbar,
        messageSnackbar,
        typeSnackbar,
        getBranches,
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
        filteredBranches,
        emptyRows,
        isNotFound,
        filterField} = useContext(BranchContext);

        const { t } = useTranslation("lang");

        useEffect(() => {
            getBranches();
        }, []);


        const SucursalCard = ({sucursal}) => {
            const {id, nombre, direccion, ciudad, telefono} = sucursal;

            return (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>

                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        <strong>{t('sucursales.label.nombre')}:</strong> {nombre}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        <strong>{t('sucursales.label.direccion')}:</strong> {direccion}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        <strong>{t('sucursales.label.ciudad')}:</strong> {ciudad}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        <strong>{t('sucursales.label.telefono')}:</strong> {telefono}
                        </Typography>

                    </CardContent>
                    </CardActionArea>
                    </Card>
                </Grid>
            );
        }

    return (
        <>
            <Helmet>
            <title>{t('sucursales.encabezado.tituloPlural')}</title>
            </Helmet>
    
            <Box sx={{margin: 2}}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                <Typography variant="h4" gutterBottom>
                {t('sucursales.encabezado.tituloPlural')}
                </Typography>
                <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={(event)=>handleOpenForm(event, null)}>
                {t('sucursales.encabezado.tituloSingular')}
                </Button>
            </Stack>

            <BranchForm />
            <BranchDelete />

            <Grid container spacing={3}>
