import { Helmet } from 'react-helmet-async';
import {es, enUS, pt} from "date-fns/locale";
import {useTranslation} from "react-i18next";
// @mui
import { useTheme } from '@mui/material/styles';
import React, {useContext, useEffect} from "react";
import {Grid, Stack, Card, Button} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import SellIcon from '@mui/icons-material/Sell';
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
// components
// sections
import {
    AppMonthlyBranches,
    AppWidgetSummary,
    AppMonthlyExtras,
    AppMonthlySalesModel,
    AppMonthlyPrices,
} from '../sections/@dashboard/app';

import PriceDashboardContext from "../hooks/dashboard/price/PriceDashboardContext";
import {fCurrency} from "../utils/formatNumber";

// ----------------------------------------------------------------------

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

export default function PriceDashboard() {
    const theme = useTheme();

    const { t, i18n } = useTranslation("lang");

    const {PricesMonthly,
        getPricesMonthly,
        PricesModel,
        getPricesModel,
        PricesBranch,
        getPricesBranch,
        PricesColor,
        getPricesColor,
        totalAnualPrices,
        getTotalAnualPrices,
        totalMonthlyPrices,
        getTotalMonthlyPrices,
        numberOfPricesAnual,
        getNumberOfPricesAnual,
        numberOfPricesMonthly,
        getNumberOfPricesMonthly,
        month,
        handleMonthChange,
        year,
        handleYearChange,
        handleFilter} = useContext(PriceDashboardContext);

    useEffect(() => {
        getPricesMonthly();
        getPricesModel();
        getPricesBranch();
        getPricesColor();
        getTotalAnualPrices();
        getTotalMonthlyPrices();
        getNumberOfPricesAnual();
        getNumberOfPricesMonthly();
    }, []);

    return (
        <>
            <Helmet>
                <title> {t('dashBoardCotizacion.titulo')} </title>
            </Helmet>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={12}>
                    <Card >
                        <Stack direction="row" spacing={2} margin={3} justifyContent="space-between">

                            <Stack direction="row" spacing={2}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker views={["year"]}
                                                label={t('dashBoardCotizacion.año')}
                                                value={year}
                                                onChange={(newValue) => handleYearChange(newValue)}
                                                animateYearScrolling
                                                slotProps={{ textField: { fullWidth: true } }}/>
                                </LocalizationProvider>

                                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={chooseLanguage(i18n.language)}>
                                    <DatePicker views={["month"]}
                                                label={t('dashBoardCotizacion.mes')}
                                                value={month}
                                                onChange={(newValue) => handleMonthChange(newValue)}
                                                slotProps={{ textField: { fullWidth: true } }}/>
                                </LocalizationProvider>
                            </Stack>
                            <Button variant="contained" startIcon={<FilterAltIcon/>} sx={{width: "15%"}} onClick={handleFilter}>
                                {t('dashBoardCotizacion.filtro')}
                            </Button>
                        </Stack>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <AppWidgetSummary title={t('dashBoardCotizacion.totalCotizacionesAnuales')} total={`$ ${fCurrency(totalAnualPrices)}`} icon={<ShoppingCartRoundedIcon fontSize={"large"}/>} />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <AppWidgetSummary title={t('dashBoardCotizacion.totalCotizacionesMensuales')} total={`$ ${fCurrency(totalMonthlyPrices)}`} icon={<ShoppingCartRoundedIcon fontSize={"large"}/>} />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <AppWidgetSummary title={t('dashBoardCotizacion.numeroCotizacionesAnuales')} total={numberOfPricesAnual} icon={<SellIcon fontSize={"large"}/>} />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <AppWidgetSummary title={t('dashBoardCotizacion.numeroCotizacionesMensuales')} total={numberOfPricesMonthly} icon={<SellIcon fontSize={"large"}/>} />
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <AppMonthlyBranches
                        title={t('dashBoardCotizacion.cotizacionesPorSucursal')}
                        chartData={PricesBranch}
                        chartColors={[
                            theme.palette.primary.main,
                            theme.palette.info.main,
                            theme.palette.warning.main,
                            theme.palette.error.main,
                        ]}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={8}>
                    <AppMonthlyPrices
                        title={t('dashBoardCotizacion.cotizacionesMensuales')}
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
                        chartData={[
                            {
                                name: 'cotizaciones',
                                type: 'column',
                                fill: 'solid',
                                data: PricesMonthly.dataPrice,
                            },
                            {
                                name: 'ventas',
                                type: 'area',
                                fill: 'gradient',
                                data: PricesMonthly.dataSale,
                            },
                        ]}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={8}>
                    <AppMonthlySalesModel
                        title={t('dashBoardCotizacion.cotizacionesPorModelo')}
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
                            type: 'bar',
                            fill: 'solid',
                            data: PricesModel,
                        }]}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <AppMonthlyExtras
                        title={t('dashBoardCotizacion.cotizacionesPorColor')}
                        chartData={PricesColor}
                        chartColors={[
                            theme.palette.primary.main,
                            theme.palette.info.main,
                            theme.palette.warning.main,
                            theme.palette.error.main,
                        ]}
                        type={"colores"}
                    />
                </Grid>

            </Grid>
        </>
    );
}
