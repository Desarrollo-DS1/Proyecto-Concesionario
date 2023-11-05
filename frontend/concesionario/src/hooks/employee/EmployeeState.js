import propTypes from "prop-types";
import React, {useState} from "react";
import EMPLOYEELIST from '../../_mock/employee';
import EmployeeContext from './EmployeeContext';
import {checkEmployee} from "./EmployeeValidation";
import {applySortFilter, getComparator} from "../filter/Filter";
import { getAllEmpleados, getEmpleado, createEmpleado, updateEmpleado, deleteEmpleado } from "../../api/Empleado.api";


EmployeeState.propTypes = {
    children: propTypes.node,
}

export function EmployeeState(props) {

    const TABLE_HEAD = [
        { id: 'cedula', label: 'cedula', alignRight: false },
        { id: 'primerNombre', label: 'nombre', alignRight: false },
        { id: 'correo', label: 'correo', alignRight: false },
        { id: 'telefono', label: 'telefono', alignRight: false },
        { id: 'celular', label: 'celular', alignRight: false },
        { id: 'direccion', label: 'direccion', alignRight: false },
        { id: 'ciudad', label: 'ciudad', alignRight: false },
        { id: 'fechaIngreso', label: 'fechaIngreso', alignRight: false },
        { id: 'fechaRetiro', label: 'fechaRetiro', alignRight: false },
        { id: 'salario', label: 'salario', alignRight: false },
        { id: 'cargo', label: 'cargo', alignRight: false },
        { id: '' },
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
        {id: '11', label: 'Cafam'}]

    const initialArls = [
        { id: '1', label: 'Sura' },
        { id: '2', label: 'Colmena'}]

    const initialPositions = [
        { id: '1', label: 'Vendedor' },
        { id: '2', label: 'Jefe de Taller' },
        {id: '3', label: 'Gerente'}]

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
    const [bloodTypes, setBloodTypes] = useState(initialBloodTypes);
    const [epss, setEpss] = useState(initialEpss);
    const [arls, setArls] = useState(initialArls);
    const [positions, setPositions] = useState(initialPositions);
    const [genders, setGenders] = useState(initialGenders);

    const getEmployees = () => {
        async function loadEmployees() {
            try{
                const response = await getAllEmpleados();
                setEmployees(response.data);

            } catch (error) {
                console.log("rror fetching data", error);
            }
        }

        loadEmployees();        
    }

    const getBloodTypes = () => {
        // Aqui se aplicaria el axios.get
        setBloodTypes(initialBloodTypes);
    }

    const getEpss = () => {
        // Aqui se aplicaria el axios.get
        setEpss(initialEpss);
    }

    const getArls = () => {
        // Aqui se aplicaria el axios.get
        setArls(initialEpss);
    }

    const getPositions = () => {
        // Aqui se aplicaria el axios.get
        setPositions(initialPositions);
    }

    const getEmployee = (cedula) => {
        const employee = employees.find(employee => employee.cedula === cedula);
        if(employee)
        {
            setEmployee(employee)
            setEdit(true)
        }
        else
        {
            setEmployee(emptyEmployee)
            setEdit(false)
        }
    }

    const addEmployee = (employee) => {
        setEmployees([...employees, employee])
    }

    const updateEmployee = (employee) => {
        setEmployees(employees.map((item) => (item.cedula === employee.cedula ? employee : item)))
    }

    const deleteEmployee = (employee) => {
        setEmployees(employees.filter((item) => item.cedula !== employee.cedula))
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
            if(edit)
            {
                updateEmployee(employee);
                setMessageSnackbar('empleados.mensaje.editado');
                setTypeSnackbar('success');
            }
            else
            {
                addEmployee(employee);
                setMessageSnackbar('empleados.mensaje.agregado');
                setTypeSnackbar('success');
            }
            handleOpenSnackbar();
            handleCloseForm();
        }
    }
    const handleOnBlur = (event) => {
        const {name} = event.target;
        validateEmployeeOnBlur(employee, name);
    }

    const handleDelete = (event) => {
        event.preventDefault();
        deleteEmployee(employee);
        setMessageSnackbar('empleados.mensaje.eliminado');
        setTypeSnackbar('success');
        handleOpenSnackbar();
        handleCloseDelete();
    }
    const handleOpenForm = (event, cedula) => {
        getEmployeeError();
        getEmployee(cedula);
        setOpenForm(true)
    };
    const handleCloseForm = () => {
        setOpenForm(false);
    };
    const handleOpenDelete = (event, cedula) => {
        getEmployee(cedula);
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

    const filteredEmployees = applySortFilter(employees, getComparator(order, orderBy), filterName);
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - employees.length) : 0;
    const isNotFound = !filteredEmployees.length && !!filterName;

    const [employeeError, setEmployeeError] = React.useState(emptyError);

    const getEmployeeError = () => {
        setEmployeeError(emptyError)
    }

    const validateEmployeeOnSubmit = () => {
        const updatedErrors = {};
        Object.keys(employeeError).forEach((name) => {
            updatedErrors[name] = checkEmployee(employee, name);
        });
        setEmployeeError(updatedErrors);
        return Object.values(updatedErrors).some((error) => error !== '');
    };
    const validateEmployeeOnBlur = (employee, name) => {
        setEmployeeError({...employeeError, [name]: checkEmployee(employee, name)});
    };

    return (
        <EmployeeContext.Provider value={
            {
                TABLE_HEAD,
                employee,
                employees,
                epss,
                arls,
                positions,
                bloodTypes,
                genders,
                openForm,
                edit,
                openSnackbar,
                messageSnackbar,
                typeSnackbar,
                openDelete,
                getEmployees,
                getBloodTypes,
                getEpss,
                getArls,
                getPositions,
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
                employeeError}}>
            {props.children}
        </EmployeeContext.Provider>
    )
}



