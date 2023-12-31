import propTypes from "prop-types";
import React, {useState, useContext} from "react";
import {format} from "date-fns";
import SaleDashboardContext from './SaleDashboardContext';
import {getVentasPerMonth, getModelosInVentas, getVentasPerBranch, getExtrasInVentas, getAnnualVentas, getNumberOfAnnualVentas, getMonthlyVentas, getNumberOfMonthlyVentas} from '../../../api/Venta.api';
import AuthContext from "../../auth/AuthContext";


SaleDashboardState.propTypes = {
    children: propTypes.node,
};

export function SaleDashboardState(props) {

    const {authTokens, user} = useContext(AuthContext);

    const [month, setMonth] = useState(new Date());
    const [year, setYear] = useState(new Date());

    const [SalesMonthly, setSalesMonthly] = useState([]);
    const [SalesModel, setSalesModel] = useState([]);
    const [SalesBranch, setSalesBranch] = useState([]);
    const [SalesExtra, setSalesExtra] = useState([]);

    const [totalAnualSales, setTotalAnualSales] = useState(0);
    const [totalMonthlySales, setTotalMonthlySales] = useState(0);
    const [numberOfSalesAnual, setNumberOfSalesAnual] = useState(0);
    const [numberOfSalesMonthly, setNumberOfSalesMonthly] = useState(0);

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


    const getSalesMonthly = async () => {
        try{
            const response  = await getVentasPerMonth(authTokens.access, format(year, 'yyyy'));
            const monthlySales = response.data.map((sale) => sale.total_Ventas);
            setSalesMonthly(monthlySales);

        } catch (error) {
            if (error.response.data.anho){
                setTypeSnackbar("error");
                setMessageSnackbar(error.response.data.anho);
                handleOpenSnackbar();

            } else {
                console.log(error);
                setTypeSnackbar("error");
                setMessageSnackbar('dashBoardVenta.mensaje.errorCargandoVentasPorMes');
                handleOpenSnackbar();
            }
        }
    }

    const getSalesModel = async () => {
        try {
            const response = await getModelosInVentas(authTokens.access, format(year, 'yyyy'));

            const salesModel = response.data.reduce((acc, model) => {
                const { mes, modelo, cantidadVentasModelo } = model;
        
                let modelObj = acc.find(obj => obj.name === modelo);
        
                if (!modelObj) {
                    modelObj = {
                        name: modelo,
                        data:  Array(12).fill(0)
                    };
                    acc.push(modelObj);
                }
        
                modelObj.data[mes - 1] = cantidadVentasModelo;
        
                return acc;
            }, []);

            setSalesModel(salesModel);

        } catch (error) {
            if (error.response.data.anho){
                setTypeSnackbar("error");
                setMessageSnackbar(error.response.data.anho);
                handleOpenSnackbar();

            } else {
                console.log(error);
                setTypeSnackbar("error");
                setMessageSnackbar('dashBoardVenta.mensaje.errorCargandoVentasPorModelo');
                handleOpenSnackbar();
            }
        }
    }

    const getSalesBranch = async () => {
        try {
            const response = await getVentasPerBranch(authTokens.access, format(year, 'yyyy'), format(month, 'MM'));
            setSalesBranch(response.data);

        } catch (error) {
            if (error.response.data.anho){
                setTypeSnackbar("error");
                setMessageSnackbar(error.response.data.anho);
                handleOpenSnackbar();

            } else if (error.response.data.mes){
                setTypeSnackbar("error");
                setMessageSnackbar(error.response.data.mes);
                handleOpenSnackbar();

            } else {
                console.log(error);
                setTypeSnackbar("error");
                setMessageSnackbar('dashBoardVenta.mensaje.errorCargandoVentasPorSucursal');
                handleOpenSnackbar();
            }
        }
    }

    const getSalesExtra = async () => {
        try {
            const response = await getExtrasInVentas(authTokens.access, format(year, 'yyyy'), format(month, 'MM'));
            setSalesExtra(response.data);

        } catch (error) {
            if (error.response.data.anho){
                setTypeSnackbar("error");
                setMessageSnackbar(error.response.data.anho);
                handleOpenSnackbar();

            } else if (error.response.data.mes){
                setTypeSnackbar("error");
                setMessageSnackbar(error.response.data.mes);
                handleOpenSnackbar();

            } else {
                console.log(error);
                setTypeSnackbar("error");
                setMessageSnackbar('dashBoardVenta.mensaje.errorCargandoExtrasEnVentas');
                handleOpenSnackbar();
            }
        }
    }

    const getTotalAnualSales = async () => {
        try{
            const response  = await getAnnualVentas(authTokens.access, format(year, 'yyyy'));
            setTotalAnualSales(response.data.totalVentas);

        } catch (error) {
            if (error.response.data.anho){
                setTypeSnackbar("error");
                setMessageSnackbar(error.response.data.anho);
                handleOpenSnackbar();

            } else {
                console.log(error);
                setTypeSnackbar("error");
                setMessageSnackbar('dashBoardVenta.mensaje.errorCargandoVentasAnuales');
                handleOpenSnackbar();
            }
        }
    }

    const getNumberOfSalesAnual = async () => {
        try{
            const response  = await getNumberOfAnnualVentas(authTokens.access, format(year, 'yyyy'));
            setNumberOfSalesAnual(response.data.numeroVentas);

        } catch (error) {
            if (error.response.data.anho){
                setTypeSnackbar("error");
                setMessageSnackbar(error.response.data.anho);
                handleOpenSnackbar();

            } else {
                console.log(error);
                setTypeSnackbar("error");
                setMessageSnackbar('dashBoardVenta.mensaje.errorCargandoNumeroVentasAnuales');
                handleOpenSnackbar();
            }
        }
    }

    const getTotalMonthlySales = async () => {
        try{
            const response  = await getMonthlyVentas(authTokens.access, format(year, 'yyyy'), format(month, 'MM'));
            setTotalMonthlySales(response.data.totalVentas);

        } catch (error) {
            if (error.response.data.anho){
                setTypeSnackbar("error");
                setMessageSnackbar(error.response.data.anho);
                handleOpenSnackbar();

            } else if (error.response.data.mes){
                setTypeSnackbar("error");
                setMessageSnackbar(error.response.data.mes);
                handleOpenSnackbar();

            } else {
                console.log(error);
                setTypeSnackbar("error");
                setMessageSnackbar('dashBoardVenta.mensaje.errorCargandoVentasMensuales');
                handleOpenSnackbar();
            }
        }
    }

    const getNumberOfSalesMonthly = async () => {
        try{
            const response  = await getNumberOfMonthlyVentas(authTokens.access, format(year, 'yyyy'), format(month, 'MM'));
            setNumberOfSalesMonthly(response.data.numeroVentas);

        } catch (error) {
            if (error.response.data.anho){
                setTypeSnackbar("error");
                setMessageSnackbar(error.response.data.anho);
                handleOpenSnackbar();

            } else if (error.response.data.mes){
                setTypeSnackbar("error");
                setMessageSnackbar(error.response.data.mes);
                handleOpenSnackbar();

            } else {
                console.log(error);
                setTypeSnackbar("error");
                setMessageSnackbar('dashBoardVenta.mensaje.errorCargandoNumeroVentasMensuales');
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
        getSalesModel();
        getSalesMonthly();
        getSalesExtra();
        getSalesBranch();
        getTotalAnualSales();
        getNumberOfSalesAnual();
        getTotalMonthlySales();
        getNumberOfSalesMonthly();
    }

    return (
        <SaleDashboardContext.Provider value={
            {SalesMonthly,
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
            handleCloseSnackbar}}>
            {props.children}
        </SaleDashboardContext.Provider>
    )
}



