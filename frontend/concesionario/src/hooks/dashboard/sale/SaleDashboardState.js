import propTypes from "prop-types";
import React, {useState} from "react";
import {format} from "date-fns";
import SaleDashboardContext from './SaleDashboardContext';


SaleDashboardState.propTypes = {
    children: propTypes.node,
}

const initialSalesMonthly = [44, 55, 57, 56, 61, 58, 63, 60, 66, 67, 69, 70];

const initialSalesModel = [
    { name: 'Onix RS', data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 67, 69, 70] },
    { name: 'Onix LT', data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 90, 88, 86] },
    { name: 'Onix Premier', data: [35, 41, 36, 26, 45, 48, 52, 53, 41, 44, 50, 51] },
    { name: 'Onix RS', data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 67, 69, 70] },
    { name: 'Onix LT', data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 90, 88, 86] },
    { name: 'Onix Premier', data: [35, 41, 36, 26, 45, 48, 52, 53, 41, 44, 50, 51] },
];

const initialSalesBranch = [
    { label: 'Bogotá', value: 45 },
    { label: 'Medellín', value: 4 },
    { label: 'Cali', value: 34 },
    { label: 'Barranquilla', value: 10 },
    { label: 'Cartagena', value: 5 },
    { label: 'Santa Marta', value: 15 },
];

const initialSalesExtra = [
    { label: 'Polarizado', value: 45 },
    { label: 'Rines de lujo', value: 4 },
    { label: 'Tapicería en cuero', value: 34 },
    { label: 'Pintura especial', value: 10 },
    { label: 'Polarizado', value: 5 },
    { label: 'Rines de lujo', value: 15 },
];

export function SaleDashboardState(props) {

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

    const getSalesMonthly = async () => {
        setSalesMonthly(initialSalesMonthly);
    }

    const getSalesModel = async () => {
        setSalesModel(initialSalesModel);
    }

    const getSalesBranch = async () => {
        setSalesBranch(initialSalesBranch);
    }

    const getSalesExtra = async () => {
        setSalesExtra(initialSalesExtra);
    }

    const getTotalAnualSales = async () => {
        setTotalAnualSales(0);
    }

    const getTotalMonthlySales = async () => {
        setTotalMonthlySales(0);
    }

    const getNumberOfSalesAnual = async () => {
        setNumberOfSalesAnual(0);
    }

    const getNumberOfSalesMonthly = async () => {
        setNumberOfSalesMonthly(0);
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
            handleFilter}}>
            {props.children}
        </SaleDashboardContext.Provider>
    )
}



