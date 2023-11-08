import propTypes from "prop-types";
import React, {useState} from "react";
import {format} from "date-fns";
import SaleDashboardContext from './SaleDashboardContext';


SaleDashboardState.propTypes = {
    children: propTypes.node,
}

const initialSalesMonthly = [44, 55, 57, 56, 61, 58, 63, 60, 66, 67, 69, 70];

const initialSalesModel = [
    { label: 'Onix RS', value: 45 },
    { label: 'Onix LT', value: 4 },
    { label: 'Onix Premier', value: 34 },
    { label: 'Montana', value: 10 },
    { label: 'Tracker', value: 5 },
    { label: 'Cruze', value: 15 },
];

export function SaleDashboardState(props) {

    const [month, setMonth] = useState(new Date());
    const [year, setYear] = useState(new Date());
    const [model, setModel] = useState(0);
    const [branch, setBranch] = useState(0);

    const [models, setModels] = useState([]);
    const [branches, setBranches] = useState([]);

    const [SalesMonthly, setSalesMonthly] = useState([]);
    const [SalesModel, setSalesModel] = useState([]);

    const [totalAnualSales, setTotalAnualSales] = useState(0);
    const [totalMonthlySales, setTotalMonthlySales] = useState(0);
    const [numberOfSalesAnual, setNumberOfSalesAnual] = useState(0);
    const [numberOfSalesMonthly, setNumberOfSalesMonthly] = useState(0);

    const getSalesMonthly = async () => {
        // const response = await getSalesMonthly();
        // setSalesMonthly(response);
        setSalesMonthly(initialSalesMonthly);
    }

    const getSalesModel = async () => {
        // const response = await getSalesModel();
        // setSalesModel(response);
        setSalesModel(initialSalesModel);
    }

    const getModels = async () => {
        // const response = await getModels();
        // setModels(response);
    }

    const getBranches = async () => {
        // const response = await getBranches();
        // setBranches(response);
    }

    const handleMonthChange = (value) => {
        setMonth(value);
    }

    const handleYearChange = (value) => {
        setYear(value);
    }

    const handleFilter = () => {
        // const response = await getSalesMonthly();
        // setSalesMonthly(response);
        console.log(format(month, 'MM'));
        console.log(format(year, 'yyyy'));
    }

    return (
        <SaleDashboardContext.Provider value={
            {SalesMonthly,
            getSalesMonthly,
            SalesModel,
            getSalesModel,
            month,
            handleMonthChange,
            year,
            handleYearChange,
            handleFilter}}>
            {props.children}
        </SaleDashboardContext.Provider>
    )
}



