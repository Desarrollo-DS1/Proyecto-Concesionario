import { Helmet } from 'react-helmet-async';
import React from 'react';
import {styled} from "@mui/material/styles";
import {
    Box,
    Card,
    Divider, LinearProgress, linearProgressClasses,
    Stack,
    Typography
} from "@mui/material";
// @mui
import DirectionsCarFilledRoundedIcon from '@mui/icons-material/DirectionsCarFilledRounded';
import HourglassTopRoundedIcon from '@mui/icons-material/HourglassTopRounded';
import HourglassBottomRoundedIcon from '@mui/icons-material/HourglassBottomRounded';
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded';

// components
import LabelPlate from "../components/label-plate";

// sections

// context


const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
}));

const a =
    [{
        id: 1,
        cedulaEmpleado: 1110363276,
        nombreEmpleado: "Nicolas Herrera",
        fechaInicio: "2021-10-10",
        fechaEsperada: "2021-15-10",
        fechaFin: "",
        modelo: "Chevrolet Spark",
        placa: "ABC123",
        estado: false,
        servicio: [{id: 1, nombre: "Cambio de aceite", estado: true}, {id: 2, nombre: "Cambio de llantas", estado: false}, {id: 3, nombre: "Cambio de filtro de aceite", estado: true}],
        repuesto: [{id: 1, nombre: "Aceite"}, {id: 2, nombre: "Llantas"}, {id: 3, nombre: "Filtro de aceite"}],
    },
    {
        id: 2,
        cedulaEmpleado: 1110363276,
        nombreEmpleado: "Nicolas Herrera",
        fechaInicio: "2021-10-10",
        fechaEsperada: "2021-15-10",
        fechaFin: "",
        modelo: "Chevrolet Spark",
        placa: "ABC123",
        estado: false,
        servicio: [{id: 1, nombre: "Cambio de aceite", estado: true}, {id: 2, nombre: "Cambio de llantas", estado: false}, {id: 3, nombre: "Cambio de filtro de aceite", estado: true}],
        repuesto: [{id: 1, nombre: "Aceite"}, {id: 2, nombre: "Llantas"}, {id: 3, nombre: "Filtro de aceite"}],
    },
    {
        id: 3,
        cedulaEmpleado: 1110363276,
        nombreEmpleado: "Nicolas Herrera",
        fechaInicio: "2021-10-10",
        fechaEsperada: "2021-15-10",
        fechaFin: "",
        modelo: "Chevrolet Spark",
        placa: "ABC123",
        estado: false,
        servicio: [{id: 1, nombre: "Cambio de aceite", estado: true}, {id: 2, nombre: "Cambio de llantas", estado: false}, {id: 3, nombre: "Cambio de filtro de aceite", estado: true}],
        repuesto: [{id: 1, nombre: "Aceite"}, {id: 2, nombre: "Llantas"}, {id: 3, nombre: "Filtro de aceite"}],
    }]

// ----------------------------------------------------------------------

export default function OrderCustomerPage() {

    return (
        <>
            <Helmet>
                <title>Cliente</title>
            </Helmet>



            <Box sx={{margin: 2}}>

                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                    <Typography variant="h4" gutterBottom>
                        Ordenes
                    </Typography>
                </Stack>


                {a.map((row) => {
                    const { id, cedulaEmpleado, nombreEmpleado, fechaInicio, fechaEsperada, fechaFin, modelo, placa, estado, servicio, repuesto} = row;
                    return (
                        <Card key={id}>

                            <Stack direction="row" alignItems="center" justifyContent="space-between" m={4}>
                                <Stack alignItems="center">
                                    <DirectionsCarFilledRoundedIcon sx={{ fontSize: 120 }}/>
                                    <Typography variant="subtitle1" gutterBottom>
                                        {modelo}
                                    </Typography>
                                    <LabelPlate plate={placa}/>
                                </Stack>
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
                                    <EventAvailableRoundedIcon sx={{ fontSize: 50 }} color={"success"}/>
                                    <Stack alignItems="center" justifyContent="space-between">
                                        <Typography variant="subtitle1">
                                            Fecha de entrega
                                        </Typography>
                                        <Typography variant="subtitle2" fontWeight={1}>
                                            {""}
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </Stack>
                            <Divider/>
                            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                                <Typography variant="h4" gutterBottom>
                                    {estado}
                                </Typography>
                            </Stack>
                            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                                <Typography variant="h4" gutterBottom>
                                    {servicio.map((s) => {
                                        return (
                                            <Typography variant="h4" gutterBottom>
                                                {s.nombre}
                                            </Typography>
                                        )
                                    })}
                                </Typography>
                            </Stack>
                            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                                <Typography variant="h4" gutterBottom>
                                    {repuesto.map((s) => {
                                        return (
                                            <Typography variant="h4" gutterBottom>
                                                {s.nombre}
                                            </Typography>
                                        )
                                    })}
                                </Typography>
                            </Stack>
                            <Stack m={5}>
                                <BorderLinearProgress variant="determinate" value={100} />
                            </Stack>
                        </Card>
                    );
                })}
            </Box>

        </>
    );
}
