import propTypes from "prop-types";
import React, {useState, useContext } from "react";
import {format} from "date-fns";
import { getCotizacionesPerMonth, getModelosInCotizaciones, getCotizacionesPerBranch, getColoresInCotizaciones, getAnnualCotizaciones, getNumberOfAnnualCotizaciones, getMonthlyCotizaciones, getNumberOfMonthlyCotizaciones } from "../../../api/Cotizacion.api";
import PriceDashboardContext from './PriceDashboardContext';
import AuthContext from "../../auth/AuthContext";


PriceDashboardState.propTypes = {
    children: propTypes.node,
}


export function PriceDashboardState(props) {

    const {authTokens, user} = useContext(AuthContext);

    const [month, setMonth] = useState(new Date());
    const [year, setYear] = useState(new Date());

    const [PricesMonthly, setPricesMonthly] = useState([]);
    const [PricesModel, setPricesModel] = useState([]);
    const [PricesBranch, setPricesBranch] = useState([]);
    const [PricesColor, setPricesColor] = useState([]);

    const [totalAnualPrices, setTotalAnualPrices] = useState(0);
    const [totalMonthlyPrices, setTotalMonthlyPrices] = useState(0);
    const [numberOfPricesAnual, setNumberOfPricesAnual] = useState(0);
    const [numberOfPricesMonthly, setNumberOfPricesMonthly] = useState(0);

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [messageSnackbar, setMessageSnackbar] = useState('');
    const [typeSnackbar, setTypeSnackbar] = useState('success');

    const handleOpenSnackbar = () => {
        setOpenSnackbar(true);
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    }

    const getPricesMonthly = async () => {
        try {
            const response = await getCotizacionesPerMonth(authTokens.access, format(year, 'yyyy'));
            const pricesMonthly = {
                dataPrice: response.data.map((price) => price.cantidadCotizaciones),
                dataSale: response.data.map((price) => price.cantidadVentas),
            };
            setPricesMonthly(pricesMonthly);

        } catch (error) {
            if (error.response.data.anho) {
                setTypeSnackbar('error');
                setMessageSnackbar(error.response.data.anho);
                handleOpenSnackbar();
            
            } else {
                console.log(error);
                setTypeSnackbar('error');
                setMessageSnackbar('dashBoardCotizacion.mensaje.errorCargandoCotizacionesPorMes');
                handleOpenSnackbar();
            }
        }
    }

    const getPricesModel = async () => {
        try {
            const response = await getModelosInCotizaciones(authTokens.access, format(year, 'yyyy'));

            const pricesModel = response.data.reduce((acc, price) => {
                const {mes, modelo, cantidadCotizacionesModelo} = price;

                let modelObj = acc.find((obj) => obj.name === modelo);

                if (!modelObj) {
                    modelObj = {
                        name: modelo,
                        data: new Array(12).fill(0),
                    };
                    acc.push(modelObj);
                }

                modelObj.data[mes - 1] = cantidadCotizacionesModelo;

                return acc;

            }, []);

            setPricesModel(pricesModel);

        } catch (error) {
            if (error.response.data.anho) {
                setTypeSnackbar('error');
                setMessageSnackbar(error.response.data.anho);
                handleOpenSnackbar();
            
            } else {
                console.log(error);
                setTypeSnackbar('error');
                setMessageSnackbar('dashBoardCotizacion.mensaje.errorCargandoCotizacionesPorModelo');
                handleOpenSnackbar();
            }
        }
    }

    const getPricesBranch = async () => {
        try{
            const response = await getCotizacionesPerBranch(authTokens.access, format(year, 'yyyy'), format(month, 'MM'));
            setPricesBranch(response.data);
        
        } catch (error) {
            if (error.response.data.anho) {
                setTypeSnackbar('error');
                setMessageSnackbar(error.response.data.anho);
                handleOpenSnackbar();
            
            } else if (error.response.data.mes) {
                setTypeSnackbar('error');
                setMessageSnackbar(error.response.data.mes);
                handleOpenSnackbar();
            
            } else {
                console.log(error);
                setTypeSnackbar('error');
                setMessageSnackbar('dashBoardCotizacion.mensaje.errorCargandoCotizacionesPorSucursal');
                handleOpenSnackbar();
            }
        }
    }

    const getPricesColor = async () => {
        try {
            const response = await getColoresInCotizaciones(authTokens.access, format(year, 'yyyy'), format(month, 'MM'));
            setPricesColor(response.data);
        
        } catch (error) {
            if (error.response.data.anho) {
                setTypeSnackbar('error');
                setMessageSnackbar(error.response.data.anho);
                handleOpenSnackbar();
            
            } else if (error.response.data.mes) {
                setTypeSnackbar('error');
                setMessageSnackbar(error.response.data.mes);
                handleOpenSnackbar();
            
            } else {
                console.log(error);
                setTypeSnackbar('error');
                setMessageSnackbar('dashBoardCotizacion.mensaje.errorCargandoCotizacionesPorColor');
                handleOpenSnackbar();
            }
        }
    }

    const getTotalAnualPrices = async () => {
        try{
            const response = await getAnnualCotizaciones(authTokens.access, format(year, 'yyyy'));
            setTotalAnualPrices(response.data.totalCotizaciones);

        } catch (error) {
            if (error.response.data.anho) {
                setTypeSnackbar('error');
                setMessageSnackbar(error.response.data.anho);
                handleOpenSnackbar();
            
            } else {
                console.log(error);
                setTypeSnackbar('error');
                setMessageSnackbar('dashBoardCotizacion.mensaje.errorCargandoCotizacionesAnuales');
                handleOpenSnackbar();
            }
        }
    }

    const getNumberOfPricesAnual = async () => {
        try {
            const response = await getNumberOfAnnualCotizaciones(authTokens.access, format(year, 'yyyy'));
            setNumberOfPricesAnual(response.data.numeroCotizaciones);

        } catch (error) {
            if (error.response.data.anho) {
                setTypeSnackbar('error');
                setMessageSnackbar(error.response.data.anho);
                handleOpenSnackbar();
            
            } else {
                console.log(error);
                setTypeSnackbar('error');
                setMessageSnackbar('dashBoardCotizacion.mensaje.errorCargandoNumeroCotizacionesAnuales');
                handleOpenSnackbar();
            }
        }
    }

    const getTotalMonthlyPrices = async () => {
        try {
            const response = await getMonthlyCotizaciones(authTokens.access, format(year, 'yyyy'), format(month, 'MM'));
            setTotalMonthlyPrices(response.data.totalCotizaciones);

        } catch (error) {
            if (error.response.data.anho) {
                setTypeSnackbar('error');
                setMessageSnackbar(error.response.data.anho);
                handleOpenSnackbar();
            
            } else if (error.response.data.mes) {
                setTypeSnackbar('error');
                setMessageSnackbar(error.response.data.mes);
                handleOpenSnackbar();
            
            } else {
                console.log(error);
                setTypeSnackbar('error');
                setMessageSnackbar('dashBoardCotizacion.mensaje.errorCargandoCotizacionesMensuales');
                handleOpenSnackbar();
            }
        }
    }

    const getNumberOfPricesMonthly = async () => {
        try {
            const response = await getNumberOfMonthlyCotizaciones(authTokens.access, format(year, 'yyyy'), format(month, 'MM'));
            setNumberOfPricesMonthly(response.data.numeroCotizaciones);

        } catch (error) {
            if (error.response.data.anho) {
                setTypeSnackbar('error');
                setMessageSnackbar(error.response.data.anho);
                handleOpenSnackbar();
            
            } else if (error.response.data.mes) {
                setTypeSnackbar('error');
                setMessageSnackbar(error.response.data.mes);
                handleOpenSnackbar();
            
            } else {
                console.log(error);
                setTypeSnackbar('error');
                setMessageSnackbar('dashBoardCotizacion.mensaje.errorCargandoNumeroCotizacionesMensuales');
                handleOpenSnackbar();
            }
        }
    }

    const handleMonthChange = (value) => {
        setMonth(value);
    }

    const handleYearChange = (value) => {
        setYear(value);
    }

    const handleFilter = () => {
        getPricesModel();
        getPricesMonthly();
        getPricesColor();
        getPricesBranch();
        getTotalAnualPrices();
        getTotalMonthlyPrices();
        getNumberOfPricesAnual();
        getNumberOfPricesMonthly();
    }

    return (
        <PriceDashboardContext.Provider value={
            {PricesMonthly,
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
            handleFilter,
            openSnackbar,
            messageSnackbar,
            typeSnackbar,
            handleOpenSnackbar,
            handleCloseSnackbar}}>
            {props.children}
        </PriceDashboardContext.Provider>
    )
}



