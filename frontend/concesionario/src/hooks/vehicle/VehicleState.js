import propTypes from "prop-types";
import React, {useState} from "react";
import VehicleContext from './VehicleContext';
import {checkVehicle} from "./VehicleValidation";
import {applySortFilter, getComparator} from "../filter/Filter";
import {getAllVehiculos, getVehiculo, createVehiculo, updateVehiculo, deleteVehiculo} from "../../api/Vehiculo.api";
import {getAllModelos} from "../../api/Modelo.api";
import {getAllColors} from "../../api/Colors.api";
import { getAllSucursales} from "../../api/Sucursal.api";


VehicleState.propTypes = {
    children: propTypes.node,
}

export function VehicleState(props) {

    const TABLE_HEAD = [
        { id: 'vin', label: 'vin', alignRight: false },
        { id: 'modelo', label: 'modelo', alignRight: false },
        { id: 'sucursal', label: 'sucursal', alignRight: false },
        { id: 'color', label: 'color', alignRight: false },
        { id: 'disponible', label: 'disponible', alignRight: false },
        { id: '' },
    ];

    const FILTER_OPTIONS = [
        {id: 'vin', label: 'vin', type: 'text'},
        {id: 'nombreModelo', label: 'modelo', type: 'text'},
        {id: 'nombreSucursal', label: 'sucursal', type: 'text'},
        {id: 'nombreColor', label: 'color', type: 'text'},
    ];

    const emptyVehicle = {
        vin: "",
        modelo: "",
        sucursal: "",
        color: "",
    }
    const emptyError = {
        vin: "",
        modelo: "",
        sucursal: "",
        color: "",
    }

    const [vehicle, setVehicle] = React.useState(emptyVehicle);
    const [vehicles, setVehicles] = React.useState([]);
    const [openForm, setOpenForm] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [messageSnackbar, setMessageSnackbar] = useState('');
    const [typeSnackbar, setTypeSnackbar] = useState('success');
    const [models, setModels] = useState([]);
    const [colors, setColors] = useState([]);
    const [branches, setBranches] = useState([]);


    const getBranches = async () => {

        try
        {
            const response = await getAllSucursales();
            setBranches(response.data);
        }
        catch (error)
        {
            setTypeSnackbar('error');
            setMessageSnackbar('sucursales.mensaje.errorListando');
            handleOpenSnackbar();
        }
    }

    const getColors = async () => {

        try
        {
            const response = await getAllColors();
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
            const response = await getAllModelos();
            setModels(response.data);
        }
        catch (error)
        {
            setTypeSnackbar('error');
            setMessageSnackbar('modelos.mensaje.errorListando');
            handleOpenSnackbar();
        }
    }


    const getVehicles = async () => {
        try
        {
            const response = await getAllVehiculos();
            setVehicles(response.data);

        }
        catch (error)
        {
            setTypeSnackbar('error');
            setMessageSnackbar('empleados.mensaje.errorListando');
            handleOpenSnackbar();
        }
    }

    const getVehicle = async (vin) => {

        if (vin === null)
        {
            setEdit(false);
            setVehicle(emptyVehicle);
        }
        else
        {
            setEdit(true);
            try
            {
                const response = await getVehiculo(vin);
                setVehicle(response.data);
            }
            catch (error)
            {
                setTypeSnackbar('error');
                setMessageSnackbar('vehiculos.mensaje.errorCargando');
                handleOpenSnackbar();
            }
        }
    }

    const addVehicle = async (vehicle) => {

        try
        {
            const response = await createVehiculo(vehicle);
            setVehicles([...vehicles, response.data]);
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
                setVehicleError({...vehicleError, vin: 'Vin ya existe'});
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

    const updateVehicle = async (vehicle) => {

        try
        {
            await updateVehiculo(vehicle.vin, vehicle);
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

    const deleteVehicle = async (vehicle) => {

        try
        {
            await deleteVehiculo(vehicle.vin);
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
        setVehicle({
            ...vehicle,
            [name]: value
        });
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateVehicleOnSubmit()) {
            if(edit)
            {
                updateVehicle(vehicle).then(() => getVehicles());
            }
            else
            {
                addVehicle(vehicle).then(() => getVehicles());
            }
        }
    }
    const handleOnBlur = (event) => {
        const {name} = event.target;
        validateVehicleOnBlur(vehicle, name);
    }

    const handleDelete = (event) => {
        event.preventDefault();
        deleteVehicle(vehicle).then(() => getVehicles());
        handleCloseDelete();
    }
    const handleOpenForm = async (event, vin) => {
        getVehicleError();
        await getBranches();
        await getColors();
        await getModels();
        await getVehicle(vin);
        setOpenForm(true)
    };
    const handleCloseForm = () => {
        setOpenForm(false);
    };
    const handleOpenDelete = (event, vin) => {
        getVehicle(vin).then(() => setOpenDelete(true));
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
    const [orderBy, setOrderBy] = useState('vin');
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
    const [filterField, setFilterField] = React.useState('vin');

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

    const filteredVehicles = applySortFilter(vehicles, getComparator(order, orderBy), filterName, filterField);
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - vehicles.length) : 0;
    const isNotFound = !filteredVehicles.length && !!filterName;

    const [vehicleError, setVehicleError] = React.useState(emptyError);

    const getVehicleError = () => {
        setVehicleError(emptyError)
    }

    const validateVehicleOnSubmit = () => {
        const updatedErrors = {};
        Object.keys(vehicleError).forEach((name) => {
            updatedErrors[name] = checkVehicle(vehicle, name);
        });
        setVehicleError(updatedErrors);
        return Object.values(updatedErrors).some((error) => error !== '');
    };
    const validateVehicleOnBlur = (vehicle, name) => {
        setVehicleError({...vehicleError, [name]: checkVehicle(vehicle, name)});
    };

    return (
        <VehicleContext.Provider value={
            {
                TABLE_HEAD,
                FILTER_OPTIONS,
                vehicle,
                vehicles,
                models,
                colors,
                branches,
                openForm,
                edit,
                openSnackbar,
                messageSnackbar,
                typeSnackbar,
                openDelete,
                getVehicles,
                getBranches,
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
                filteredVehicles,
                emptyRows,
                isNotFound,
                handleRequestSort,
                handleClick,
                handleChangePage,
                handleChangeRowsPerPage,
                handleFilterByName,
                vehicleError,
                filterField,
                handleFilterField,
                openFilter,
                handleOpenFilter,
                handleCloseFilter}}>
            {props.children}
        </VehicleContext.Provider>
    )
}



