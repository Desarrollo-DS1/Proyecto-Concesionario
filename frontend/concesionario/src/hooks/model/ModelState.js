import propTypes from "prop-types";
import React, {useContext, useState} from "react";
// import MODELIST from '../../_mock/model';
import ModelContext from './ModelContext';
import {checkModel} from "./ModelValidation";
import {applySortFilter, getComparator} from "../filter/Filter"; 
import {getAllModelos, createModelo, deleteModelo, updateModelo, getModelo} from "../../api/Modelo.api";
import AuthContext from "../auth/AuthContext";

ModelState.propTypes = {
    children: propTypes.node,
}

export function ModelState(props) {
    const {authTokens} = useContext(AuthContext);

    const TABLE_HEAD = [
        { id: 'nombre', label: 'nombre', alignRight: false },
        { id: 'año', label: 'año', alignRight: false },
        { id: 'carroceria', label: 'carroceria', alignRight: false },
        { id: 'cilindraje', label: 'cilindraje', alignRight: false },
        { id: 'potencia', label: 'potencia', alignRight: false },
        { id: 'combustible', label: 'combustible', alignRight: false },
        { id: 'numeroPasajeros', label: 'capacidad', alignRight: false },
        { id: 'precioBase', label: 'precioBase', alignRight: false },
        { id: '' },
    ];

    const FILTER_OPTIONS = [
        { id: 'nombre', label: 'nombre' },
        { id: 'año', label: 'año' },
        { id: 'carroceria', label: 'carroceria' },
        { id: 'cilindraje', label: 'cilindraje' },
        { id: 'potencia', label: 'potencia' },
        { id: 'combustible', label: 'combustible' },
        { id: 'numeroPasajeros', label: 'capacidad' },
        { id: 'precioBase', label: 'precioBase' },
    ];

    const emptyModel = {
        id: "",
        nombre: "",
        año: "",
        carroceria: "",
        cilindraje: "",
        potencia: "",
        combustible: "",
        numeroPasajeros: "",
        precioBase: "",
    }
    const emptyError = {
        nombre: "",
        año: "",
        carroceria: "",
        cilindraje: "",
        potencia: "",
        combustible: "",
        numeroPasajeros: "",
        precioBase: "",
    }

    const initialBodyworks = [
        { id: '1', label: 'Sedan' },
        { id: '2', label: 'Hatchback' },
        { id: '3', label: 'Station Wagon' },
        { id: '4', label: 'Pickup' },
        { id: '5', label: 'SUV' },
        { id: '6', label: 'Van' },
        { id: '7', label: 'Convertible' },
        { id: '8', label: 'Coupe' },
        { id: '9', label: 'Roadster' },
        { id: '10', label: 'Camion' },
        { id: '11', label: 'Camioneta' },
        { id: '12', label: 'Bus' },
        { id: '13', label: 'Minivan' },
        { id: '14', label: 'Microbus' },
        { id: '15', label: 'Micro' },
        { id: '16', label: 'Tracto Camion' },
        { id: '17', label: 'Trailer' },]

    const initialFuels = [
        { id: '1', label: 'Gasolina' },
        { id: '2', label: 'Diesel' },
        { id: '3', label: 'Eléctrico' },
        { id: '4', label: 'Híbrido' },
        { id: '5', label: 'Gas' },
        { id: '6', label: 'Gas Natural' },
        { id: '7', label: 'Gas Licuado' },]

    const [model, setModel] = React.useState(emptyModel);
    const [models, setModels] = React.useState([]);
    const [openForm, setOpenForm] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [messageSnackbar, setMessageSnackbar] = useState('');
    const [typeSnackbar, setTypeSnackbar] = useState('success');
    const [bodyworks] = useState(initialBodyworks);
    const [fuels] = useState(initialFuels);
    
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
   
    const getModel = async (id) => {

        if(id == null)
        {
            setEdit(false);
            setModel(emptyModel);
        }
        else 
        {
            setEdit(true);
            try
            {
                const response = await getModelo(id, authTokens.access);
                setModel(response.data);
            }
            catch (error)
            {
                setTypeSnackbar('error');
                setMessageSnackbar('modelos.mensaje.errorCargando');
                handleOpenSnackbar();
            }
        }
    }



    const addModel = async (model) => {

        try
        {
            const response = await createModelo(model, authTokens.access); 
            setModels([...models, response.data]);
            setTypeSnackbar('success');
            setMessageSnackbar('modelos.mensaje.agregado');
            handleOpenSnackbar();
            handleCloseForm();
        }
        catch (error)
        {
            const errors = error.response.data;
            if(errors.nombre)
            {
                setTypeSnackbar('error');
                setMessageSnackbar('modelos.mensaje.errorNombre');
                handleOpenSnackbar();
                setModelError({...modelError, nombre: 'Ya existe un modelo con ese nombre'});
            }
            else
            {
                setTypeSnackbar('error');
                setMessageSnackbar('modelos.mensaje.error');
                handleOpenSnackbar();
            }
        }
    }

    const updateModel = async (model) => {

        try
        {
            await updateModelo(model.id, model, authTokens.access);
            setTypeSnackbar('success');
            setMessageSnackbar('modelos.mensaje.editado');
            handleOpenSnackbar();
            handleCloseForm();
        }
        catch (error)
        {
            const errors = error.response.data;
            if(errors.nombre)
            {
                setTypeSnackbar('error');
                setMessageSnackbar('modelos.mensaje.errorNombre');
                handleOpenSnackbar();
                setModelError({...modelError, nombre: 'Ya existe un modelo con ese nombre'});
            }
            else
            {
                setTypeSnackbar('error');
                setMessageSnackbar('modelos.mensaje.errorEditar');
                handleOpenSnackbar();
            }
        }
    }

    const deleteModel = async (model) => {

        try
        {
            await deleteModelo(model.id, authTokens.access);
            setTypeSnackbar('success');
            setMessageSnackbar('modelos.mensaje.eliminado');
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
            }
            else
            {
                setTypeSnackbar('error');
                setMessageSnackbar('modelos.mensaje.errorEliminar');
                handleOpenSnackbar();
            }
        }
    }
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setModel({
            ...model,
            [name]: value
        });
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateModelOnSubmit()) {
            if(edit)
            {
                updateModel(model).then(() => getModels());
            }
            else
            {
                addModel(model).then(() => getModels());
            }
        }
    }

    const handleOnBlur = (event) => {
        const {name} = event.target;
        validateModelOnBlur(model, name);
    }

    const handleDelete = (event) => {
        event.preventDefault();
        deleteModel(model).then(() => getModels());
        handleCloseDelete();
    }

    const handleOpenForm = (event, cedula) => {
        getModelError();
        getModel(cedula).then(() => setOpenForm(true));
    };

    const handleCloseForm = () => {
        setOpenForm(false);
    };
    const handleOpenDelete = (event, id) => {
        getModel(id).then(() => setOpenDelete(true));
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
    const [orderBy, setOrderBy] = useState('nombre');
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

    const filteredModels = applySortFilter(models, getComparator(order, orderBy), filterName, filterField);
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - models.length) : 0;
    const isNotFound = !filteredModels.length && !!filterName;

    const [modelError, setModelError] = React.useState(emptyError);

    const getModelError = () => {
        setModelError(emptyError)
    }

    const validateModelOnSubmit = () => {
        const updatedErrors = {};
        Object.keys(modelError).forEach((name) => {
            updatedErrors[name] = checkModel(model, name);
        });
        setModelError(updatedErrors);
        return Object.values(updatedErrors).some((error) => error !== '');
    };
    const validateModelOnBlur = (model, name) => {
        setModelError({...modelError, [name]: checkModel(model, name)});
    };

    return (
        <ModelContext.Provider value={
            {
                TABLE_HEAD,
                FILTER_OPTIONS,
                model,
                models,
                bodyworks,
                fuels,
                openForm,
                edit,
                openSnackbar,
                messageSnackbar,
                typeSnackbar,
                openDelete,
                getModels,
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
                filteredModels,
                emptyRows,
                isNotFound,
                handleRequestSort,
                handleClick,
                handleChangePage,
                handleChangeRowsPerPage,
                handleFilterByName,
                modelError,
                filterField,
                handleFilterField,
                openFilter,
                handleOpenFilter,
                handleCloseFilter}}>
            {props.children}
        </ModelContext.Provider>
    )
}