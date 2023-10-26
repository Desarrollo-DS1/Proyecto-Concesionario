import React, {useState} from "react";
import EMPLOYEELIST from '../../_mock/employee';
import EmployeeContext from './EmployeeContext';
import {checkCustomer} from "./EmployeeValidation";
import {applySortFilter, getComparator} from "../filter/Filter";


export function EmployeeState(props) {

    const TABLE_HEAD = [
        { id: 'cedula', label: 'Cedula', alignRight: false },
        { id: 'nombre', label: 'Nombre', alignRight: false },
        { id: 'correo', label: 'Correo', alignRight: false },
        { id: 'telefono', label: 'Telefono', alignRight: false },
        { id: 'celular', label: 'Celular', alignRight: false },
        { id: 'direccion', label: 'Direccion', alignRight: false },
        { id: 'ciudad', label: 'Ciudad', alignRight: false },
        { id: 'fechaIngreso', label: 'Fecha Ingreso', alignRight: false },
        { id: 'fechaRetiro', label: 'Fecha Retiro', alignRight: false },
        { id: 'salario', label: 'Salario', alignRight: false },
        { id: 'cargo', label: 'Cargo', alignRight: false },
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

    const [employee, setEmployee] = React.useState(emptyEmployee);
    const [employees, setEmployees] = React.useState([]);
    const [openForm, setOpenForm] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [messageSnackbar, setMessageSnackbar] = useState('');
    const [typeSnackbar, setTypeSnackbar] = useState('success');

    const getEmployees = () => {
        setEmployees(EMPLOYEELIST);
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
                setMessageSnackbar('Empleado actualizado correctamente');
                setTypeSnackbar('success');
            }
            else
            {
                addEmployee(employee);
                setMessageSnackbar('Empleado agregado correctamente');
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
        setMessageSnackbar('Empleado eliminado correctamente');
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
    const [orderBy, setOrderBy] = useState('primerNombre');
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

    const filteredCustomers = applySortFilter(employees, getComparator(order, orderBy), filterName);
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - employees.length) : 0;
    const isNotFound = !filteredCustomers.length && !!filterName;

    const [employeeError, setEmployeeError] = React.useState(emptyError);

    const getEmployeeError = () => {
        setEmployeeError(emptyError)
    }

    const validateEmployeeOnSubmit = () => {
        const updatedErrors = {};
        Object.keys(employeeError).forEach((name) => {
            updatedErrors[name] = checkCustomer(employee, name);
        });
        setEmployeeError(updatedErrors);
        return Object.values(updatedErrors).some((error) => error !== '');
    };
    const validateEmployeeOnBlur = (employee, name) => {
        setEmployeeError({...employeeError, [name]: checkCustomer(employee, name)});
    };

    return (
        <EmployeeContext.Provider value={
            {
                TABLE_HEAD,
                employee,
                employees,
                openForm,
                edit,
                openSnackbar,
                messageSnackbar,
                typeSnackbar,
                openDelete,
                getEmployees,
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
                filteredCustomers,
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



