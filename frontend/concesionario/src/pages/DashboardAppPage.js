import {useContext, useState} from "react";
import {useTranslation} from "react-i18next";
// @mui
import SellIcon from '@mui/icons-material/Sell';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import PersonIcon from '@mui/icons-material/Person';
import HandymanIcon from '@mui/icons-material/Handyman';
import { useTheme } from '@mui/material/styles';
import {Container, Box, Tab, Tabs} from '@mui/material';
// pages
import SaleDashboard from "./SaleDashboard";
import PriceDashboard from "./PriceDashboard";
import {SaleDashboardState} from "../hooks/dashboard/sale/SaleDashboardState";
import {PriceDashboardState} from "../hooks/dashboard/price/PriceDashboardState";
import AuthContext from "../hooks/auth/AuthContext";

// ----------------------------------------------------------------------

export default function DashboardAppPage() {

    const [tabIndex, setTabIndex] = useState(0);
    const { t } = useTranslation("lang");

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    const {user} = useContext(AuthContext);

    return (
        <>
            <Container maxWidth="xl">
                <Tabs value={tabIndex} onChange={handleTabChange}>
                    {(user.tipoUsuario === "Gerente" || user.tipoUsuario === "Superusuario" || user.tipoUsuario === "Vendedor") && <Tab icon={<SellIcon />} label={t("general.barraNavegacion.ventas")} iconPosition="start"/>}
                    {(user.tipoUsuario === "Gerente" || user.tipoUsuario === "Superusuario" || user.tipoUsuario === "Vendedor") && <Tab icon={<RequestQuoteIcon />} label={t('general.barraNavegacion.cotizaciones')} iconPosition="start"/>}
                </Tabs>

                 <Box mt={5} >
                    {tabIndex === 0 && <SaleDashboardState><SaleDashboard/></SaleDashboardState>}
                    {tabIndex === 1 && <PriceDashboardState><PriceDashboard/></PriceDashboardState>}
                 </Box>
            </Container>
        </>
    );
}



