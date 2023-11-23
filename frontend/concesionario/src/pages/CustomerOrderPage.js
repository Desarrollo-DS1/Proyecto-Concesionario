import { Helmet } from 'react-helmet-async';
import React, {useContext, useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import useMediaQuery from "@mui/material/useMediaQuery";
import {alpha, styled, useTheme} from "@mui/material/styles";
import {
    Box,
    Card, CardContent, Collapse,
    Divider, Grid, IconButton, lighten, LinearProgress, linearProgressClasses, List, ListItem, Snackbar,
    Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow,
    Typography
} from "@mui/material";
// @mui
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



// components
import LabelPlate from "../components/label-plate";
import Scrollbar from "../components/scrollbar";
import CustomerOrderContext from "../hooks/customerOrder/CustomerOrderContext";




// sections

// context


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

    const theme = useTheme();

    const { t } = useTranslation();

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
                        Ordenes
                    </Typography>
                </Stack>
                {filteredCustomerOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, cedulaEmpleado, nombreEmpleado, fechaInicio, fechaEsperada, fechaFin, modelo, placa, estado, servicio, repuesto} = row;
                    const color = chooseColor(calculateValue(servicio), fechaEsperada, theme);
                    return (
                        <Box mb={4} key={id}>
                            <Card key={id} >
                                <Stack direction="row" alignItems="center" m={4}>
                                    <Stack sx={{width:"20%"}} alignItems="center">
                                        <DirectionsCarFilledRoundedIcon sx={{ fontSize: 80 }}/>
                                        <Typography variant="subtitle1" gutterBottom align={"center"}>
                                            {modelo}
                                        </Typography>
                                        <LabelPlate plate={placa}/>
                                    </Stack>
                                    <Stack sx={{width:"80%"}} mx={5}  >
                                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                                            <Stack alignItems="center" direction="row">
                                                <HourglassTopRoundedIcon sx={{ fontSize: 50 }} color={"primary"}/>
                                                <Stack alignItems="center" justifyContent="space-between">
                                                    <Typography variant="subtitle1">
                                                        Fecha de inicio
                                                    </Typography>
                                                    <Typography variant="subtitle2" fontWeight={1}>
                                                        {fechaInicio}
                                                    </Typography>
                                                </Stack>
                                            </Stack>
                                            <Stack alignItems="center" direction="row">
                                                <HourglassBottomRoundedIcon sx={{ fontSize: 50 }} color={"warning"}/>
                                                <Stack alignItems="center" justifyContent="space-between">
                                                    <Typography variant="subtitle1">
                                                        Fecha esperada
                                                    </Typography>
                                                    <Typography variant="subtitle2" fontWeight={1}>
                                                        {fechaEsperada}
                                                    </Typography>
                                                </Stack>
                                            </Stack>
                                            <Stack alignItems="center" direction="row">
                                                <EventAvailableRoundedIcon sx={{ fontSize: 50, color:"#115923" }}/>
                                                <Stack alignItems="center" justifyContent="space-between">
                                                    <Typography variant="subtitle1">
                                                        Fecha de entrega
                                                    </Typography>
                                                    <Typography variant="subtitle2" fontWeight={1}>
                                                        {fechaFin}
                                                    </Typography>
                                                </Stack>
                                            </Stack>
                                        </Stack>
                                        <Stack mt={5} direction="row">
                                            <BorderLinearProgress variant="determinate" value={calculateValue(servicio)} sx={{ width: '90%', mr: 3 }} colorchoose={color}/>
                                            <Typography variant="subtitle1" align={"center"}>
                                                {calculateValue(servicio)} %
                                            </Typography>
                                        </Stack>
                                    </Stack>

                                </Stack>
                                <Divider/>

                                <Box m={2}>
                                    <Card>
                                        <CardContent sx={{backgroundColor: theme.palette.grey[200], height:50}} >
                                            <Stack direction="row" alignItems="center" justifyContent="space-between" height={1}>
                                                <Stack direction="row" alignItems="center">
                                                    <FormatListBulletedRoundedIcon sx={{ fontSize: 20 }} />
                                                    <Typography variant="subtitle1" ml={1}>
                                                        Detalles
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
                                                        <Grid item sm={6} sx={12} >
                                                            <Stack direction="row" alignItems="center">
                                                                <HomeRepairServiceRoundedIcon sx={{ fontSize: 20 }} />
                                                                <Typography variant="subtitle1" ml={1}>
                                                                    Servicios
                                                                </Typography>
                                                            </Stack>

                                                            <List sx={{ listStyleType: 'disc', paddingLeft: 2}}>
                                                                {servicio.map((option) => (
                                                                    <ListItem key={option.id} sx={{ display: 'list-item', paddingLeft: 0  }} dense>
                                                                        <Stack direction={"row"} alignItems={"center"} justifyContent="space-between">
                                                                            <Typography variant={"body2"} fontWeight={1}>
                                                                                {option.nombreServicio}
                                                                            </Typography>
                                                                            {option.estado ? <DoneRoundedIcon sx={{color: "#115923"}} fontSize={"small"}/> : <QueryBuilderRoundedIcon sx={{color: "#BF1F2C"}} fontSize={"small"}/>}
                                                                        </Stack>
                                                                    </ListItem>
                                                                ))}
                                                            </List>
                                                        </Grid>

                                                        <Divider orientation={"vertical"} flexItem sx={{ mr: "-1px",mt: 5 }}/>

                                                        <Grid item sm={6} sx={12} >
                                                            <Stack direction="row" alignItems="center">
                                                                <PlumbingIcon sx={{ fontSize: 20 }} />
                                                                <Typography variant="subtitle1" ml={1}>
                                                                    Repuestos
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
