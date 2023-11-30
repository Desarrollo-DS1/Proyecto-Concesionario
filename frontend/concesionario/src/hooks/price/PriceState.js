import propTypes from "prop-types";
import React, { useContext, useState } from "react";
import PriceContext from "./PriceContext";
import {checkSale} from "./PriceValidation";
import {applySortFilter, getComparator} from "../filter/Filter";
import { getAllVentas, getVenta, createVenta, updateVenta } from "../../api/Venta.api";
import { getAllEmpleados } from "../../api/Empleado.api";
import { getAllVehiculos } from "../../api/Vehiculo.api";
// import { setEmployeeError } from "../employee/EmployeeState";
// import { setCustomers } from "../customer/CustomerOrderState";
// import { setEmployees } from "../employee/EmployeeState";
import { getAllClientes } from "../../api/Cliente.api";
import AuthContext from "../auth/AuthContext";
import {getAllColors} from "../../api/Colors.api";
import {getAllModelos} from "../../api/Modelo.api";

PriceState.propTypes = {
    children: propTypes.node,
};

export function PriceState(props) {

    const {authTokens, user} = useContext(AuthContext);

    const TABLE_HEAD = [
        { id: "id", label: "ID", alignRight: false },
        { id: "cedulaCliente", label: "cliente", alignRight: false },
        { id: "nombreCliente", label: "nombreCliente", alignRight: false },
        { id: "cedulaVendedor", label: "vendedor", alignRight: false },
        { id: "nombreVendedor", label: "nombreVendedor", alignRight: false },
        { id: "fechaCotizacion", label: "fecha", alignRight: false },
        { id: "valorCotizacion", label: "valor", alignRight: false },
        { id: "modelos", label: "modelos", alignRight: false },
        { id: ""}
    ];

    const FILTER_OPTIONS = [
        { id: "id", label: "ID" },
        { id: "cedulaCliente", label: "cliente" },
        { id: "cedulaVendedor", label: "vendedor" },
        { id: "fechaCotizacion", label: "fecha" },
    ];

    const emptyPrice = {
        id: "",
        cedulaCliente: "",
        cedulaVendedor: user.user_id,
        fechaCotizacion: "",
        modelos: [],
    };

    const emptyCartModel = {
        id: "",
        vehiculo: "",
        color: "",
        extra: "",
    }

    const emptyError = {
        id: "",
        cedulaCliente: "",
        cedulaVendedor: "",
        fechaVenta: "",
        fechaCotizacion: "",
        modelos: ""
    };

    const emptyErrorCartModel = {
        id: "",
        model: "",
        color: "",
        extra: "",
    }

    const [price, setPrice] = React.useState(emptyPrice);
    const [prices, setPrices] = React.useState([]);
    const [openForm, setOpenForm] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [messageSnackbar, setMessageSnackbar] = useState('');
    const [typeSnackbar, setTypeSnackbar] = useState('success');
    const [models, setModels] = React.useState([]);
    const [extras, setExtras] = React.useState([]);
    const [colors, setColors] = React.useState([]);
    const [total, setTotal] = React.useState(100000000);

    const getExtras = async () => {

    }

    const getColors = async () => {

        try
        {
            const response = await getAllColors(authTokens.access);
            setColors(response.data);
        }
        catch (error)
        {
            setTypeSnackbar('error');
            setMessageSnackbar('colores.mensaje.errorListando');
            handleOpenSnackbar();
        }
    }

    const getModels = async () => {

        try
        {
            const response = await getAllModelos(authTokens.access);
            setModels(response.data);
        }
        catch (error)
        {
            setTypeSnackbar('error');
            setMessageSnackbar('modelos.mensaje.errorListando');
            handleOpenSnackbar();
        }
    }

    const getPrices = async () => {
        // try {
        //     const response = await getAllVentas(authTokens.access);
        //     setPrices(response.data);
        //
        // } catch (error) {
        //     setTypeSnackbar('error');
        //     setMessageSnackbar('ventas.mensaje.errorListando');
        //     handleOpenSnackbar();
        // }
    }

    const getPrice = async (id) => {
        // if (id === null) {
        //     setEdit(false);
        //     setPrice(emptyPrice);
        // }
        // else {
        //     setEdit(true);
        //     try {
        //         const response = await getVenta(id);
        //         if (response.status === 200) {
        //             setPrice(response.data);
        //         }
        //     } catch (error) {
        //         setTypeSnackbar('error');
        //         setMessageSnackbar('ventas.mensaje.errorCargando');
        //         handleOpenSnackbar();
        //     }
        // }
    }

    const addPrice = async (price) => {

        // try {
        //     const response = await createVenta(sale);
        //     setPrices([...prices, response.data]);
        //     setTypeSnackbar('success');
        //     setMessageSnackbar('ventas.mensaje.agregada');
        //     handleOpenSnackbar();
        //     handleCloseForm();
        //
        // } catch (error) {
        //     setTypeSnackbar('error');
        //     setMessageSnackbar('ventas.mensaje.errorCreando');
        //     handleOpenSnackbar();
        // }
    }

    const updatePrice = async (price) => {
            
//         try
//         {
//             await updatePrice(price.id, price);
//             setTypeSnackbar('success');
//             setMessageSnackbar('venta.mensaje.editado');
//             handleOpenSnackbar();
//             handleCloseForm();
//         }
//         catch (error)
//         {
//             const errors = error.response.data;
//             if(errors.id)
//             {
//                 setTypeSnackbar('error');
//                 setMessageSnackbar('ventas.mensaje.errorID');
//                 handleOpenSnackbar();
// //                setEmployeeError({...employeeError, correo: 'ID de venta no identificado'});
//
//             } else
//             {
//                 setTypeSnackbar('error');
//                 setMessageSnackbar('ventas.mensaje.error');
//                 handleOpenSnackbar();
//             }
//         }
    }

    const calculateTotal = () => {

    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPrice({
            ...price,
            [name]: value
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validatePriceOnSubmit()) {
            if(price.modelos.length === 0)
            {
                setTypeSnackbar('error');
                setMessageSnackbar('cotizaciones.mensaje.errorVehiculos');
                handleOpenSnackbar();
                return;
            }

            if (edit) {
                updatePrice(price).then(() => getPrices());
            }
            else {
                addPrice(price).then(() => getPrices());
            }
        }
    }

    const handleOnBlur = (event) => {
        const { name } = event.target;
        validatePriceOnBlur(price, name);
    }

    const handleOpenForm = async (event, id) => {
        getCartVehicleError();
        getPriceError();
        await getModels();
        await getPrice(id);
        setOpenForm(true);
    }

    const handleCloseForm = () => {
        setCart([]);
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

    const [cart, setCart] = React.useState([]);
    const [cartModelo, setCartModelo] = React.useState(emptyCartModel);

    const getCart = async () => {

    }

    const addCartModel = (event) => {

        event.preventDefault();

        if (!validateCartPriceOnSubmit())
        {
            if (cart.map((item) => item.id).includes(cartModelo.model.vin))
            {
                setTypeSnackbar('error');
                setMessageSnackbar('ventas.mensaje.errorVehiculo');
                handleOpenSnackbar();
                return;
            }
            {
                const cartModel1 = {
                    id: cartModelo.model.vin,
                    vin: cartModelo.model.vin,
                    nombreVehiculo: cartModelo.model.nombreModelo,
                    color: cartModelo.color,
                    hexadecimalColor: cartModelo.vehiculo.hexadecimalColor,
                    idExtra: 1,
                    nombreExtra: "Vidrios Polarizados"
                };

                setCart([...cart, cartModel1]);
                setCartModelo(emptyCartModel);
                setPrice({...price, modelos: [...price.modelos, cartModel1]})
                calculateTotal();
            }
        }
    }

    const deleteCartModel = async (event, vin) => {
        event.preventDefault();

        setCart(cart.filter((item) => item.id !== vin));
    }

    const handleInputChangeCart = (event) => {
        const { name, value } = event.target;
        setCartModelo({
            ...cartModelo,
            [name]: value
        });
    }

    const handleOnBlurCartModel = (event) => {
        const { name } = event.target;
        validateCartPriceOnBlur(cartModelo, name);
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
    const [filterField, setFilterField] = React.useState('ID');

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

    const filteredPrices = applySortFilter(prices, getComparator(order, orderBy), filterName, filterField, 'ventas');
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - prices.length) : 0;
    const isNotFound = !filteredPrices.length && !!filterName;

    const [priceError, setPriceError] = React.useState(emptyError);
    const [cartPriceError, setCartPriceError] = React.useState(emptyErrorCartModel);

    const getPriceError = () => {
        setPriceError(emptyError)
    }

    const validatePriceOnSubmit = () => {
        const updatedErrors = {};
        Object.keys(priceError).forEach((name) => {
            updatedErrors[name] = checkSale(price, name);
        });
        setPriceError(updatedErrors);
        return Object.values(updatedErrors).some((error) => error !== '');
    }

    const validatePriceOnBlur = (sale, name) => {
        setPriceError({...priceError, [name]: checkSale(sale, name)});
    }

    const getCartVehicleError = () => {
        setCartPriceError(emptyErrorCartModel)
    }

    const validateCartPriceOnSubmit = () => {
        const updatedErrors = {};
        Object.keys(cartPriceError).forEach((name) => {
            updatedErrors[name] = checkSale(cartModelo, name);
        });
        setCartPriceError(updatedErrors);
        return Object.values(updatedErrors).some((error) => error !== '');
    }

    const validateCartPriceOnBlur = (cartVehicle, name) => {
        setCartPriceError({...cartPriceError, [name]: checkSale(cartVehicle, name)});
    }

    return (
        <PriceContext.Provider value={{
            TABLE_HEAD,
            FILTER_OPTIONS,
            price,
            prices,
            openForm,
            openDelete,
            openSnackbar,
            messageSnackbar,
            typeSnackbar,
            emptyPrice,
            emptyError,
            priceError,
            edit,
            selected,
            filterName,
            order,
            orderBy,
            page,
            rowsPerPage,
            filteredPrices,
            emptyRows,
            isNotFound,
            filterField,
            handleInputChange,
            handleSubmit,
            handleOnBlur,
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
            getPrices,
            getPrice,
            getPriceError,
            validatePriceOnSubmit,
            validatePriceOnBlur,
            openFilter,
            cart,
            handleInputChangeCart,
            addCartModel,
            cartModelo,
            models,
            deleteCartModel,
            handleOnBlurCartModel,
            cartPriceError,
            getCartVehicleError,
            total,
            extras
        }}>
            {props.children}
        </PriceContext.Provider>
    )


}