import { Helmet } from 'react-helmet-async';
import React, {useContext, useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import {styled, useTheme} from "@mui/material/styles";
import {
    Box,
    Card, CardContent, Collapse,
    Divider, Grid, IconButton, lighten, LinearProgress, linearProgressClasses, List, ListItem, Snackbar,
    Stack,TablePagination,
    Typography
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import DirectionsCarFilledRoundedIcon from '@mui/icons-material/DirectionsCarFilledRounded';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import HourglassTopRoundedIcon from '@mui/icons-material/HourglassTopRounded';
import HourglassBottomRoundedIcon from '@mui/icons-material/HourglassBottomRounded';
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import HomeRepairServiceRoundedIcon from '@mui/icons-material/HomeRepairServiceRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import QueryBuilderRoundedIcon from '@mui/icons-material/QueryBuilderRounded';
import PlumbingIcon from '@mui/icons-material/Plumbing';
import Alert from "@mui/material/Alert";
import LabelPlate from "../components/label-plate";
import Scrollbar from "../components/scrollbar";
import CustomerOrderContext from "../hooks/customerOrder/CustomerOrderContext";

const chooseColor = (value, date, theme) => {
    if (value === 100) {
        return "#115923"
    }

    const date1 = new Date(date);

    const date2 = new Date();

    if (date2 > date1 && value < 100) {
        return "#BF1F2C"
    }

    return theme.palette.primary.main;
}

const calculateValue = (service) => {
    const total = service.length;
    let count = 0;
    service.forEach(el => {
        if (el.estado) {
            count += 1;
        }
    })

    return Math.round((count / total) * 100);
}

const BorderLinearProgress = styled(LinearProgress)(({ theme, value, colorchoose}) => ({
    height: 30,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundImage: `linear-gradient(45deg, ${colorchoose} 25%, ${lighten(colorchoose, 0.2)} 25%, ${lighten(colorchoose, 0.2)} 50%, ${colorchoose} 50%, ${colorchoose} 75%, ${lighten(colorchoose, 0.2)} 75%, ${lighten(colorchoose, 0.2)})`,
        transition: 'width 0.3s ease-out',
    },
    '&:hover': {
        [`& .${linearProgressClasses.bar}`]: {
            width: '102%',
        },}
}));

// ----------------------------------------------------------------------

export default function CustomerOrderPage() {

    const {filteredCustomerOrders,
        customerOrders,
        expandedCardId,
        handleExpandClick,
        getCustomerOrders,
        openSnackbar,
        messageSnackbar,
        typeSnackbar,
        handleCloseSnackbar,
        page,
        rowsPerPage,
        handleChangePage,
        handleChangeRowsPerPage} = useContext(CustomerOrderContext);

    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    const theme = useTheme();

    const { t } = useTranslation("lang");

    useEffect(() => {
        getCustomerOrders();
    }, []);

    return (
        <>
            <Helmet>
                <title>Ordenes Cliente</title>
            </Helmet>
            <Box sx={{margin: 2}}>

                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                    <Typography variant="h4" gutterBottom>
                        {t('ordenesCliente.encabezado.tituloPlural')}
                    </Typography>
                </Stack>
                {filteredCustomerOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, cedulaEmpleado, nombreEmpleado, fechaInicio, fechaEsperada, fechaFin, modelo, placa, estado, servicio, repuesto} = row;
                    const color = chooseColor(calculateValue(servicio), fechaEsperada, theme);
                    return (
                        <Box mb={4} key={id}>
                            <Card key={id} >
                                <Grid container>
                                    <Grid item xs={12} sm={4}>
                                        <Stack direction="column" alignItems="center" m={4}>
                                            <DirectionsCarFilledRoundedIcon sx={{ fontSize: 80 }} />
                                            <Typography variant="subtitle1" gutterBottom align={"center"}>
                                                {modelo}
                                            </Typography>
                                            <LabelPlate plate={placa} />
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} sm={8} pt={{ xs: 2, sm: 5 }}>
                                        <Stack sx={{ width: "90%" }}>
                                            <Stack
                                                direction={{ xs: 'column', sm: 'row' }} // Cambia la dirección a columna en pantallas pequeñas
                                                alignItems={{ xs: 'center', sm: 'flex-start' }} // Centra en pantallas pequeñas
                                                justifyContent="space-between"
                                            >
                                                <Stack alignItems="center" direction="row" mb={{ xs: 4, sm: 0 }}>
                                                    <HourglassTopRoundedIcon sx={{ fontSize: { xs: 40, sm: 50 } }} color={"primary"} />
                                                    <Stack alignItems="center" justifyContent="space-between">
                                                        <Typography variant="subtitle1">
                                                            {t('ordenesCliente.label.fechaInicio')}
                                                        </Typography>
                                                        <Typography variant="subtitle2" fontWeight={1}>
                                                            {fechaInicio}
                                                        </Typography>
                                                    </Stack>
                                                </Stack>
                                                <Stack alignItems="center" direction="row" mb={{ xs: 4, sm: 0 }}>
                                                    <HourglassBottomRoundedIcon sx={{ fontSize: { xs: 40, sm: 50 } }} color={"warning"} />
                                                    <Stack alignItems="center" justifyContent="space-between">
                                                        <Typography variant="subtitle1">
                                                            {t('ordenesCliente.label.fechaEsperada')}
                                                        </Typography>
                                                        <Typography variant="subtitle2" fontWeight={1}>
                                                            {fechaEsperada}
                                                        </Typography>
                                                    </Stack>
                                                </Stack>
                                                <Stack alignItems="center" direction="row" mb={{ xs: 4, sm: 0 }}>
                                                    <EventAvailableRoundedIcon sx={{ fontSize: { xs: 40, sm: 50 }, color: "#115923" }} />
                                                    <Stack alignItems="center" justifyContent="space-between">
                                                        <Typography variant="subtitle1">
                                                            {t('ordenesCliente.label.fechaFin')}
                                                        </Typography>
                                                        <Typography variant="subtitle2" fontWeight={1}>
                                                            {fechaFin}
                                                        </Typography>
                                                    </Stack>
                                                </Stack>
                                            </Stack>
                                            <Stack mt={{ xs: 3, sm: 5 }} direction={{ xs: 'column', sm: 'row' }}>
                                                <BorderLinearProgress variant="determinate" value={calculateValue(servicio)} sx={{ width: { xs: '100%', sm: '90%' }, mr: { xs: 0, sm: 3 }, ml: { xs: 2, sm: 0 }}} colorchoose={color} />
                                                <Typography variant="subtitle1" align={'center'} mb={{ xs: 1, sm: 0 }} mt={{ xs: 1, sm: 0 }} ml={{ xs: 2, sm: 0 }}>
                                                    {calculateValue(servicio)} %
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                </Grid>
                                <Divider />

                                <Box m={2}>
                                    <Card>
                                        <CardContent sx={{backgroundColor: theme.palette.grey[200], height:50}} >
                                            <Stack direction="row" alignItems="center" justifyContent="space-between" height={1}>
                                                <Stack direction="row" alignItems="center">
                                                    <FormatListBulletedRoundedIcon sx={{ fontSize: 20 }} />
                                                    <Typography variant="subtitle1" ml={1}>
                                                        {t('ordenesCliente.encabezado.detalles')}
                                                    </Typography>
                                                </Stack>

                                                <IconButton
                                                    onClick={()=>handleExpandClick(id)}
                                                    aria-expanded={expandedCardId === id}
                                                >
                                                    {expandedCardId === id ? <ExpandLessRoundedIcon/> : <ExpandMoreRoundedIcon />}
                                                </IconButton>
                                            </Stack>
                                        </CardContent>
                                        <Collapse in={expandedCardId === id} timeout="auto" unmountOnExit>
                                            <Scrollbar sx={{ maxHeight: 500 }}>
                                                <CardContent >
                                                    <Grid container spacing={5}>
                                                        <Grid item sm={6} xs={12} >
                                                            <Stack direction="row" alignItems="center">
                                                                <HomeRepairServiceRoundedIcon sx={{ fontSize: 20 }} />
                                                                <Typography variant="subtitle1" ml={1}>
                                                                    {t('ordenesCliente.encabezado.servicios')}
                                                                </Typography>
                                                            </Stack>

                                                            <List sx={{ listStyleType: 'disc', paddingLeft: 2}}>
                                                                {servicio.map((option) => (
                                                                    <ListItem key={option.id} sx={{ display: 'list-item', paddingLeft: 0  }} dense>
                                                                        <Stack direction={"row"} alignItems={"center"} justifyContent="space-between">
                                                                            <Typography variant={"body2"} fontWeight={1}>
                                                                                {t(`servicios.${option.nombreServicio}`)}
                                                                            </Typography>
                                                                            {option.estado ? <DoneRoundedIcon sx={{color: "#115923"}} fontSize={"small"}/> : <QueryBuilderRoundedIcon sx={{color: "#BF1F2C"}} fontSize={"small"}/>}
                                                                        </Stack>
                                                                    </ListItem>
                                                                ))}
                                                            </List>
                                                        </Grid>

                                                        {!isSmallScreen && <Divider orientation="vertical" flexItem sx={{ mr: "-1px", mt: 5 }} />}
                                                        <Grid item sm={6} xs={12} >
                                                            <Stack direction="row" alignItems="center">
                                                                <PlumbingIcon sx={{ fontSize: 20 }} />
                                                                <Typography variant="subtitle1" ml={1}>
                                                                    {t('ordenesCliente.encabezado.repuestos')}
                                                                </Typography>
                                                            </Stack>
                                                            <List sx={{ listStyleType: 'disc', paddingLeft: 2}}>
                                                                {repuesto.map((option) => (
                                                                    <ListItem key={option.id} sx={{ display: 'list-item', paddingLeft: 0  }} dense>
                                                                        <Typography variant={"body2"} fontWeight={1}>
                                                                            {option.nombreRepuesto}
                                                                        </Typography>
                                                                    </ListItem>
                                                                ))}
                                                            </List>
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>
                                            </Scrollbar>
                                        </Collapse>
                                    </Card>
                                </Box>
                            </Card>
                        </Box>

                    );
                })}
            </Box>

            <TablePagination
                rowsPerPageOptions={[2, 4, 8]}
                component="div"
                count={customerOrders.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage = {t('general.dataTable.filasPorPagina')}
            />

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={typeSnackbar} sx={{ width: '100%' }}>
                    {t(messageSnackbar)}
                </Alert>
            </Snackbar>

        </>
    );
}
