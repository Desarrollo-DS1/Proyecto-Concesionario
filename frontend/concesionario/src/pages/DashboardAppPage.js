import {useState} from "react";
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

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    return (
        <>
            <Helmet>
                <title> Dashboard | Minimal UI </title>
            </Helmet>

            <Container maxWidth="xl">
                <Tabs value={tabIndex} onChange={handleTabChange}>
                    <Tab icon={<SellIcon />} label="Ventas" iconPosition="start"/>
                    <Tab icon={<RequestQuoteIcon />} label="Cotizaciones" iconPosition="start"/>
                </Tabs>

                <Box mt={5} >
                    {tabIndex === 0 && <SaleDashboardState><SaleDashboard /></SaleDashboardState>} {/* Renderiza el componente de ventas si la pestaña "Ventas" está activa */}
                    {tabIndex === 1 && <Box>Que tal</Box>} {/* Renderiza el componente de cotizaciones si la pestaña "Cotizaciones" está activa */}
                </Box>
            </Container>
        </>
    );
}



