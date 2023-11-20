import propTypes from "prop-types";
import React, {useContext, useState} from "react";
import WorkOrderContext from './WorkOrderContext';
import {checkSparePart} from "./WorkOrderValidation";
import {applySortFilter, getComparator} from "../filter/Filter";
import {getAllVehiculos, getVehiculo, createVehiculo, updateVehiculo, deleteVehiculo} from "../../api/Vehiculo.api";
import {getAllModelos} from "../../api/Modelo.api";
import { getAllSucursales} from "../../api/Sucursal.api";
import AuthContext from "../auth/AuthContext";


WorkOrderState.propTypes = {
    children: propTypes.node,
}

export function WorkOrderState(props) {
    const {authTokens} = useContext(AuthContext);

    const TABLE_HEAD = [
        { id: "id", label: "id", alignRight: false },
        { id: "cedulaCliente", label: "cliente", alignRight: false },
        { id: "nombreCliente", label: "nombreCliente", alignRight: false },
        { id: "fechaInicio", label: "fechaInicio", alignRight: false },
        { id: "fechaEsperada", label: "fechaEsperada", alignRight: false },
        { id: "modelo", label: "modelo", alignRight: false },
        { id: "placa", label: "placa", alignRight: false },
        { id: "estado", label: "estado", alignRight: false },
        { id: ""}
    ];

    const FILTER_OPTIONS = [
        { id: "id", label: "id"},
        { id: "cedulaCliente", label: "cliente"},
        { id: "cedulaVendedor", label: "vendedor"},
        { id: "fechaInicio", label: "fechaInicio"},
        { id: "fechaEsperada", label: "fechaEsperada"},
        { id: "modelo", label: "modelo"},
        { id: "placa", label: "modelo"},
        { id: "estado", label: "estado"},
    ];

    const emptyWorkOrder = {
        id: "",
        cedulaCliente: "",
        cedulaVendedor: "",
        modelo: "",
        fechaInicio: "",
        fechaEsperada: "",
        fechaEntrega: "",
        placa: "",
        estado: "",
        servicios: [],
        repuestos: [],
        comentario: "",
    }
    const emptyError = {
        id: "",
        cedulaCliente: "",
        cedulaVendedor: "",
        modelo: "",
        fechaInicio: "",
        fechaEsperada: "",
        fechaEntrega: "",
        placa: "",
        estado: "",
        comentario: "",
    }

    const [workOrder, setWorkOrder] = React.useState(emptyWorkOrder);
    const [workOrders, setWorkOrders] = React.useState([]);
    const [openForm, setOpenForm] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [messageSnackbar, setMessageSnackbar] = useState('');
    const [typeSnackbar, setTypeSnackbar] = useState('success');
    const [models, setModels] = useState([]);
    const [spareParts, setSpareParts] = useState([]);
    const [services, setServices] = useState([]);
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

        setWorkOrders(a);

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

    const handleSearchModel = (event) => {;
        setSearchModel(event.target.value);
    };

    const filteredModels = models.filter((option) =>
        option.nombre.toLowerCase().includes(searchModel.toLowerCase())
    );

    const getWorkOrders = async () => {

        const a = [{
            id: 1,
            cedulaCliente: 1110363276,
            nombreCliente: "Nicolas Herrera",
            fechaInicio: "2021-10-10",
            fechaEsperada: "2021-15-10",
            modelo: "Chevrolet Spark",
            placa: "ABC123",
            estado: false,
        },
            {
                id: 2,
                cedulaCliente: 1110345276,
                nombreCliente: "Julian Gomez",
                fechaInicio: "2021-10-10",
                fechaEsperada: "2021-18-10",
                modelo: "Chevrolet Rio",
                placa: "CDE456",
                estado: true,
            }]

        setWorkOrders(a);

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

    const getWorkOrder = async (id) => {

        const a = {
            id: 1,
            nombre: "Tuerca",
            precio: "2000",
            descripcion: "Tuerca para rueda",
            modelos: [1,2,7,3,4,5],
        }

        setWorkOrder(a);

        // if (vin === null)
        // {
        //     setEdit(false);
        //     setSparePart(emptySparePart);
        // }
        // else
        // {
        //     setEdit(true);
        //     try
        //     {
        //         const response = await getVehiculo(vin, authTokens.access);
        //         setSparePart(response.data);
        //     }
        //     catch (error)
        //     {
        //         setTypeSnackbar('error');
        //         setMessageSnackbar('vehiculos.mensaje.errorCargando');
        //         handleOpenSnackbar();
        //     }
        // }
    }

    const addWorkOrder = async (workOrder) => {

        try
        {
            const response = await createVehiculo(workOrder, authTokens.access);
            setWorkOrders([...workOrders, response.data]);
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
                setWoekOrderError({...woekOrderError, vin: 'Vin ya existe'});
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

    const updateWorkOrder = async (workOrder) => {

        try
        {
            await updateVehiculo(workOrder.vin, workOrder, authTokens.access);
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

    const deleteWorkOrder = async (workOrder) => {

        try
        {
            await deleteVehiculo(workOrder.vin, authTokens.access);
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
        setWorkOrder({
            ...workOrder,
            [name]: value
        });
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateWorkOrderOnSubmit()) {
            if(edit)
            {
                updateWorkOrder(workOrder).then(() => getWorkOrders());
            }
            else
            {
                addWorkOrder(workOrder).then(() => getWorkOrders());
            }
        }
    }
    const handleOnBlur = (event, name) => {
        if (name === undefined || name === null)
        {
            const {name} = event.target;
            validateWorkOrderOnBlur(workOrder, name);
        }
        validateWorkOrderOnBlur(workOrder, name);
    }

    const handleDelete = (event) => {
        event.preventDefault();
        deleteWorkOrder(workOrder).then(() => getWorkOrders());
        handleCloseDelete();
    }
    const handleOpenForm = async (event, vin) => {
        getWorkOrderError();
        await getModels();
        await getWorkOrder(vin);
        setOpenForm(true)
    };
    const handleCloseForm = () => {
        setSearchModel('');
        setOpenForm(false);
    };
    const handleOpenDelete = (event, vin) => {
        getWorkOrder(vin).then(() => setOpenDelete(true));
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
        const auxSparePart = {...workOrder, modelos: workOrder.modelos.filter((modelId) => modelId !== id)};
        setWorkOrder(auxSparePart);
        validateWorkOrderOnBlur(auxSparePart, 'modelos')
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

    const filteredWorkOrders = applySortFilter(workOrders, getComparator(order, orderBy), filterName, filterField);
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - workOrders.length) : 0;
    const isNotFound = !filteredWorkOrders.length && !!filterName;

    const [woekOrderError, setWoekOrderError] = React.useState(emptyError);

    const getWorkOrderError = () => {
        setWoekOrderError(emptyError)
    }

    const validateWorkOrderOnSubmit = () => {
        const updatedErrors = {};
        Object.keys(woekOrderError).forEach((name) => {
            updatedErrors[name] = checkSparePart(workOrder, name);
        });
        setWoekOrderError(updatedErrors);
        return Object.values(updatedErrors).some((error) => error !== '');
    };
    const validateWorkOrderOnBlur = (workOrder, name) => {
        setWoekOrderError({...woekOrderError, [name]: checkSparePart(workOrder, name)});
    };

    const [openServiceForm, setOpenServiceForm] = useState(false);
    const [service, setService] = useState([]);
    const [subtitle, setSubtitle] = useState('');

    const getService = async () => {
        setService([
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

    const handleOpenServiceForm = (e, id, name) => {
        getService().then(() => setOpenServiceForm(true));
        setSubtitle(name)
    }

    const handleCloseServiceForm = () => {
        setSubtitle('')
        setService([])
        setOpenServiceForm(false);
    }

    const handleInputChangeService = (event, id) => {
        const { name, value } = event.target;

        const isValidNumber = (/^[0-9]+$/.test(value) || value === '') && value !== 'e' && value !== 'E' && value !== '-' && value !== '+';

        if (isValidNumber) {
            setService((prevFilas) =>
                prevFilas.map((fila) =>
                    fila.id === id ? { ...fila, [name]: value } : fila
                )
            );
        }
    };

    const handleSubmitService = (event) => {
        event.preventDefault();
    }


    return (
        <WorkOrderContext.Provider value={
            {
                TABLE_HEAD,
                FILTER_OPTIONS,
                workOrder,
                workOrders,
                models,
                openForm,
                edit,
                openSnackbar,
                messageSnackbar,
                typeSnackbar,
                openDelete,
                getWorkOrders,
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
                filteredWorkOrders,
                emptyRows,
                isNotFound,
                handleRequestSort,
                handleClick,
                handleChangePage,
                handleChangeRowsPerPage,
                handleFilterByName,
                woekOrderError,
                filterField,
                handleFilterField,
                openFilter,
                handleOpenFilter,
                handleCloseFilter,
                service,
                subtitle,
                openServiceForm,
                handleInputChangeService,
                handleSubmitService,
                handleCloseServiceForm,
                handleOpenServiceForm,
                handleDeleteChip,
                searchModel,
                handleSearchModel,
                filteredModels}}>
            {props.children}
        </WorkOrderContext.Provider>
    )
}



