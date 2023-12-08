import propTypes from "prop-types";
import {round} from "lodash";
import React, { useContext, useState } from "react";
import { getAllExtras } from "../../api/Extra.api";
import SaleContext from "./SaleContext";
import {checkSale} from "./SaleValidation";
import {applySortFilter, getComparator} from "../filter/Filter";
import { getAllVentas, getVenta, createVenta, updateVenta } from "../../api/Venta.api";
import { getAllAvailableVehiculos } from "../../api/Vehiculo.api";
import AuthContext from "../auth/AuthContext";

SaleState.propTypes = {
    children: propTypes.node,
};

export default function SaleState(props) {

    const {authTokens, user} = useContext(AuthContext);

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
        { id: "cedulaCliente", label: "cliente" },
        { id: "cedulaVendedor", label: "vendedor" },
        { id: "fechaVenta", label: "fecha" },
    ];

    const emptySale = {
        id: "",
        cedulaCliente: "",
        cedulaVendedor: user.user_id,
        fechaVenta: new Date().toISOString().split('T')[0],
        ventaVehiculo: [],
    };

    const emptyCartVehicle = {
        id: "",
        vehiculo: "",
        porcentajeDescuento: "0",
        extra: "",
    }

    const emptyError = {
        id: "",
        cedulaCliente: "",
        cedulaVendedor: "",
        fechaVenta: "",
        valorVenta: "",
        ventaVehiculo: ""
    };

    const emptyErrorCartVehicle = {
        id: "",
        vehiculo: "",
        porcentajeDescuento: "",
        extra: "",
    }

    const [sale, setSale] = React.useState(emptySale);
    const [sales, setSales] = React.useState([]);
    const [openForm, setOpenForm] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [messageSnackbar, setMessageSnackbar] = useState('');
    const [typeSnackbar, setTypeSnackbar] = useState('success');
    const [vehicles, setVehicles] = React.useState([]);
    const [extras, setExtras] = React.useState([]);
    const [total, setTotal] = React.useState(0);


    const getExtras = async () => {
        try {
            const response = await getAllExtras(authTokens.access);
            setExtras(response.data);

        } catch (error) {
            setTypeSnackbar('error');
            setMessageSnackbar('vehiculos.mensaje.errorListandoExtras');
            handleOpenSnackbar();
        }
    }

    const getVehicles = async () => {
        try {
            const response = await getAllAvailableVehiculos(authTokens.access);
            setVehicles(response.data);
        } catch (error) {
            setTypeSnackbar('error');
            setMessageSnackbar('vehiculos.mensaje.errorListando');
            handleOpenSnackbar();
        }
    }

    const getSales = async () => {
        try {
            const response = await getAllVentas(authTokens.access);
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
            setTotal(0);
        }
        else {
            setEdit(true);
            try {
                const response = await getVenta(id, authTokens.access);
                if (response.status === 200) {
                    setSale(response.data);
                    const vehiclesInSale = response.data.ventaVehiculo.map((item) => {return {...item, id: item.vehiculo}});
                    setCart(vehiclesInSale);
                    const total = vehiclesInSale.reduce((acc, item) => acc + (parseFloat(item.precio) * (1 - parseFloat(item.porcentajeDescuento/100))), 0);
                    setTotal(total);

                }
            } catch (error) {
                setTypeSnackbar('error');
                setMessageSnackbar('ventas.mensaje.errorCargando');
                handleOpenSnackbar();
            }
        }
    }

    const addSale = async (sale) => {
        try {
            const response = await createVenta(sale, authTokens.access);
            setSales([...sales, response.data]);
            setTypeSnackbar('success');
            setMessageSnackbar('ventas.mensaje.agregado');
            handleOpenSnackbar();
            handleCloseForm();

        } catch (error) {
            if (error.response.data.cedulaCliente) {
                setTypeSnackbar('error');
                setMessageSnackbar('ventas.mensaje.errorCliente');
                handleOpenSnackbar();

            } else if (error.response.data.cedulaVendedor) {
                setTypeSnackbar('error');
                setMessageSnackbar('ventas.mensaje.errorVendedor');
                handleOpenSnackbar();

            } else if (error.response.data.vehiculo) {
                setTypeSnackbar('error');
                setMessageSnackbar(error.response.data.vehiculo);
                handleOpenSnackbar();
            
            } else if (error.response.data.fechaVenta) {
                setTypeSnackbar('error');
                setMessageSnackbar(error.response.data.fechaVenta);
                handleOpenSnackbar();
            
            } else {
                console.log(error);
                setTypeSnackbar('error');
                setMessageSnackbar('ventas.mensaje.error');
                handleOpenSnackbar();
            }
        }
    }

    const updateSale = async (sale) => {
        try
        {
            await updateVenta(sale.id, sale, authTokens.access);
            setTypeSnackbar('success');
            setMessageSnackbar('ventas.mensaje.editado');
            handleOpenSnackbar();
            handleCloseForm();
        }
        catch (error)
        {
            if(error.response.data.cedulaCliente)
            {
                setTypeSnackbar('error');
                setMessageSnackbar('ventas.mensaje.errorCliente');
                handleOpenSnackbar();
            
            } else if(error.response.data.cedulaVendedor){
                setTypeSnackbar('error');
                setMessageSnackbar('ventas.mensaje.errorVendedor');
                handleOpenSnackbar();

            } else if(error.response.data.vehiculo){
                setTypeSnackbar('error');
                setMessageSnackbar(error.response.data.vehiculo);
                handleOpenSnackbar();

            } else if(error.response.data.fechaVenta){
                setTypeSnackbar('error');
                setMessageSnackbar(error.response.data.fechaVenta);
                handleOpenSnackbar();
            } else {
                setTypeSnackbar('error');
                setMessageSnackbar('ventas.mensaje.errorEditar');
                handleOpenSnackbar();
            }
        }
    }

    const updateTotal = (vehiclePrice, discount, operation) => {
        if (operation === 'add') {
            const totalAux = parseFloat(total) + (parseFloat(vehiclePrice) * (1 - parseFloat(discount)));
            setTotal(totalAux);
        } else if (operation === 'subtract') {
            const totalAux = parseFloat(total) - (parseFloat(vehiclePrice) * (1 - parseFloat(discount)));
            setTotal(totalAux);
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
            if(sale.ventaVehiculo.length === 0)
            {
                setTypeSnackbar('error');
                setMessageSnackbar('ventas.mensaje.errorVehiculos');
                handleOpenSnackbar();
                return;
            }

            if (edit) {
                updateSale(sale).then(() => getSales());
            }
            else {
                addSale(sale).then(() => getSales());
            }
        }
    }

    const handleOnBlur = (event) => {
        const { name } = event.target;
        validateSaleOnBlur(sale, name);
    }

    const handleOpenForm = async (event, id) => {
        getCartVehicleError();
        getSaleError();
        await getVehicles();
        await getExtras();
        await getSale(id);
        setOpenForm(true);
    }

    const handleCloseForm = () => {
        setCart([]);
        setCartVehicle(emptyCartVehicle);
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
    const [cartVehicle, setCartVehicle] = React.useState(emptyCartVehicle);

    const getCart = async () => {

    }

    const addCartVehicle = (event) => {

        event.preventDefault();

        if (!validateCartVehicleOnSubmit())
        {
            if (cart.map((item) => item.id).includes(cartVehicle.vehiculo.vin))
            {
                setTypeSnackbar('error');
                setMessageSnackbar('ventas.mensaje.errorVehiculo');
                handleOpenSnackbar();
                return;
            }
            {
                const cartVehicle1 = {
                    id: cartVehicle.vehiculo.vin,
                    vehiculo: cartVehicle.vehiculo.vin,
                    precio: cartVehicle.vehiculo.precio,
                    porcentajeDescuento: (cartVehicle.porcentajeDescuento / 100).toFixed(2),
                    extra: cartVehicle.extra.id,
                    nombreExtra: cartVehicle.extra.nombreExtra,
                    nombreVehiculo: cartVehicle.vehiculo.nombreModelo,
                    hexadecimalColor: cartVehicle.vehiculo.hexadecimalColor
                };

                setCart([...cart, cartVehicle1]);
                setCartVehicle(emptyCartVehicle);
                setSale({...sale, ventaVehiculo: [...sale.ventaVehiculo, cartVehicle1]})
                updateTotal(cartVehicle.vehiculo.precio, cartVehicle.porcentajeDescuento/100, 'add');
            }
        }
    }

    const deleteCartVehicle = async (event, vin) => {
        event.preventDefault();
        const cartAux = cart.filter((item) => item.id !== vin);
        setCart(cartAux);
        setSale({...sale, ventaVehiculo: cartAux});
        
        const deletedVehicle = cart.find((item) => item.id === vin);
        updateTotal(deletedVehicle.precio, deletedVehicle.porcentajeDescuento/100, 'subtract');
    }

    const handleInputChangeCart = (event) => {
        const { name, value } = event.target;
        setCartVehicle({
            ...cartVehicle,
            [name]: value
        });
    }

    const handleOnBlurCartVehicle = (event) => {
        const { name } = event.target;
        validateCartVehicleOnBlur(cartVehicle, name);
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

    const filteredSales = applySortFilter(sales, getComparator(order, orderBy), filterName, filterField, 'ventas');
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - sales.length) : 0;
    const isNotFound = !filteredSales.length && !!filterName;

    const [saleError, setSaleError] = React.useState(emptyError);
    const [cartVehicleError, setCartVehicleError] = React.useState(emptyErrorCartVehicle);

    const getSaleError = () => {
        setSaleError(emptyError)
    }

    const validateSaleOnSubmit = () => {
        const updatedErrors = {};
        Object.keys(saleError).forEach((name) => {
            updatedErrors[name] = checkSale(sale, name);
        });
        setSaleError(updatedErrors);
        return Object.values(updatedErrors).some((error) => error !== '');
    }

    const validateSaleOnBlur = (sale, name) => {
        setSaleError({...saleError, [name]: checkSale(sale, name)});
    }

    const getCartVehicleError = () => {
        setCartVehicleError(emptyErrorCartVehicle)
    }

    const validateCartVehicleOnSubmit = () => {
        const updatedErrors = {};
        Object.keys(cartVehicleError).forEach((name) => {
            updatedErrors[name] = checkSale(cartVehicle, name);
        });
        setCartVehicleError(updatedErrors);
        return Object.values(updatedErrors).some((error) => error !== '');
    }

    const validateCartVehicleOnBlur = (cartVehicle, name) => {
        setCartVehicleError({...cartVehicleError, [name]: checkSale(cartVehicle, name)});
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
            cart,
            handleInputChangeCart,
            addCartVehicle,
            cartVehicle,
            vehicles,
            deleteCartVehicle,
            handleOnBlurCartVehicle,
            cartVehicleError,
            getCartVehicleError,
            total,
            extras
        }}>
            {props.children}
        </SaleContext.Provider>
    )


}