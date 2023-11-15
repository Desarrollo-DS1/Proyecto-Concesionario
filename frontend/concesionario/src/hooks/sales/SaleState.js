import propTypes, { func } from "prop-types";
import React, { useContext, useState } from "react";
import SaleContext from "./SaleContext";
import {checkSale} from "./SaleValidation";
import {applySortFilter, getComparator} from "../filter/Filter";
import { getAllVentas, getVenta, createVenta, updateVenta } from "../../api/Venta.api";
import { getAllEmpleados } from "../../api/Empleado.api";
// import { setEmployeeError } from "../employee/EmployeeState";
// import { setCustomers } from "../customer/CustomerState";
// import { setEmployees } from "../employee/EmployeeState";
import { getAllClientes } from "../../api/Cliente.api";
import AuthContext from "../auth/AuthContext";

SaleState.propTypes = {
    children: propTypes.node,
};

export function SaleState(props) {

    const {authTokens} = useContext(AuthContext);

    const TABLE_HEAD = [
        { id: "id", label: "ID", alignRight: false },
        { id: "cedulaCliente", label: "cliente", alignRight: false },
        { id: "nombreCliente", label: "nombreCliente", alignRight: false },
        { id: "cedulaVendedor", label: "vendedor", alignRight: false },
        { id: "nombreVendedor", label: "nombreVendedor", alignRight: false },
        { id: "fechaVenta", label: "fecha", alignRight: false },
        { id: "valorVenta", label: "valor", alignRight: false },
        { id: "vehiculos", label: "vehiculos", alignRight: false },
        { id: ""}
    ];

    const FILTER_OPTIONS = [
        { id: "id", label: "ID" },
        { id: "cliente", label: "cliente" },
        { id: "vendedor", label: "vendedor" },
        { id: "fecha", label: "fecha" },
    ];

    const emptySale = {
        id: "",
        cedulaCliente: "",
        cedulaVendedor: "",
        fechaVenta: "",
        valorVenta: "",
        vehiculos: [],
    };

    const emptyError = {
        id: "",
        cedulaCliente: "",
        cedulaVendedor: "",
        fechaVenta: "",
        valorVenta: "",
        vehiculos: [],
    };

    const [sale, setSale] = React.useState(emptySale);
    const [sales, setSales] = React.useState([]);
    const [openForm, setOpenForm] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [messageSnackbar, setMessageSnackbar] = useState('');
    const [typeSnackbar, setTypeSnackbar] = useState('success');

    
    const getSales = async () => {
        try {
            const response = await getAllVentas(authTokens.access);
            console.log(response);
            console.log(response.data);
            setSales(response.data);

        } catch (error) {
            setTypeSnackbar('error');
            setMessageSnackbar('ventas.mensaje.errorListando');
            handleOpenSnackbar();
        }
    }

    const getSale = async (id) => {
        if (id === null) {
            setEdit(false);
            setSale(emptySale);
        }
        else {
            setEdit(true);
            try {
                const response = await getVenta(id);
                if (response.status === 200) {
                    setSale(response.data);
                }
            } catch (error) {
                setTypeSnackbar('error');
                setMessageSnackbar('ventas.mensaje.errorCargando');
                handleOpenSnackbar();
            }
        }
    }

    const addVenta = async (venta) => {

        try {
            const response = await createVenta(venta);
            setSales([...sales, response.data]);
            setTypeSnackbar('success');
            setMessageSnackbar('ventas.mensaje.agregada');
            handleOpenSnackbar();
            handleCloseForm();

        } catch (error) {
            setTypeSnackbar('error');
            setMessageSnackbar('ventas.mensaje.errorCreando');
            handleOpenSnackbar();
        }
    }

    const updateVenta = async (venta) => {
            
        try
        {
            await updateVenta(venta.id, venta);
            setTypeSnackbar('success');
            setMessageSnackbar('venta.mensaje.editado');
            handleOpenSnackbar();
            handleCloseForm();
        }
        catch (error)
        {
            const errors = error.response.data;
            if(errors.id)
            {
                setTypeSnackbar('error');
                setMessageSnackbar('ventas.mensaje.errorID');
                handleOpenSnackbar();
//                setEmployeeError({...employeeError, correo: 'ID de venta no identificado'});

            } else
            {
                setTypeSnackbar('error');
                setMessageSnackbar('ventas.mensaje.error');
                handleOpenSnackbar();
            }
        }
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSale({
            ...sale,
            [name]: value
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateSaleOnSubmit()) {
            if (edit) {
                updateVenta(sale).then(() => getSales());
            }
            else {
                addVenta(sale).then(() => getSales());
            }
        }
    }

    const handleOnBlur = (event) => {
        const { name } = event.target;
        validateSaleOnBlur(sale, name);
    }


    const handleOpenForm = async (event, id) => {
        getSaleError();
        await getSale(id);
        setOpenForm(true);
    }

    const handleCloseForm = () => {
        setOpenForm(false);
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
    }

    const handleClick = (event, venta) => {
        const selectedIndex = selected.indexOf(venta);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, venta);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    }

    const handleFilterByName = (event) => {
        setPage(0);
        setFilterName(event.target.value);
    }

    const [openFilter, setOpenFilter] = React.useState(null);
    const [filterField, setFilterField] = React.useState('id');

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

    const filteredSales = applySortFilter(sales, getComparator(order, orderBy), filterName, filterField, 'ventas');
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - sales.length) : 0;
    const isNotFound = !filteredSales.length && !!filterName;

    const [saleError, setSaleError] = React.useState(emptyError);

    const getSaleError = () => {
        setSaleError(emptyError)
    }

    const validateSaleOnSubmit = () => {
        const updatedErrors = {};
        Object.keys(saleError).forEach((name) => {
            updatedErrors[name] = checkSale(sale, name, edit);
        });
        setSaleError(updatedErrors);
        return Object.values(updatedErrors).some((error) => error !== '');
    }

    const validateSaleOnBlur = (sale, name) => {
        setSaleError({...saleError, [name]: checkSale(sale, name, edit)});
    }


    const clientesVenta = async () => {
        try {
            const response = await getAllClientes();
//            setCustomers(response.data);

        } catch (error) {
            setTypeSnackbar('error');
            setMessageSnackbar('ventas.mensaje.errorListando');
            handleOpenSnackbar();
        }
    }

    const empleadosVenta = async () => {
        try {
            const response = await getAllEmpleados();
            // setEmployees(response.data);

        } catch (error) {
            setTypeSnackbar('error');
            setMessageSnackbar('ventas.mensaje.errorListando');
            handleOpenSnackbar();
        }
    }


    return (
        <SaleContext.Provider value={{
            TABLE_HEAD,
            FILTER_OPTIONS,
            sale,
            sales,
            openForm,
            openDelete,
            openSnackbar,
            messageSnackbar,
            typeSnackbar,
            emptySale,
            emptyError,
            saleError,
            edit,
            selected,
            filterName,
            order,
            orderBy,
            page,
            rowsPerPage,
            filteredSales,
            emptyRows,
            isNotFound,
            filterField,
            handleInputChange,
            handleSubmit,
            handleOnBlur,
            // handleDelete,
            handleOpenForm,
            handleCloseForm,
            handleCloseSnackbar,
            handleOpenSnackbar,
            handleRequestSort,
            handleClick,
            handleChangePage,
            handleChangeRowsPerPage,
            handleFilterByName,
            handleOpenFilter,
            handleCloseFilter,
            handleFilterField,
            getSales,
            getSale,
            getSaleError,
            validateSaleOnSubmit,
            validateSaleOnBlur,
            openFilter,
        }}>
            {props.children}
        </SaleContext.Provider>
    )


}