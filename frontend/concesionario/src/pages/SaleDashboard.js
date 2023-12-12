import { Helmet } from 'react-helmet-async';
import {es, enUS, pt} from "date-fns/locale";
import {useTranslation} from "react-i18next";
// @mui
import { useTheme } from '@mui/material/styles';
import React, {useContext, useEffect} from "react";
import {Grid, Stack, Card, Button, Snackbar} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import SellIcon from '@mui/icons-material/Sell';
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
// components
// sections
import Alert from "@mui/material/Alert";
import {
    AppMonthlyBranches,
    AppWidgetSummary,
    AppMonthlyExtras,
    AppMonthlySalesModel
} from '../sections/@dashboard/app';

import AppMonthlySales from '../sections/@dashboard/app/AppMonthlySales';
import SaleDashboardContext from "../hooks/dashboard/sale/SaleDashboardContext";
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

export default function SaleDashboard() {
    const theme = useTheme();

    const { t, i18n } = useTranslation("lang");

    const {SalesMonthly,
        getSalesMonthly,
        SalesModel,
        getSalesModel,
        SalesBranch,
        getSalesBranch,
        SalesExtra,
        getSalesExtra,
        totalAnualSales,
        getTotalAnualSales,
        totalMonthlySales,
        getTotalMonthlySales,
        numberOfSalesAnual,
        getNumberOfSalesAnual,
        numberOfSalesMonthly,
        getNumberOfSalesMonthly,
        month,
        handleMonthChange,
        year,
        handleYearChange,
        handleFilter,
        openSnackbar,
        messageSnackbar,
        typeSnackbar,
        handleOpenSnackbar,
        handleCloseSnackbar} = useContext(SaleDashboardContext);

    useEffect(() => {
        getSalesMonthly();
        getSalesModel();
        getSalesExtra();
        getSalesBranch();
        getTotalAnualSales();
        getTotalMonthlySales();
        getNumberOfSalesAnual();
        getNumberOfSalesMonthly();
    }, []);

    return (
        <>
            <Helmet>
                <title> {t('dashBoardVenta.titulo')} </title>
            </Helmet>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={12}>
                        <Card >
                            <Stack direction="row" spacing={2} margin={3} justifyContent="space-between">

                                <Stack direction="row" spacing={2}>
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
                                </Stack>
                                <Button variant="contained" startIcon={<FilterAltIcon/>} sx={{width: "15%"}} onClick={handleFilter}>
                                    {t('dashBoardVenta.filtro')}
                                </Button>
                            </Stack>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title={t('dashBoardVenta.totalVentasAnuales')} total={`$ ${fCurrency(totalAnualSales)}`} icon={<ShoppingCartRoundedIcon fontSize={"large"}/>} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title={t('dashBoardVenta.totalVentasMensuales')} total={`$ ${fCurrency(totalMonthlySales)}`} icon={<ShoppingCartRoundedIcon fontSize={"large"}/>} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title={t('dashBoardVenta.numeroVentasAnuales')} total={numberOfSalesAnual} icon={<SellIcon fontSize={"large"}/>} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title={t('dashBoardVenta.numeroVentasMensuales')} total={numberOfSalesMonthly} icon={<SellIcon fontSize={"large"}/>} />
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
                                name: 'ventas',
                                type: 'column',
                                fill: 'solid',
                                data: SalesMonthly,
                            }]}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <AppMonthlyBranches
                            title={t('dashBoardVenta.ventasPorSucursal')}
                            chartData={SalesBranch}
                            chartColors={[
                                theme.palette.primary.main,
                                theme.palette.info.main,
                                theme.palette.warning.main,
                                theme.palette.error.main,
                            ]}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <AppMonthlyExtras
                            title={t('dashBoardVenta.ventasPorExtra')}
                            chartData={SalesExtra}
                            chartColors={[
                                theme.palette.primary.main,
                                theme.palette.info.main,
                                theme.palette.warning.main,
                                theme.palette.error.main,
                            ]}
                            type={"extras"}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={8}>
                        <AppMonthlySalesModel
                            title={t('dashBoardVenta.ventasPorModelo')}
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
                                data: SalesModel,
                            }]}
                        />
                    </Grid>
                </Grid>

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={typeSnackbar} sx={{ width: '100%' }}>
                    {t(messageSnackbar)}
                </Alert>
            </Snackbar>
        </>
    );
}
