import propTypes from "prop-types";
import React, { useContext, useState } from "react";
import CustomerOrderContext from './CustomerOrderContext';
import { checkCustomer } from "./CustomerValidation";
import { applySortFilter, getComparator } from "../filter/Filter";
import { getAllClientes, getCliente, createCliente, updateCliente, deleteCliente } from "../../api/Cliente.api";
import { createUsuario } from "../../api/Usuario.api";
import AuthContext from "../auth/AuthContext";



CustomerOrderState.propTypes = {
    children: propTypes.node,
}

export function CustomerOrderState(props) {
    const {authTokens} = useContext(AuthContext);

    const FILTER_OPTIONS = [
        { id: 'cedula', label: 'cedula' },
        { id: 'nombre', label: 'nombre' },
        { id: 'correo', label: 'correo' },
        { id: 'telefono', label: 'telefono' },
        { id: 'celular', label: 'celular' },
        { id: 'direccion', label: 'direccion' },
        { id: 'ciudad', label: 'ciudad' },
    ];


    const [customerOrders, setCustomerOrders] = React.useState([]);
    const [messageSnackbar, setMessageSnackbar] = useState('');
    const [typeSnackbar, setTypeSnackbar] = useState('success');

    const getCustomers = async () => {

        try {
            const response = await getAllClientes(authTokens.access);
            setCustomerOrders(response.data);

        } catch (error) {
            setTypeSnackbar('error');
            setMessageSnackbar('clientes.mensaje.errorListando');
            handleOpenSnackbar();
        }
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    }
    const handleOpenSnackbar = () => {
        setOpenSnackbar(true);
    }


    const [filterName, setFilterName] = useState('');
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('cedula');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [edit, setEdit] = React.useState(false);
    const [selected, setSelected] = React.useState([]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };
    const handleFilterByName = (event) => {
        setPage(0);
        setFilterName(event.target.value);
    };

    const [openFilter, setOpenFilter] = React.useState(null);
    const [filterField, setFilterField] = React.useState('cedula');

    const handleOpenFilter = (event) => {
        setOpenFilter(event.currentTarget);
    }

    const handleCloseFilter = () => {
        setOpenFilter(null);
    }

    const handleFilterField = (event, field) => {
        setFilterField(field);
        handleCloseFilter();
    }

    const filteredCustomers = applySortFilter(customerOrders, getComparator(order, orderBy), filterName, filterField, 'usuarios');
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - customerOrders.length) : 0;
    const isNotFound = !filteredCustomers.length && !!filterName;

    const [isLoading, setIsLoading] = useState(false);

    return (
        <CustomerOrderContext.Provider value={
            {
                TABLE_HEAD,
                FILTER_OPTIONS,
                customer,
                customers: customerOrders,
                genders,
                openForm,
                edit,
                openSnackbar,
                messageSnackbar,
                typeSnackbar,
                openDelete,
                getCustomers,
                handleInputChange,
                handleSubmit,
                handleDelete,
                handleOnBlur,
                handleOpenForm,
                handleCloseForm,
                handleOpenDelete,
                handleCloseDelete,
                handleCloseSnackbar,
                filterName,
                order,
                orderBy,
                page,
                rowsPerPage,
                selected,
                filteredCustomers,
                emptyRows,
                isNotFound,
                handleRequestSort,
                handleClick,
                handleChangePage,
                handleChangeRowsPerPage,
                handleFilterByName,
                customerError,
                showPassword,
                handleTogglePassword,
                filterField,
                handleFilterField,
                openFilter,
                handleOpenFilter,
                handleCloseFilter,
                isLoading
            }}>
            {props.children}
        </CustomerOrderContext.Provider>
    )
}







