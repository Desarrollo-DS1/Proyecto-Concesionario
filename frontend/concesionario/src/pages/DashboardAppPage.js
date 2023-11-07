import {useState} from "react";
import {useTranslation} from "react-i18next";
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import SellIcon from '@mui/icons-material/Sell';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import { useTheme } from '@mui/material/styles';
import {Grid, Container, Typography, Box, Tab, Tabs} from '@mui/material';
// pages
import SaleDashboard from "./SaleDashboard";
import {SaleDashboardState} from "../hooks/dashboard/sale/SaleDashboardState";

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
    const theme = useTheme();
    const [tabIndex, setTabIndex] = useState(0);
    const { t } = useTranslation("lang");

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    return (
        <>
            <Container maxWidth="xl">
                <Tabs value={tabIndex} onChange={handleTabChange}>
                    <Tab icon={<SellIcon />} label={t("general.barraNavegacion.ventas")} iconPosition="start"/>
                    <Tab icon={<RequestQuoteIcon />} label={t('general.barraNavegacion.cotizaciones')} iconPosition="start"/>
                </Tabs>

                <Box mt={5} >
                    {tabIndex === 0 && <SaleDashboardState><SaleDashboard /></SaleDashboardState>} {/* Renderiza el componente de ventas si la pestaña "Ventas" está activa */}
                    {tabIndex === 1 && <Box>Que tal</Box>} {/* Renderiza el componente de cotizaciones si la pestaña "Cotizaciones" está activa */}
                </Box>
            </Container>
        </>
    );
}



