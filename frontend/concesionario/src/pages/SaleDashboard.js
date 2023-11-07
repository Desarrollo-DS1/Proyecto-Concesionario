import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import React, {useContext, useEffect} from "react";
import {Grid, Container, Typography, Stack, TextField, MenuItem, Card, Button} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
// components
import Iconify from '../components/iconify';
// sections
import {
    AppTasks,
    AppNewsUpdate,
    AppOrderTimeline,
    AppCurrentVisits,
    AppWebsiteVisits,
    AppTrafficBySite,
    AppWidgetSummary,
    AppCurrentSubject,
    AppConversionRates,
} from '../sections/@dashboard/app';

import AppMonthlySales from '../sections/@dashboard/app/AppMonthlySales';
import SaleDashboardContext from "../hooks/dashboard/sale/SaleDashboardContext";

// ----------------------------------------------------------------------

const selectMenuProps = {
    anchorOrigin: {
        vertical: "bottom",
        horizontal: "left"
    },
    transformOrigin: {
        vertical: "top",
        horizontal: "left"
    },
    getcontentanchorel: null,
    PaperProps: {
        style: {
            maxHeight: 125 // Establece la altura máxima del menú
        }
    }
};


export default function DashboardAppPage() {
    const theme = useTheme();

    const {SalesMonthly,
        getSalesMonthly,
        SalesModel,
        getSalesModel,
        months,
        years} = useContext(SaleDashboardContext);

    useEffect(() => {
        getSalesMonthly();
        getSalesModel();
    }, []);

    return (
        <>
            <Helmet>
                <title> Dashboard Ventas </title>
            </Helmet>

                <Grid container spacing={3}>

                    <Grid item xs={12} sm={12} md={12}>
                        <Card >
                            <Stack direction="row" spacing={2} margin={3}>
                                <TextField
                                    select
                                    fullWidth
                                    name={"año"}
                                    label={"Año"} variant="outlined"
                                >
                                     {/* {months.map((option) => ( */}
                                     {/*   <MenuItem key={option.value} value={option.value}> */}
                                     {/*       {option.label} */}
                                     {/*   </MenuItem> */}
                                     {/* ))} */}
                                </TextField>

                                <TextField
                                    select
                                    fullWidth
                                    name={"mes"}
                                    label={"Mes"} variant="outlined"

                                    SelectProps={{
                                        MenuProps: selectMenuProps
                                    }}
                                >
                                     {months.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                     ))}
                                </TextField>

                                <TextField
                                    select
                                    fullWidth
                                    name={"model"}
                                    label={"Modelo"} variant="outlined"
                                >
                                    {/* {genders.map((option) => ( */}
                                    {/*    <MenuItem key={option.id} value={option.label}> */}
                                    {/*        {option.label} */}
                                    {/*    </MenuItem> */}
                                    {/* ))} */}
                                </TextField>

                                <TextField
                                    select
                                    fullWidth
                                    name={"model"}
                                    label={"Sucursal"} variant="outlined"
                                >
                                    {/* {genders.map((option) => ( */}
                                    {/*    <MenuItem key={option.id} value={option.label}> */}
                                    {/*        {option.label} */}
                                    {/*    </MenuItem> */}
                                    {/* ))} */}
                                </TextField>

                                <Button variant="contained" startIcon={<FilterAltIcon/>} sx={{width: "30%"}}>
                                    Filtrar
                                </Button>
                            </Stack>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title="Total Ventas Anuales" total={714000} icon={'ant-design:android-filled'} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title="Total Ventas Mensuales" total={1352831} color="info" icon={'ant-design:apple-filled'} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title="Numero Ventas Anuales" total={1723315} color="warning" icon={'ant-design:windows-filled'} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title="Numero Ventas Mensuales" total={234} color="error" icon={'ant-design:bug-filled'} />
                    </Grid>

                    <Grid item xs={12} md={6} lg={8}>
                        <AppMonthlySales
                            title="Ventas Mensuales"
                            subheader=""
                            chartLabels={[
                                'Ene',
                                'Feb',
                                'Mar',
                                'Abr',
                                'May',
                                'Jun',
                                'Jul',
                                'Ago',
                                'Sep',
                                'Oct',
                                'Nov',
                                'Dic',
                            ]}
                            chartData={SalesMonthly}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <AppCurrentVisits
                            title="Current Visits"
                            chartData={SalesModel}
                            chartColors={[
                                theme.palette.primary.main,
                                theme.palette.info.main,
                                theme.palette.warning.main,
                                theme.palette.error.main,
                            ]}
                        />
                    </Grid>
                </Grid>
        </>
    );
}
