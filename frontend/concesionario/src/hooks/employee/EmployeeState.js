import propTypes from 'prop-types';
import React, { useContext, useState } from "react";
import EmployeeContext from './EmployeeContext';
import { checkEmployee } from "./EmployeeValidation";
import { applySortFilter, getComparator } from "../filter/Filter";
import { getAllEmpleados, getEmpleado, createEmpleado, updateEmpleado, deleteEmpleado } from "../../api/Empleado.api";
import { getAllSucursales } from "../../api/Sucursal.api";
import { createUsuario } from "../../api/Usuario.api";
import AuthContext from "../auth/AuthContext";

EmployeeState.propTypes = {
    children: propTypes.node,
}

export default function EmployeeState(props) {
    const {authTokens} = useContext(AuthContext);

    const TABLE_HEAD = [
        { id: 'cedula', label: 'cedula', alignRight: false },
        { id: 'primerNombre', label: 'nombre', alignRight: false },
        { id: 'correo', label: 'correo', alignRight: false },
        { id: 'telefono', label: 'telefono', alignRight: false },
        { id: 'celular', label: 'celular', alignRight: false },
        { id: 'salario', label: 'salario', alignRight: false },
        { id: 'cargo', label: 'cargo', alignRight: false },
        { id: '' },
    ];

    const FILTER_OPTIONS = [
        { id: 'cedula', label: 'cedula' },
        { id: 'nombre', label: 'nombre' },
        { id: 'correo', label: 'correo' },
        { id: 'telefono', label: 'telefono' },
        { id: 'celular', label: 'celular' },
        { id: 'salario', label: 'salario' },
        { id: 'cargo', label: 'cargo' },
    ];

    const emptyEmployee = {
        primerNombre: "",
        segundoNombre: "",
        primerApellido: "",
        segundoApellido: "",
        cedula: "",
        telefono: "",
        celular: "",
        ciudad: "",
        direccion: "",
        fechaNacimiento: "",
        genero: "",
        correo: "",
        clave: "",
        fechaIngreso: "",
        fechaRetiro: "",
        salario: "",
        tipoSangre: "",
        eps: "",
        arl: "",
        cargo: "",
        sucursal: "",
    }
    const emptyError = {
        primerNombre: '',
        segundoNombre: '',
        primerApellido: '',
        segundoApellido: '',
        cedula: '',
        telefono: '',
        celular: '',
        ciudad: '',
        direccion: '',
        fechaNacimiento: '',
        genero: '',
        correo: '',
        clave: '',
        fechaIngreso: "",
        fechaRetiro: "",
        salario: "",
        tipoSangre: "",
        eps: "",
        arl: "",
        cargo: "",
        sucursal: "",
    }

    const initialBloodTypes = [
        { id: '1', label: 'A+' },
        { id: '2', label: 'A-' },
        { id: '3', label: 'B+' },
        { id: '4', label: 'B-' },
        { id: '5', label: 'AB+' },
        { id: '6', label: 'AB-' },
        { id: '7', label: 'O+' },
        { id: '8', label: 'O-' },]

    const initialEpss = [
        { id: '1', label: 'Sura' },
        { id: '2', label: 'Sanitas' },
        { id: '3', label: 'Coomeva' },
        { id: '4', label: 'Compensar' },
        { id: '5', label: 'Salud Total' },
        { id: '6', label: 'Nueva EPS' },
        { id: '7', label: 'Medimas' },
        { id: '8', label: 'Aliansalud' },
        { id: '9', label: 'Cafesalud' },
        { id: '10', label: 'Famisanar' },
        { id: '11', label: 'Cafam' },
        { id: '12', label: 'Comfenalco' }]

    const initialArls = [
        { id: '1', label: 'Sura' },
        { id: '2', label: 'Colmena' }]

    const initialPositions = [
        { id: '1', label: 'Vendedor' },
        { id: '2', label: 'Jefe de Taller' },
        { id: '3', label: 'Gerente' }]

    const initialGenders = [
        { id: '1', label: 'Masculino' },
        { id: '2', label: 'Femenino' },
        { id: '3', label: 'Otro' }]

    const [employee, setEmployee] = React.useState(emptyEmployee);
    const [employees, setEmployees] = React.useState([]);
    const [openForm, setOpenForm] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [messageSnackbar, setMessageSnackbar] = useState('');
    const [typeSnackbar, setTypeSnackbar] = useState('success');
    const [bloodTypes] = useState(initialBloodTypes);
    const [epss] = useState(initialEpss);
    const [arls] = useState(initialArls);
    const [positions] = useState(initialPositions);
    const [genders] = useState(initialGenders);
    const [branches, setBranches] = useState([]);


    const getBranches = async () => {

        try {
            const response = await getAllSucursales(authTokens.access);
            setBranches(response.data);
        }
        catch (error) {
            setTypeSnackbar('error');
            setMessageSnackbar('sucursales.mensaje.errorListando');
            handleOpenSnackbar();
        }
    }

    const getEmployees = async () => {
        try {
            const response = await getAllEmpleados(authTokens.access);
            setEmployees(response.data);

        } catch (error) {
            setTypeSnackbar('error');
            setMessageSnackbar('empleados.mensaje.errorListando');
            handleOpenSnackbar();
        }
    }

    const getEmployee = async (cedula) => {

        if (cedula === null) {
            setEdit(false);
            setEmployee(emptyEmployee);
        }
        else {
            setEdit(true);
            try {
                const response = await getEmpleado(cedula, authTokens.access);
                const employeeDataWithClave = { ...response.data, clave: '' };
                setEmployee(employeeDataWithClave);
            }
            catch (error) {
                setTypeSnackbar('error');
                setMessageSnackbar('empleados.mensaje.errorCargando');
                handleOpenSnackbar();
            }
        }
    }

    const addEmployee = async (employee) => {

        try {
            setIsLoading(true);
            const response = await createUsuario(employee);
            const response2 = await createEmpleado(employee, authTokens.access);
            setEmployees([...employees, response2.data]);

            setTypeSnackbar('success');
            setMessageSnackbar('empleados.mensaje.agregado');
            handleOpenSnackbar();
            handleCloseForm();
            setIsLoading(false);
        }
        catch (error) {

            setIsLoading(false);
            const errors = error.response.data;

            if (errors.cedula) {
                setTypeSnackbar('error');
                setMessageSnackbar('empleados.mensaje.errorCedula');
                setEmployeeError({ ...employeeError, cedula: 'Cedula ya existe' });
                handleOpenSnackbar();

            } else if (errors.email) {
                setTypeSnackbar('error');
                setMessageSnackbar('empleados.mensaje.errorEmail');
                setEmployeeError({ ...employeeError, correo: 'Correo ya existe' });
                handleOpenSnackbar();

            } else {
                setTypeSnackbar('error');
                setMessageSnackbar('empleados.mensaje.error');
                handleOpenSnackbar();
            }
        }
    }

    const updateEmployee = async (employee) => {

        try {
            setIsLoading(true);
            await updateEmpleado(employee.cedula, employee, authTokens.access);
            setTypeSnackbar('success');
            setMessageSnackbar('empleados.mensaje.editado');
            handleOpenSnackbar();
            handleCloseForm();
            setIsLoading(false);
        }
        catch (error) {

            setIsLoading(false);
            const errors = error.response.data;
            if (errors.email) {
                setTypeSnackbar('error');
                setMessageSnackbar('empleados.mensaje.errorEmail');
                handleOpenSnackbar();
                setEmployeeError({ ...employeeError, correo: 'Correo ya existe' });

            } else {
                setTypeSnackbar('error');
                setMessageSnackbar('empleados.mensaje.error');
                handleOpenSnackbar();
            }
        }
    }

    const deleteEmployee = async (employee) => {

        try {
            await deleteEmpleado(employee.cedula, authTokens.access);
            setEmployees(employees.filter((item) => item.cedula !== employee.cedula));
            setTypeSnackbar('success');
            setMessageSnackbar('empleados.mensaje.eliminado');
            handleOpenSnackbar();
        } catch (error) {
            const errors = error.response.data;
            if (errors.protected) {
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

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEmployee({
            ...employee,
            [name]: value
        });
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateEmployeeOnSubmit()) {
            if (edit) {
                updateEmployee(employee).then(() => getEmployees());
            }
            else {
                addEmployee(employee).then(() => getEmployees());
            }
        }
    }
    const handleOnBlur = (event) => {
        const { name } = event.target;
        validateEmployeeOnBlur(employee, name);
    }

    const handleDelete = (event) => {
        event.preventDefault();
        deleteEmployee(employee).then(() => getEmployees());
        handleCloseDelete();
    }
    const handleOpenForm = async (event, cedula) => {
        getEmployeeError();
        await getBranches();
        await getEmployee(cedula);
        setOpenForm(true)
    };
    const handleCloseForm = () => {
        setShowPassword(false);
        setOpenForm(false);
    };
    const handleOpenDelete = (event, cedula) => {
        getEmployee(cedula).then(() => setOpenDelete(true));
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

    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

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
    const [filterField, setFilterField] = React.useState('cedula');

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

    const filteredEmployees = applySortFilter(employees, getComparator(order, orderBy), filterName, filterField, 'usuarios');
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - employees.length) : 0;
    const isNotFound = !filteredEmployees.length && !!filterName;

    const [employeeError, setEmployeeError] = React.useState(emptyError);

    const getEmployeeError = () => {
        setEmployeeError(emptyError)
    }

    const validateEmployeeOnSubmit = () => {
        const updatedErrors = {};
        Object.keys(employeeError).forEach((name) => {
            updatedErrors[name] = checkEmployee(employee, name, edit);
        });
        setEmployeeError(updatedErrors);
        return Object.values(updatedErrors).some((error) => error !== '');
    };
    const validateEmployeeOnBlur = (employee, name) => {
        setEmployeeError({ ...employeeError, [name]: checkEmployee(employee, name, edit) });
    };

    const [isLoading, setIsLoading] = useState(false);

    return (
        <EmployeeContext.Provider value={
            {
                TABLE_HEAD,
                FILTER_OPTIONS,
                employee,
                employees,
                epss,
                arls,
                positions,
                bloodTypes,
                genders,
                branches,
                openForm,
                edit,
                openSnackbar,
                messageSnackbar,
                typeSnackbar,
                openDelete,
                getEmployees,
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
                filteredEmployees,
                emptyRows,
                isNotFound,
                handleRequestSort,
                handleClick,
                handleChangePage,
                handleChangeRowsPerPage,
                handleFilterByName,
                employeeError,
                showPassword,
                handleTogglePassword,
                filterField,
                handleFilterField,
                openFilter,
                handleOpenFilter,
                handleCloseFilter,
                isLoading
            }}>
            {props.children}
        </EmployeeContext.Provider>
    )
}