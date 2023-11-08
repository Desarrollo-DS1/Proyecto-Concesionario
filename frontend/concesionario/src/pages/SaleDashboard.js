import { Helmet } from 'react-helmet-async';
import {es, enUS, pt} from "date-fns/locale";
import {useTranslation} from "react-i18next";
// @mui
import { useTheme } from '@mui/material/styles';
import React, {useContext, useEffect} from "react";
import {Grid, Container, Typography, Stack, TextField, MenuItem, Card, Button} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SellIcon from '@mui/icons-material/Sell';
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";

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

const chooseLanguage = (lang) => {
    switch (lang) {
        case "es":
            return es;
        case "en":
            return enUS;
        case "pt":
            return pt;
        default:
            return "Español";
    }
}

export default function DashboardAppPage() {
    const theme = useTheme();

    const { t, i18n } = useTranslation("lang");


    const {SalesMonthly,
        getSalesMonthly,
        SalesModel,
        getSalesModel,
        month,
        handleMonthChange,
        year,
        handleYearChange,
        handleFilter} = useContext(SaleDashboardContext);

    useEffect(() => {
        getSalesMonthly();
        getSalesModel();
    }, []);

    return (
        <>
            <Helmet>
                <title> {t('dashBoardVenta.titulo')} </title>
            </Helmet>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={12}>
                        <Card >
                            <Stack direction="row" spacing={2} margin={3}>

                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker views={["year"]}
                                                label={t('dashBoardVenta.año')}
                                                value={year}
                                                onChange={(newValue) => handleYearChange(newValue)}
                                                animateYearScrolling
                                                slotProps={{ textField: { fullWidth: true } }}/>
                                </LocalizationProvider>

                                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={chooseLanguage(i18n.language)}>
                                    <DatePicker views={["month"]}
                                                label={t('dashBoardVenta.mes')}
                                                value={month}
                                                onChange={(newValue) => handleMonthChange(newValue)}
                                                slotProps={{ textField: { fullWidth: true } }}/>
                                </LocalizationProvider>

                                <TextField
                                    select
                                    fullWidth
                                    name={"model"}
                                    label={t('dashBoardVenta.modelo')} variant="outlined"
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
                                    label={t('dashBoardVenta.sucursal')} variant="outlined"
                                >
                                    {/* {genders.map((option) => ( */}
                                    {/*    <MenuItem key={option.id} value={option.label}> */}
                                    {/*        {option.label} */}
                                    {/*    </MenuItem> */}
                                    {/* ))} */}
                                </TextField>

                                <Button variant="contained" startIcon={<FilterAltIcon/>} sx={{width: "30%"}} onClick={handleFilter}>
                                    {t('dashBoardVenta.filtro')}
                                </Button>
                            </Stack>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title={t('dashBoardVenta.totalVentasAnuales')} total={714000} icon={<AttachMoneyIcon width={24} height={24}/>} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title={t('dashBoardVenta.totalVentasMensuales')} total={1352831} icon={<AttachMoneyIcon width={24} height={24}/>} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title={t('dashBoardVenta.numeroVentasAnuales')} total={1723315} icon={<SellIcon width={24} height={24}/>} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title={t('dashBoardVenta.numeroVentasMensuales')} total={234} icon={<SellIcon width={24} height={24}/>} />
                    </Grid>

                    <Grid item xs={12} md={6} lg={8}>
                        <AppMonthlySales
                            title={t('dashBoardVenta.ventasMensuales')}
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
                            chartData={[{
                                name: 'Ventas',
                                type: 'column',
                                fill: 'solid',
                                data: SalesMonthly,
                            }]}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <AppCurrentVisits
                            title={t('dashBoardVenta.ventas')}
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
