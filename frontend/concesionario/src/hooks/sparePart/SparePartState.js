import propTypes from "prop-types";
import React, {useContext, useState} from "react";
import SparePartContext from './SparePartContext';
import {checkSparePart} from "./SparePartValidation";
import {applySortFilter, getComparator} from "../filter/Filter";
import {getAllVehiculos, getVehiculo, createVehiculo, updateVehiculo, deleteVehiculo} from "../../api/Vehiculo.api";
import {getAllModelos} from "../../api/Modelo.api";
import { getAllSucursales} from "../../api/Sucursal.api";
import {getAllRepuestos, getRepuesto, createRepuesto, updateRepuesto, deleteRepuesto} from "../../api/Repuesto.api";
import AuthContext from "../auth/AuthContext";


SparePartState.propTypes = {
    children: propTypes.node,
}

export default function SparePartState(props) {
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
        id: "",
        nombre: "",
        precio: "",
        descripcion: "",
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
    const [searchModel, setSearchModel] = useState('');

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

    const handleSearchModel = (event) => {;
        setSearchModel(event.target.value);
    };

    const filteredModels = models.filter((option) =>
        option.nombre.toLowerCase().includes(searchModel.toLowerCase())
    );

    const getSpareParts = async () => {

      try
        {
             const response = await getAllRepuestos(authTokens.access);
             setSpareParts(response.data);
             console.log(response.data)
         }
         catch (error)
         {
             setTypeSnackbar('error');
             setMessageSnackbar('empleados.mensaje.errorListando');
             handleOpenSnackbar();
         }
    }

    const getSparePart = async (id) => {

        if (id == null)
        {
            setEdit(false);
            setSparePart(emptySparePart);
        }
        else
        {
            setEdit(true);
            try
            {
                const response = await getRepuesto(id, authTokens.access);
                setSparePart(response.data);
            }
            catch (error)
            {
                setTypeSnackbar('error');
                setMessageSnackbar('repuestos.mensaje.errorCargando');
                handleOpenSnackbar();
            }
        }
    }

    const addSparePart = async (sparePart) => {

        try{
            console.log(sparePart)
            const response = await createRepuesto(sparePart, authTokens.access);
            setSpareParts([...spareParts, response.data])
            setTypeSnackbar('success');
            setMessageSnackbar('repuestos.mensaje.agregado');
            handleOpenSnackbar();
            handleCloseForm();
        }
        catch (error)
        {
            const errors = error.response.data;
            if(errors.nombre)
            {
                setTypeSnackbar('error');
                setMessageSnackbar('repuestos.mensaje.errorNombre');
                handleOpenSnackbar();
                setSparePartError({...sparePartError, nombre: "Ya existe un repuesto con el nombre ingresado"});
            }
            else if(errors.precio)
            {
                setTypeSnackbar('error');
                setMessageSnackbar('repuestos.mensaje.errorPrecio');
                handleOpenSnackbar();
                setSparePartError({...sparePartError, precio: "El precio del repuesto debe ser mayor a 0"});
            }
            else
            {
                setTypeSnackbar('error');
                setMessageSnackbar('repuestos.mensaje.error');
                handleOpenSnackbar();
            }
        }
    }

    const updateSparePart = async (sparePart) => {

        try
        {
            await updateVehiculo(sparePart.vin, sparePart, authTokens.access);
            setTypeSnackbar('success');
            setMessageSnackbar('vehiculos.mensaje.actualizado');
            handleOpenSnackbar();
            handleCloseForm();
        }
        catch (error)
        {
            setTypeSnackbar('error');
            setMessageSnackbar('vehiculos.mensaje.errorActualizar');
            handleOpenSnackbar();
        }
    }

    const deleteSparePart = async (sparePart) => {

        try
        {
            await deleteRepuesto(sparePart.id, authTokens.access);
            setTypeSnackbar('success');
            setMessageSnackbar('repuestos.mensaje.eliminado');
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
                setMessageSnackbar('repuestos.mensaje.errorEliminar');
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
        if (!validateSparePartOnSubmit()) {

            const modelsObjects = sparePart.modelos.map((id) => ({ idModelo: id }));

            const a = {...sparePart, modelos: modelsObjects}

            if(edit)
            {
                updateSparePart(a).then(() => getSpareParts());
            }
            else
            {
                addSparePart(a).then(() => getSpareParts());
            }
        }
    }

    const handleOnBlur = (event, name) => {
        if (name === undefined || name === null)
        {
            const {name} = event.target;
            validateSparePartOnBlur(sparePart, name);
        }
        validateSparePartOnBlur(sparePart, name);
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
        setSearchModel('');
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

    const handleDeleteChip = (id) => {
        const auxSparePart = {...sparePart, modelos: sparePart.modelos.filter((modelId) => modelId !== id)};
        setSparePart(auxSparePart);
        validateSparePartOnBlur(auxSparePart, 'modelos')
    };

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

    const validateSparePartOnSubmit = () => {
        const updatedErrors = {};
        Object.keys(sparePartError).forEach((name) => {
            updatedErrors[name] = checkSparePart(sparePart, name);
        });
        setSparePartError(updatedErrors);
        return Object.values(updatedErrors).some((error) => error !== '');
    };
    const validateSparePartOnBlur = (sparePart, name) => {
        setSparePartError({...sparePartError, [name]: checkSparePart(sparePart, name)});
    };

    const [openInventoryForm, setOpenInventoryForm] = useState(false);
    const [inventory, setInventory] = useState([]);
    const [subtitle, setSubtitle] = useState('');

    const getInventory = async (id) => {
        setInventory([
            {
                id: 1,
                sucursal: "Sucursal 1",
                cantidad: 10,
            },
            {
                id: 2,
                sucursal: "Sucursal 2",
                cantidad: 20,
            },
            {
                id: 3,
                sucursal: "Sucursal 3",
                cantidad: 30,
            },
            {
                id: 4,
                sucursal: "Sucursal 4",
                cantidad: 40,
            },
            {
                id: 5,
                sucursal: "Sucursal 5",
                cantidad: 50,
            }])
    }

    const handleOpenInventoryForm = (e, id, name) => {
        getSparePart(id).then(()=>getInventory(id).then(() => setOpenInventoryForm(true)))
        setSubtitle(name)
    }

    const handleCloseInventoryForm = () => {
        setSubtitle('')
        setInventory([])
        setOpenInventoryForm(false);
    }

    const handleInputChangeInventory = (event, id) => {
        const { name, value } = event.target;

        const isValidNumber = (/^[0-9]+$/.test(value) || value === '') && value !== 'e' && value !== 'E' && value !== '-' && value !== '+';

        if (isValidNumber) {
            setInventory((prevFilas) =>
                prevFilas.map((fila) =>
                    fila.id === id ? { ...fila, [name]: value } : fila
                )
            );
        }
    };

    const handleSubmitInventory = (event) => {
        event.preventDefault();
    }


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
                handleCloseFilter,
                inventory,
                subtitle,
                openInventoryForm,
                handleInputChangeInventory,
                handleSubmitInventory,
                handleCloseInventoryForm,
                handleOpenInventoryForm,
                handleDeleteChip,
                searchModel,
                handleSearchModel,
                filteredModels}}>
            {props.children}
        </SparePartContext.Provider>
    )
}



