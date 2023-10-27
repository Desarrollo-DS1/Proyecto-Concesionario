import React, {useState} from "react";
import MODELIST from '../../_mock/model';
import ModelContext from './ModelContext';
import {checkCustomer} from "./ModelValidation";
import {applySortFilter, getComparator} from "../filter/Filter";


export function ModelState(props) {

    const TABLE_HEAD = [
        { id: 'nombre', label: 'Nombre', alignRight: false },
        { id: 'año', label: 'Año', alignRight: false },
        { id: 'carroceria', label: 'Carroceria', alignRight: false },
        { id: 'cilindraje', label: 'Cilindraje', alignRight: false },
        { id: 'potencia', label: 'Potencia', alignRight: false },
        { id: 'combustible', label: 'Combustible', alignRight: false },
        { id: 'numeroPasajeros', label: 'Numero Pasajeros', alignRight: false },
        { id: 'precioBase', label: 'Precio Base', alignRight: false },
        { id: '' },
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

    const [model, setModel] = React.useState(emptyModel);
    const [models, setModels] = React.useState([]);
    const [openForm, setOpenForm] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [messageSnackbar, setMessageSnackbar] = useState('');
    const [typeSnackbar, setTypeSnackbar] = useState('success');

    const getModels = () => {
        setModels(MODELIST);
    }
    const getModel = (id) => {
        const model = models.find(model => model.cedula === id);
        if(model)
        {
            setModel(model)
            setEdit(true)
        }
        else
        {
            setModel(emptyModel)
            setEdit(false)
        }
    }
    const addModel = (model) => {
        setModels([...models, model])
    }
    const updateModel = (model) => {
        setModels(models.map((item) => (item.id === model.id ? model : item)))
    }
    const deleteModel = (model) => {
        setModels(models.filter((item) => item.id !== model.id))
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
                updateModel(model);
                setMessageSnackbar('Modelo actualizado correctamente');
                setTypeSnackbar('success');
            }
            else
            {
                addModel(model);
                setMessageSnackbar('Modelo agregado correctamente');
                setTypeSnackbar('success');
            }
            handleOpenSnackbar();
            handleCloseForm();
        }
    }
    const handleOnBlur = (event) => {
        const {name} = event.target;
        validateModelOnBlur(model, name);
    }
    const handleDelete = (event) => {
        event.preventDefault();
        deleteModel(model);
        setMessageSnackbar('Modelo eliminado correctamente');
        setTypeSnackbar('success');
        handleOpenSnackbar();
        handleCloseDelete();
    }
    const handleOpenForm = (event, cedula) => {
        getModelError();
        getModel(cedula);
        setOpenForm(true)
    };
    const handleCloseForm = () => {
        setOpenForm(false);
    };
    const handleOpenDelete = (event, id) => {
        getModel(id);
        setOpenDelete(true);
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

    const filteredModels = applySortFilter(models, getComparator(order, orderBy), filterName);
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - models.length) : 0;
    const isNotFound = !filteredModels.length && !!filterName;

    const [modelError, setModelError] = React.useState(emptyError);

    const getModelError = () => {
        setModelError(emptyError)
    }

    const validateModelOnSubmit = () => {
        const updatedErrors = {};
        Object.keys(modelError).forEach((name) => {
            updatedErrors[name] = checkCustomer(model, name);
        });
        setModelError(updatedErrors);
        return Object.values(updatedErrors).some((error) => error !== '');
    };
    const validateModelOnBlur = (model, name) => {
        setModelError({...modelError, [name]: checkCustomer(model, name)});
    };

    return (
        <ModelContext.Provider value={
            {
                TABLE_HEAD,
                model,
                models,
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
                modelError}}>
            {props.children}
        </ModelContext.Provider>
    )
}



