import propTypes from "prop-types";
import React, {useState} from "react";
import VehicleContext from './VehicleContext';
import {checkVehicle} from "./VehicleValidation";
import {applySortFilter, getComparator} from "../filter/Filter";
import { getAllEmpleados, getEmpleado, createEmpleado, updateEmpleado, deleteEmpleado } from "../../api/Empleado.api";
import { getAllSucursales, getSucursal } from "../../api/Sucursal.api";


VehicleState.propTypes = {
    children: propTypes.node,
}

export function VehicleState(props) {

    const TABLE_HEAD = [
        { id: 'vin', label: 'vin', alignRight: false },
        { id: 'modelo', label: 'modelo', alignRight: false },
        { id: 'sucursal', label: 'sucursal', alignRight: false },
        { id: 'color', label: 'color', alignRight: false },
        { id: '' },
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


    const getBranches = () => {
        async function loadBranches() {
            try{
                const response = await getAllSucursales();
                setBranches(response.data);
        
            } catch (error) {
                setTypeSnackbar('error');
                setMessageSnackbar('sucursales.mensaje.errorListando');
                handleOpenSnackbar();
            }
        }
        
        loadBranches();
    }

    const getVehicles = () => {
        async function loadEmployees() {
            try{
                const response = await getAllEmpleados();
                setVehicles(response.data);

            } catch (error) {
                setTypeSnackbar('error');
                setMessageSnackbar('empleados.mensaje.errorListando');
                handleOpenSnackbar();
            }
        }

        loadEmployees();        
    }

    const getVehicle = (vin) => {
        async function loadEmployee() {
            try{
                const response = await getEmpleado(vin);
                const employeeDataWithClave = { ...response.data, clave: '' };
                setVehicle(employeeDataWithClave);
            } catch (error) {
                setTypeSnackbar('error');
                setMessageSnackbar('empleados.mensaje.errorCargando');
                handleOpenSnackbar();
            }
        }

        if (vin === null) {
            setVehicle(emptyVehicle);
            setEdit(false);

        } else {
            loadEmployee();
            setEdit(true);
        }
    }

    const addVehicle = (vehicle) => {
        async function postEmployee() {
            try{
                const response = await createEmpleado(vehicle);
                setVehicles([...vehicles, response.data]);

                setTypeSnackbar('success');
                setMessageSnackbar('empleados.mensaje.agregado');
                handleOpenSnackbar();

                handleCloseForm();
            
            } catch (error) {
                const errors = error.response.data;

                if(errors.cedula){
                    setTypeSnackbar('error');
                    setMessageSnackbar('empleados.mensaje.errorCedula');
                    setVehicleError({...vehicleError, cedula: 'Cedula ya existe'});
                    handleOpenSnackbar();

                } else if (errors.email) {
                    setTypeSnackbar('error');
                    setMessageSnackbar('empleados.mensaje.errorEmail');
                    setVehicleError({...vehicleError, correo: 'Correo ya existe'});
                    handleOpenSnackbar();

                } else {
                    setTypeSnackbar('error');
                    setMessageSnackbar('empleados.mensaje.error');
                    handleOpenSnackbar();
                }
            }
        }
        
        postEmployee();
    }

    const updateVehicle = (vehicle) => {
        async function putEmployee() {
            try{
                const response = await updateEmpleado(vehicle.cedula, vehicle);
                setVehicles(vehicles.map((item) => (item.cedula === vehicle.cedula ? vehicle : item)));

                setTypeSnackbar('success');
                setMessageSnackbar('empleados.mensaje.editado');
                handleOpenSnackbar();

                handleCloseForm();
                getVehicles();
            
            } catch (error) {
                const errors = error.response.data;

                if(errors.email) {
                    setTypeSnackbar('error');
                    setMessageSnackbar('empleados.mensaje.errorEmail');
                    handleOpenSnackbar();
                    setVehicleError({...vehicleError, correo: 'Correo ya existe'});
                
                } else {
                    setTypeSnackbar('error');
                    setMessageSnackbar('empleados.mensaje.error');
                    handleOpenSnackbar();
                }
            }
        }
        
        putEmployee();
    }

    const deleteVehicle = (vehicle) => {
        async function removeEmployee() {
            try{
                const response = await deleteEmpleado(vehicle.cedula);
                setVehicles(vehicles.filter((item) => item.cedula !== vehicle.cedula));

                setTypeSnackbar('success');
                setMessageSnackbar('empleados.mensaje.eliminado');
                handleOpenSnackbar();

                getVehicles();

            } catch (error) {
                const errors = error.response.data;

                if(errors.protected) {
                    setTypeSnackbar('error');
                    setMessageSnackbar(errors.protected);
                    handleOpenSnackbar();

                } else {
                    setTypeSnackbar('error');
                    setMessageSnackbar('empleados.mensaje.errorEliminar');
                    handleOpenSnackbar();
                }
            }
        }

        removeEmployee();
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
                updateVehicle(vehicle);
            }
            else
            {
                addVehicle(vehicle);
            }
            getVehicles();
        }
    }
    const handleOnBlur = (event) => {
        const {name} = event.target;
        validateVehicleOnBlur(vehicle, name);
    }

    const handleDelete = (event) => {
        event.preventDefault();
        deleteVehicle(vehicle);

        handleCloseDelete();
    }
    const handleOpenForm = (event, vin) => {
        getVehicleError();
        getBranches();
        getVehicle(vin);
        setOpenForm(true)
    };
    const handleCloseForm = () => {
        setOpenForm(false);
    };
    const handleOpenDelete = (event, vin) => {
        getVehicle(vin);
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

    const filteredVehicles = applySortFilter(vehicles, getComparator(order, orderBy), filterName);
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
                vehicleError,}}>
            {props.children}
        </VehicleContext.Provider>
    )
}



