import propTypes from "prop-types";
import React, {useState} from "react";
import SaleDashboardContext from './SaleDashboardContext';

SaleDashboardState.propTypes = {
    children: propTypes.node,
}

const initialSalesMonthly = [
    {
        name: 'Ventas',
        type: 'column',
        fill: 'solid',
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
    }
];

const initialSalesModel = [
    { label: 'Onix RS', value: 45 },
    { label: 'Onix LT', value: 4 },
    { label: 'Onix Premier', value: 34 },
    { label: 'Montana', value: 10 },
    { label: 'Tracker', value: 5 },
    { label: 'Cruze', value: 15 },
];



export function SaleDashboardState(props) {

    const [month, setMonth] = useState(0);
    const [year, setYear] = useState(0);
    const [model, setModel] = useState(0);
    const [branch, setBranch] = useState(0);

    const [SalesMonthly, setSalesMonthly] = useState([]);
    const [SalesModel, setSalesModel] = useState([]);

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

    return (
        <SaleDashboardContext.Provider value={
            {SalesMonthly,
            getSalesMonthly,
            SalesModel,
            getSalesModel}}>
            {props.children}
        </SaleDashboardContext.Provider>
    )
}



