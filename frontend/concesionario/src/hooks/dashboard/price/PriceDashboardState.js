import propTypes from "prop-types";
import React, {useState} from "react";
import {format} from "date-fns";
import PriceDashboardContext from './PriceDashboardContext';


PriceDashboardState.propTypes = {
    children: propTypes.node,
}

const initialPricesMonthly = {
    dataPrice: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
    dataSale: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
};

const initialPricesModel = [
    { name: 'Onix RS', data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 67, 69, 70] },
    { name: 'Onix LT', data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 90, 88, 86] },
    { name: 'Onix Premier', data: [35, 41, 36, 26, 45, 48, 52, 53, 41, 44, 50, 51] },
    { name: 'Onix RS', data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 67, 69, 70] },
    { name: 'Onix LT', data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 90, 88, 86] },
    { name: 'Onix Premier', data: [35, 41, 36, 26, 45, 48, 52, 53, 41, 44, 50, 51] },
];

const initialPricesBranch = [
    { label: 'Bogotá', value: 45 },
    { label: 'Medellín', value: 4 },
    { label: 'Cali', value: 34 },
    { label: 'Barranquilla', value: 10 },
    { label: 'Cartagena', value: 5 },
    { label: 'Santa Marta', value: 15 },
];

const initialPricesColor = [
    { label: 'Rojo', value: 45 },
    { label: 'Azul', value: 4 },
    { label: 'Verde', value: 34 },
    { label: 'Amarillo', value: 10 },
    { label: 'Negro', value: 5 },
    { label: 'Blanco', value: 15 },
];

export function PriceDashboardState(props) {

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
        setPricesMonthly(initialPricesMonthly);
    }

    const getPricesModel = async () => {
        setPricesModel(initialPricesModel);
    }

    const getPricesBranch = async () => {
        setPricesBranch(initialPricesBranch);
    }

    const getPricesColor = async () => {
        setPricesColor(initialPricesColor);
    }

    const getTotalAnualPrices = async () => {
        setTotalAnualPrices(0);
    }

    const getTotalMonthlyPrices = async () => {
        setTotalMonthlyPrices(0);
    }

    const getNumberOfPricesAnual = async () => {
        setNumberOfPricesAnual(0);
    }

    const getNumberOfPricesMonthly = async () => {
        setNumberOfPricesMonthly(0);
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



