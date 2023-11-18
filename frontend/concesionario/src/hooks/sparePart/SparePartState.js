import propTypes from "prop-types";
import React, {useContext, useState} from "react";
import SparePartContext from './SparePartContext';
import {checkVehicle} from "./SparePartValidation";
import {applySortFilter, getComparator} from "../filter/Filter";
import {getAllVehiculos, getVehiculo, createVehiculo, updateVehiculo, deleteVehiculo} from "../../api/Vehiculo.api";
import {getAllModelos} from "../../api/Modelo.api";
import { getAllSucursales} from "../../api/Sucursal.api";
import AuthContext from "../auth/AuthContext";


SparePartState.propTypes = {
    children: propTypes.node,
}

export function SparePartState(props) {
    const {authTokens} = useContext(AuthContext);

    const TABLE_HEAD = [
        { id: 'id', label: 'id', alignRight: false },
        { id: 'nombre', label: 'nombre', alignRight: false },
        { id: 'precio', label: 'precio', alignRight: false },
        { id: 'modelos', label: 'modelos', alignRight: false },
        { id: '' },
    ];

    const FILTER_OPTIONS = [
        { id: 'id', label: 'id'},
        { id: 'nombre', label: 'nombre'},
        { id: 'precio', label: 'precio'},
    ];

    const emptySparePart = {
        nombre: "",
        precio: "",
        modelos: [],
    }
    const emptyError = {
        nombre: "",
        precio: "",
        modelos: "",
    }

    const [sparePart, setSparePart] = React.useState(emptySparePart);
    const [spareParts, setSpareParts] = React.useState([]);
    const [openForm, setOpenForm] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [messageSnackbar, setMessageSnackbar] = useState('');
    const [typeSnackbar, setTypeSnackbar] = useState('success');
    const [models, setModels] = useState([]);

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


    const getSpareParts = async () => {

        const a = [{
            id: 1,
            nombre: "Tuerca",
            precio: "2000",
            modelos: [{id:1, nombre: "Chevrolet Spark"}, {id:2, nombre: "Chevrolet Sedan"}],
        },
            {
                id: 2,
                nombre: "Capo",
                precio: "30000",
                modelos: [{id:1, nombre: "Chevrolet Spark"}, {id:2, nombre: "Chevrolet Sedan"}],
            }]

        setSpareParts(a);

        // try
        // {
        //     const response = await getAllVehiculos(authTokens.access);
        //     setSpareParts(response.data);
        //
        // }
        // catch (error)
        // {
        //     setTypeSnackbar('error');
        //     setMessageSnackbar('empleados.mensaje.errorListando');
        //     handleOpenSnackbar();
        // }
    }

    const getSparePart = async (vin) => {

        if (vin === null)
        {
            setEdit(false);
            setSparePart(emptySparePart);
        }
        else
        {
            setEdit(true);
            try
            {
                const response = await getVehiculo(vin, authTokens.access);
                setSparePart(response.data);
            }
            catch (error)
            {
                setTypeSnackbar('error');
                setMessageSnackbar('vehiculos.mensaje.errorCargando');
                handleOpenSnackbar();
            }
        }
    }

    const addSparePart = async (vehicle) => {

        try
        {
            const response = await createVehiculo(vehicle, authTokens.access);
            setSpareParts([...spareParts, response.data]);
            setTypeSnackbar('success');
            setMessageSnackbar('vehiculos.mensaje.agregado');
            handleOpenSnackbar();
            handleCloseForm();

        }
        catch (error)
        {
            const errors = error.response.data;
            if(errors.vin)
            {
                setTypeSnackbar('error');
                setMessageSnackbar('vehiculos.mensaje.errorCedula');
                setSparePartError({...sparePartError, vin: 'Vin ya existe'});
                handleOpenSnackbar();

            }
            else
            {
                setTypeSnackbar('error');
                setMessageSnackbar('vehiculos.mensaje.error');
                handleOpenSnackbar();
            }
        }
    }

    const updateSparePart = async (vehicle) => {

        try
        {
            await updateVehiculo(vehicle.vin, vehicle, authTokens.access);
            setTypeSnackbar('success');
            setMessageSnackbar('vehiculos.mensaje.editado');
            handleOpenSnackbar();
            handleCloseForm();
        }
        catch (error)
        {
            setTypeSnackbar('error');
            setMessageSnackbar('vehiculos.mensaje.errorEditar');
            handleOpenSnackbar();
        }
    }

    const deleteSparePart = async (vehicle) => {

        try
        {
            await deleteVehiculo(vehicle.vin, authTokens.access);
            setTypeSnackbar('success');
            setMessageSnackbar('vehiculos.mensaje.eliminado');
            handleOpenSnackbar();

        }
        catch (error)
        {
            const errors = error.response.data;
            if(errors.protected)
            {
                setTypeSnackbar('error');
                setMessageSnackbar(errors.protected);
                handleOpenSnackbar();

            } else
            {
                setTypeSnackbar('error');
                setMessageSnackbar('vehiculo.mensaje.errorEliminar');
                handleOpenSnackbar();
            }
        }
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSparePart({
            ...sparePart,
            [name]: value
        });
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateVehicleOnSubmit()) {
            if(edit)
            {
                updateSparePart(sparePart).then(() => getSpareParts());
            }
            else
            {
                addSparePart(sparePart).then(() => getSpareParts());
            }
        }
    }
    const handleOnBlur = (event) => {
        const {name} = event.target;
        validateVehicleOnBlur(sparePart, name);
    }

    const handleDelete = (event) => {
        event.preventDefault();
        deleteSparePart(sparePart).then(() => getSpareParts());
        handleCloseDelete();
    }
    const handleOpenForm = async (event, vin) => {
        getSparePartError();
        await getModels();
        await getSparePart(vin);
        setOpenForm(true)
    };
    const handleCloseForm = () => {
        setOpenForm(false);
    };
    const handleOpenDelete = (event, vin) => {
        getSparePart(vin).then(() => setOpenDelete(true));
    }
    const handleCloseDelete = () => {
        setOpenDelete(false);
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
    const [orderBy, setOrderBy] = useState('id');
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
    const [filterField, setFilterField] = React.useState('nombre');

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

    const filteredSpareParts = applySortFilter(spareParts, getComparator(order, orderBy), filterName, filterField);
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - spareParts.length) : 0;
    const isNotFound = !filteredSpareParts.length && !!filterName;

    const [sparePartError, setSparePartError] = React.useState(emptyError);

    const getSparePartError = () => {
        setSparePartError(emptyError)
    }

    const validateVehicleOnSubmit = () => {
        const updatedErrors = {};
        Object.keys(sparePartError).forEach((name) => {
            updatedErrors[name] = checkVehicle(sparePart, name);
        });
        setSparePartError(updatedErrors);
        return Object.values(updatedErrors).some((error) => error !== '');
    };
    const validateVehicleOnBlur = (vehicle, name) => {
        setSparePartError({...sparePartError, [name]: checkVehicle(vehicle, name)});
    };

    return (
        <SparePartContext.Provider value={
            {
                TABLE_HEAD,
                FILTER_OPTIONS,
                sparePart,
                spareParts,
                models,
                openForm,
                edit,
                openSnackbar,
                messageSnackbar,
                typeSnackbar,
                openDelete,
                getSpareParts,
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
                filteredSpareParts,
                emptyRows,
                isNotFound,
                handleRequestSort,
                handleClick,
                handleChangePage,
                handleChangeRowsPerPage,
                handleFilterByName,
                sparePartError,
                filterField,
                handleFilterField,
                openFilter,
                handleOpenFilter,
                handleCloseFilter}}>
            {props.children}
        </SparePartContext.Provider>
    )
}



