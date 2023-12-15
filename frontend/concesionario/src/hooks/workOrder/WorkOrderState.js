import propTypes from "prop-types";
import React, {useContext, useState} from "react";
import WorkOrderContext from './WorkOrderContext';
import {checkWorkOrder} from "./WorkOrderValidation";
import {applySortFilter, getComparator} from "../filter/Filter";
import {getAllVehiculos, getVehiculo, createVehiculo, updateVehiculo, deleteVehiculo} from "../../api/Vehiculo.api";
import {getAllModelos} from "../../api/Modelo.api";
import {getAllServicios} from "../../api/Servicio.api";
import {getRepuestosModelo } from "../../api/RepuestoUso.api";
import {getServiciosOrden} from "../../api/ServicioOrden.api";
import {getAllOrdenTrabajos, getOrdenTrabajo, createOrdenTrabajo, updateOrdenTrabajo, deleteOrdenTrabajo} from "../../api/OrdenTrabajo.api";
import { getAllSucursales} from "../../api/Sucursal.api";
import AuthContext from "../auth/AuthContext";


WorkOrderState.propTypes = {
    children: propTypes.node,
}

export default function WorkOrderState(props) {
    const {authTokens, user} = useContext(AuthContext);

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
        { id: "cedulaJefeTaller", label: "vendedor"},
        { id: "fechaInicio", label: "fechaInicio"},
        { id: "fechaEsperada", label: "fechaEsperada"},
        { id: "modelo", label: "modelo"},
        { id: "placa", label: "placa"},
        { id: "estado", label: "estado"},
    ];

    const emptyWorkOrder = {
        id: "",
        cedulaCliente: "",
        cedulaJefeTaller: user.user_id,
        modelo: "",
        fechaInicio: new Date().toISOString().split('T')[0],
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
        cedulaJefeTaller: "",
        modelo: "",
        fechaInicio: "",
        fechaEsperada: "",
        fechaEntrega: "",
        placa: "",
        estado: "",
        comentario: "",
        servicios: "",
        repuestos: "",
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
    const [searchService, setSearchService] = useState('');
    const [searchSparePart, setSearchSparePart] = useState('');
    const [activateSparePart, setActivateSparePart] = useState(true);

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

    const getSpareParts = async (sparePart) => {
        console.log(sparePart)
        try
        {
            const response = await getRepuestosModelo(sparePart, authTokens.access);
            console.log(response.data)
            setSpareParts(response.data);
        }
        catch (error)
        {
            setTypeSnackbar('error');
            setMessageSnackbar('repuestos.mensaje.errorListando');
            handleOpenSnackbar();
        }
    }

    const getServices = async () => {

        try
        {
            const response = await getAllServicios(authTokens.access);
            setServices(response.data);
        }
        catch (error)
        {
            setTypeSnackbar('error');
            setMessageSnackbar('servicios.mensaje.errorListando');
            handleOpenSnackbar();
        }
    }

    const handleSearchService = (event) => {;
        setSearchService(event.target.value);
    };

    const handleSearchSparePart = (event) => {;
        setSearchSparePart(event.target.value);
    };

    const filteredServices = services.filter((option) =>
        option.nombre.toLowerCase().includes(searchService.toLowerCase())
    );

    const filteredSpareParts = spareParts.filter((option) =>
        option.nombre.toLowerCase().includes(searchSparePart.toLowerCase())
    );

    const getWorkOrders = async () => {

       try
        {
            const response = await getAllOrdenTrabajos(authTokens.access);
            setWorkOrders(response.data);
            console.log(response.data)
        }
        catch (error)
        {
            setTypeSnackbar('error');
            setMessageSnackbar('ordenesTrabajo.mensaje.errorListando');
            handleOpenSnackbar();
        }
    }

    const getWorkOrder = async (id) => {
        
        if(id == null)
        {
            setEdit(false);
            setWorkOrder(emptyWorkOrder);
        }
        else
        {
            setEdit(true);
            try
        {
            const response = await getOrdenTrabajo(id, authTokens.access);
            setWorkOrder(response.data);
        }
        catch (error)
        {
            setTypeSnackbar('error');
            setMessageSnackbar('ordenesTrabajo.mensaje.errorListando');
            handleOpenSnackbar();
        }
        }
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
                setWorkOrderError({...workOrderError, vin: 'Vin ya existe'});
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

    const handleInputChangeModel = (event) => {

        const { value } = event.target;
        setWorkOrder({
            ...workOrder,
            modelo: value,
            repuestos: []
        });

        getSpareParts(value);
        setActivateSparePart(false);
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
    const handleOpenForm = async (event, id) => {
        getWorkOrderError();
        await getModels();
        await getServices();
        await getWorkOrder(id);
        setOpenForm(true)
    };
    const handleCloseForm = () => {
        setSearchService('');
        setSearchSparePart('');
        setActivateSparePart(true);
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

    const handleDeleteChip = (id, name) => {
        const auxSparePart = {...workOrder, [name]: workOrder[name].filter((modelId) => modelId !== id)};
        setWorkOrder(auxSparePart);
        validateWorkOrderOnBlur(auxSparePart, name)
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

    const [workOrderError, setWorkOrderError] = React.useState(emptyError);

    const getWorkOrderError = () => {
        setWorkOrderError(emptyError)
    }

    const validateWorkOrderOnSubmit = () => {
        const updatedErrors = {};
        Object.keys(workOrderError).forEach((name) => {
            updatedErrors[name] = checkWorkOrder(workOrder, name);
        });
        setWorkOrderError(updatedErrors);
        return Object.values(updatedErrors).some((error) => error !== '');
    };
    const validateWorkOrderOnBlur = (workOrder, name) => {
        setWorkOrderError({...workOrderError, [name]: checkWorkOrder(workOrder, name)});
    };

    const [openServiceForm, setOpenServiceForm] = useState(false);
    const [service, setService] = useState([]);
    const [subtitle, setSubtitle] = useState('');

    const getService = async (id) => {
        console.log(id)
        const response = await getServiciosOrden(id, authTokens.access);	
        console.log(response.data)
        setService(response.data);
    }

    const handleOpenServiceForm = (e, id, name) => {
        getWorkOrder(id).then(()=>getService(id).then(() => setOpenServiceForm(true)))
        setSubtitle(name)
    }

    const handleCloseServiceForm = () => {
        setSubtitle('')
        setService([])
        setOpenServiceForm(false);
    }

    const handleInputChangeService = (event, id) => {
        const { checked } = event.target;

        setService((prevFilas) =>
            prevFilas.map((fila) =>
                fila.id === id ? { ...fila, estado: checked } : fila
            )
        );
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
                workOrderError,
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
                searchService,
                searchSparePart,
                handleSearchService,
                handleSearchSparePart,
                filteredServices,
                filteredSpareParts,
                services,
                spareParts,
                handleInputChangeModel,
                activateSparePart}}>
            {props.children}
        </WorkOrderContext.Provider>
    )
}



