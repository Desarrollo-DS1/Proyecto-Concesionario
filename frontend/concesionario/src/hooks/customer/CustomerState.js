import React, {useState} from "react";
import CUSTOMERLIST from '../../_mock/customer';
import CustomerContext from './CustomerContext';
import {checkCustomer} from "./CustomerValidation";
import {applySortFilter, getComparator} from "../filter/Filter";
import EmployeeContext from "../employee/EmployeeContext";

export function CustomerState(props) {

    const TABLE_HEAD = [
        { id: 'cedula', label: 'Cedula', alignRight: false },
        { id: 'nombre', label: 'Nombre', alignRight: false },
        { id: 'correo', label: 'Correo', alignRight: false },
        { id: 'telefono', label: 'Telefono', alignRight: false },
        { id: 'celular', label: 'Celular', alignRight: false },
        { id: 'direccion', label: 'Direccion', alignRight: false },
        { id: 'ciudad', label: 'Ciudad', alignRight: false },
        { id: 'fechaNacimiento', label: 'FechaNacimiento', alignRight: false },
        { id: 'genero', label: 'Genero', alignRight: false },
        { id: '' },
    ];

    const CustomerEmployee = {
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
    }

    const initialGenders = [
        { id: '1', label: 'Masculino' },
        { id: '2', label: 'Femenino' },]

    const [customer, setCustomer] = React.useState(CustomerEmployee);
    const [customers, setCustomers] = React.useState([]);
    const [openForm, setOpenForm] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [messageSnackbar, setMessageSnackbar] = useState('');
    const [typeSnackbar, setTypeSnackbar] = useState('success');
    const [genders, setGenders] = useState(initialGenders);

    const getCustomers = () => {
        // Aqui se aplicaria el axios.get
        setCustomers(customers);
    }
    const getCustomer = (cedula) => {
        const customer = customers.find(customer => customer.cedula === cedula);
        if(customer)
        {
            setCustomer(customer)
            setEdit(true)
        }
        else
        {
            setCustomer(CustomerEmployee)
            setEdit(false)
        }
    }
    const addCustomer = (customer) => {
        setCustomers([...customers, customer])
    }
    const updateCustomer = (customer) => {
        setCustomers(customers.map((item) => (item.cedula === customer.cedula ? customer : item)))
    }
    const deleteCustomer = (customer) => {
        setCustomers(customers.filter((item) => item.cedula !== customer.cedula))
    }
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCustomer({
            ...customer,
            [name]: value
        });
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateCustomerOnSubmit()) {
            if(edit)
            {
                updateCustomer(customer);
                setMessageSnackbar('Cliente actualizado correctamente');
                setTypeSnackbar('success');
            }
            else
            {
                addCustomer(customer);
                setMessageSnackbar('Cliente agregado correctamente');
                setTypeSnackbar('success');
            }
            handleOpenSnackbar();
            handleCloseForm();
        }
    }
    const handleOnBlur = (event) => {
        const {name} = event.target;
        validateCustomerOnBlur(customer, name);
    }

    const handleDelete = (event) => {
        event.preventDefault();
        deleteCustomer(customer);
        setMessageSnackbar('Cliente eliminado correctamente');
        setTypeSnackbar('success');
        handleOpenSnackbar();
        handleCloseDelete();
    }
    const handleOpenForm = (event, cedula) => {
        getCustomerError();
        getCustomer(cedula);
        setOpenForm(true)
    };
    const handleCloseForm = () => {
        setOpenForm(false);
    };
    const handleOpenDelete = (event, cedula) => {
        getCustomer(cedula);
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

    const filteredCustomers = applySortFilter(customers, getComparator(order, orderBy), filterName);
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - customers.length) : 0;
    const isNotFound = !filteredCustomers.length && !!filterName;

    const [customerError, setCustomerError] = React.useState(emptyError);

    const getCustomerError = () => {
        setCustomerError(emptyError)
    }

    const validateCustomerOnSubmit = () => {
        const updatedErrors = {};
        Object.keys(customerError).forEach((name) => {
            updatedErrors[name] = checkCustomer(customer, name);
        });
        setCustomerError(updatedErrors);
        return Object.values(updatedErrors).some((error) => error !== '');
    };
    const validateCustomerOnBlur = (customer, name) => {
        setCustomerError({...customerError, [name]: checkCustomer(customer, name)});
    };

    return (
        <CustomerContext.Provider value={
            {
                TABLE_HEAD,
                customer,
                customers,
                genders,
                openForm,
                edit,
                openSnackbar,
                messageSnackbar,
                typeSnackbar,
                openDelete,
                getCustomers,
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
                customerError}}>
            {props.children}
        </CustomerContext.Provider>
    )
}







