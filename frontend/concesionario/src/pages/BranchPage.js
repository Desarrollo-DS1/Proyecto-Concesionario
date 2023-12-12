import { Helmet } from 'react-helmet-async';
import React, {useContext, useEffect} from 'react';
// @mui
import {
    Stack,
    Button,
    Typography,
    Box, Grid, Card, Snackbar,
} from '@mui/material';
import {useTranslation} from "react-i18next";
import Alert from "@mui/material/Alert";
import BranchDelete from "../sections/@dashboard/branch/BranchDelete";
import Iconify from '../components/iconify';
import BranchContext from "../hooks/branch/BranchContext";
import BranchCard from '../components/card/BranchCard';
import BranchForm from "../sections/@dashboard/branch/BranchForm";



// ----------------------------------------------------------------------

const colorPalette = ['#ff9999', '#66b3ff', '#99ff99', '#ffcc99', '#c2c2f0', "#ffd700", "#4caf50", "#ff69b4"];

export default function BranchPage() {
    const {
        branches,
        openSnackbar,
        messageSnackbar,
        typeSnackbar,
        handleCloseSnackbar,
        getBranches,
        handleOpenForm} = useContext(BranchContext);

        const { t } = useTranslation("lang");

        useEffect(() => {
            getBranches();
        }, []);

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

                <Card>
                    <Box m={4}>
                        <Grid container spacing={1} justifyContent={"space-between"} alignItems={"center"} alignContent={"center"}>
                            {branches.map((branch) => (
                                <BranchCard
                                    key={branch.id}
                                    id={branch.id}
                                    name={branch.nombre}
                                    address={branch.direccion}
                                    city={branch.ciudad}
                                    phone={branch.telefono}
                                />
                            ))}
                        </Grid>
                    </Box>
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
