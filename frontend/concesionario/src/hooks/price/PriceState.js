import propTypes from "prop-types";
import React, { useContext, useState } from "react";
import PriceContext from "./PriceContext";
import {checkSale} from "./PriceValidation";
import {applySortFilter, getComparator} from "../filter/Filter";
import { getAllExtras } from "../../api/Extra.api";
import AuthContext from "../auth/AuthContext";
import {getAllColors} from "../../api/Colors.api";
import {getAllModelos} from "../../api/Modelo.api";
import {createCotizacion, getAllCotizaciones, getCotizacion, updateCotizacion} from "../../api/Cotizacion.api";

PriceState.propTypes = {
    children: propTypes.node,
};

export default function PriceState(props) {

    const {authTokens, user} = useContext(AuthContext);

    const TABLE_HEAD = [
        { id: "id", label: "ID", alignRight: false },
        { id: "cedulaCliente", label: "cliente", alignRight: false },
        { id: "nombreCliente", label: "nombreCliente", alignRight: false },
        { id: "cedulaVendedor", label: "vendedor", alignRight: false },
        { id: "nombreVendedor", label: "nombreVendedor", alignRight: false },
        { id: "fechaCotizacion", label: "fecha", alignRight: false },
        { id: "valorCotizacion", label: "valor", alignRight: false },
        { id: "cotizacionModelo", label: "modelos", alignRight: false },
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
        fechaCotizacion: new Date().toISOString().split('T')[0],
        cotizacionModelo: [],
    };

    const emptyCartModel = {
        id: "",
        modelo: "",
        color: "",
        extra: "",
    }

    const emptyError = {
        id: "",
        cedulaCliente: "",
        cedulaVendedor: "",
        fechaVenta: "",
        fechaCotizacion: "",
        cotizacionModelo: ""
    };

    const emptyErrorCartModel = {
        id: "",
        modelo: "",
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
    const [total, setTotal] = React.useState(0);

    const getExtras = async () => {
        try {
            const response = await getAllExtras(authTokens.access);
            setExtras(response.data);

        } catch (error) {
            setTypeSnackbar('error');
            setMessageSnackbar('cotizaciones.mensaje.errorListandoExtras');
            handleOpenSnackbar();
        }
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
            setMessageSnackbar('cotizaciones.mensaje.errorListandoColores');
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
            setMessageSnackbar('cotizaciones.mensaje.errorListandoModelos');
            handleOpenSnackbar();
        }
    }

    const getPrices = async () => {
        try {
            const response = await getAllCotizaciones(authTokens.access);
            setPrices(response.data);
        
        } catch (error) {
            console.log(error);
            setTypeSnackbar('error');
            setMessageSnackbar('cotizaciones.mensaje.errorListando');
            handleOpenSnackbar();
        }
    }

    const getPrice = async (id) => {
        if (id === null) {
            setEdit(false);
            setPrice(emptyPrice);
            setTotal(0);
        }
        else {
            setEdit(true);
            try {
                const response = await getCotizacion(id, authTokens.access);
                if (response.status === 200) {
                    setPrice(response.data);
                    const modelsInCart = response.data.cotizacionModelo.map((item) => { return {...item, id: item.idCotizacionModelo}});
                    setCart(modelsInCart);
                    const total = modelsInCart.reduce((acc, item) => acc + (parseFloat(item.precioBase) * (1 + parseFloat(item.porcentajeIncrementoColor))), 0);
                    setTotal(total);
                }

            } catch (error) {
                console.log(error);
                setTypeSnackbar('error');
                setMessageSnackbar('cotizaciones.mensaje.errorCargando');
                handleOpenSnackbar();
            }
        }

    }

    const addPrice = async (price) => {
        try {
            const response = await createCotizacion(price, authTokens.access);
            setPrices([...prices, response.data]);
            setTypeSnackbar('success');
            setMessageSnackbar('cotizaciones.mensaje.agregado');
            handleOpenSnackbar();
            handleCloseForm();
    
        } catch (error) {
            if (error.response.data.cedulaCliente) {
                setTypeSnackbar('error');
                setMessageSnackbar('cotizaciones.mensaje.errorCliente');
                handleOpenSnackbar();

            } else if (error.response.data.cedulaVendedor) {
                setTypeSnackbar('error');
                setMessageSnackbar('cotizaciones.mensaje.errorVendedor');
                handleOpenSnackbar();
            }

            else if (error.response.data.fechaCotizacion) {
                setTypeSnackbar('error');
                setMessageSnackbar(error.response.data.fechaCotizacion);
                handleOpenSnackbar();
            
            } else {
            console.log(error);
            setTypeSnackbar('error');
            setMessageSnackbar('cotizaciones.mensaje.error');
            handleOpenSnackbar();
            }
        }
    }

    const updatePrice = async (price) => {
            
    }

    const updateTotal = (vehiclePrice, colorIncrement, operation) => {
        if (operation === 'add') {
            const totalAux = parseFloat(total) + (parseFloat(vehiclePrice) * (1 + parseFloat(colorIncrement)));
            setTotal(totalAux);
        }
        else if (operation === 'subtract') {
            const totalAux = parseFloat(total) - (parseFloat(vehiclePrice) * (1 + parseFloat(colorIncrement)));
            setTotal(totalAux);
        }
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
            if(price.cotizacionModelo.length === 0)
            {
                setTypeSnackbar('error');
                setMessageSnackbar('cotizaciones.mensaje.errorModelos');
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
        getCartModelError();
        getPriceError();
        await getModels();
        await getColors();
        await getExtras();
        await getPrice(id);
        setOpenForm(true);
    }

    const handleCloseForm = () => {
        setCart([]);
        setCartModel(emptyCartModel);
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
    const [cartModel, setCartModel] = React.useState(emptyCartModel);

    const getCart = async () => {

    }

    const addCartModel = (event) => {

        event.preventDefault();
        if (!validateCartModelOnSubmit())
        {
            if (cart.map((item) => item.id).includes(cartModel.modelo.id + cartModel.color.idColor))
            {
                setTypeSnackbar('error');
                setMessageSnackbar('cotizaciones.mensaje.errorModelo');
                handleOpenSnackbar();
                return;
            }
            {
                const cartModel1 = {
                    id: cartModel.modelo.id + cartModel.color.idColor,
                    idModelo: cartModel.modelo.id,
                    nombreModelo: cartModel.modelo.nombre,
                    precioBase: cartModel.modelo.precioBase,
                    idColor: cartModel.color.idColor,
                    color: cartModel.color.colorNombre,
                    hexadecimalColor: cartModel.color.hexadecimalColor,
                    porcentajeIncrementoColor: cartModel.color.porcentajeIncrementoColor,
                    idExtra: cartModel.extra.id,
                    nombreExtra: cartModel.extra.nombreExtra,
                };

                setCart([...cart, cartModel1]);
                setCartModel(emptyCartModel);
                setPrice({...price, cotizacionModelo: [...price.cotizacionModelo, cartModel1]})
                updateTotal(cartModel.modelo.precioBase, cartModel.color.porcentajeIncrementoColor, 'add');
            }
        }
    }

    const deleteCartModel = async (event, vin) => {
        event.preventDefault();

        const cartAux = cart.filter((item) => item.id !== vin);
        setCart(cartAux);
        setPrice({...price, cotizacionModelo: cartAux});

        const deletedModel = cart.find((item) => item.id === vin);
        updateTotal(deletedModel.precioBase, deletedModel.porcentajeIncrementoColor, 'subtract');
    }

    const handleInputChangeCart = (event) => {
        const { name, value } = event.target;
        setCartModel({
            ...cartModel,
            [name]: value
        });
    }

    const handleOnBlurCartModel = (event) => {
        const { name } = event.target;
        validateCartModelOnBlur(cartModel, name);
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
    const [cartModelError, setCartModelError] = React.useState(emptyErrorCartModel);

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

    const getCartModelError = () => {
        setCartModelError(emptyErrorCartModel)
    }

    const validateCartModelOnSubmit = () => {
        const updatedErrors = {};
        Object.keys(cartModelError).forEach((name) => {
            updatedErrors[name] = checkSale(cartModel, name);
        });
        setCartModelError(updatedErrors);
        return Object.values(updatedErrors).some((error) => error !== '');
    }

    const validateCartModelOnBlur = (cartVehicle, name) => {
        setCartModelError({...cartModelError, [name]: checkSale(cartVehicle, name)});
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
            cartModel,
            models,
            colors,
            deleteCartModel,
            handleOnBlurCartModel,
            cartModelError,
            getCartModelError,
            validateCartModelOnSubmit,
            total,
            extras
        }}>
            {props.children}
        </PriceContext.Provider>
    )


}