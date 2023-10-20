import React, {useState} from "react";
import USERLIST from '../../_mock/user';
import CustomerContext from './CustomerContext';
import {checkCustomer} from "./CustomerValidation";
import {applySortFilter, getComparator} from "./CustomerFilter";


export function CustomerState(props) {

    const emptyCustomer = {
        primerNombre: "",
        segundoNombre: "",
        primerApellido: "",
        segundoApellido: "",
        cedula: "",
        telefono: "",
        celular: "",
        ciudad: "",
        direccion: "",
        fechaNacimiento: "",
        genero: "",
        correo: "",
        clave: "",
    }
    const emptyError = {
        primerNombre: '',
        segundoNombre: '',
        primerApellido: '',
        segundoApellido: '',
        cedula: '',
        telefono: '',
        celular: '',
        ciudad: '',
        direccion: '',
        fechaNacimiento: '',
        genero: '',
        correo: '',
        clave: '',
    }

    const [customerError, setCustomerError] = React.useState(emptyError);
    const [customer, setCustomer] = React.useState(emptyCustomer);
    const [customers, setCustomers] = React.useState([]);
    const [filterName, setFilterName] = useState('');
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('primerNombre');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [edit, setEdit] = React.useState(false);
    const [selected, setSelected] = React.useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [openForm, setOpenForm] = useState(false);

    const getCustomers = () => {
        setCustomers(USERLIST);
    }
    const getCustomer = (id) => {
        const customer = USERLIST.find(customer => customer.id === id);
        if(customer)
        {
            setCustomer(customer)
            setEdit(true)
        }
        else
        {
            setCustomer(emptyCustomer)
            setEdit(false)
        }
    }
    const editCustomer = (customer) => {
        setCustomer(customer)
    }
    const getCustomerError = () => {
        setCustomerError(emptyError)
    }
    const editCustomerError = (customerError) => {
        setCustomerError(customerError)
    }
    const validateCustomerOnSubmit = () => {
        const updatedErrors = {};
        Object.keys(customerError).forEach((key) => {
            updatedErrors[key] = checkCustomer(customer, key);
        });
        setCustomerError(updatedErrors);
        return Object.values(updatedErrors).some((error) => error !== '');
    };
    const validateCustomerOnBlur = (customer, name) => {
        setCustomerError({...customerError, [name]: checkCustomer(customer, name)});
    };

    const filteredCustomers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;
    const isNotFound = !filteredCustomers.length && !!filterName;

    return (
        <CustomerContext.Provider value={
            {
                customer,
                getCustomer,
                editCustomer,
                customers,
                getCustomers,
                customerError,
                validateCustomerOnSubmit,
                getCustomerError,
                editCustomerError,
                edit,
                validateCustomerOnBlur,
                order,
                orderBy,
                setOrder,
                setOrderBy,
                page,
                setPage,
                rowsPerPage,
                setRowsPerPage,
                selected,
                setSelected,
                filterName,
                setFilterName,
                filteredCustomers,
                emptyRows,
                isNotFound,
                openSnackbar,
                setOpenSnackbar,
                openForm,
                setOpenForm}}>
            {props.children}
        </CustomerContext.Provider>
    )
}



