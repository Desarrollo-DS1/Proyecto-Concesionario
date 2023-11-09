import propTypes from "prop-types";
import React, {useState} from "react";
import CustomerContext from './CustomerContext';
import {checkCustomer} from "./CustomerValidation";
import {applySortFilter, getComparator} from "../filter/Filter";
import {getAllClientes, getCliente, createCliente, updateCliente, deleteCliente} from "../../api/Cliente.api";



CustomerState.propTypes = {
    children: propTypes.node,
}

export function CustomerState(props) {

    const TABLE_HEAD = [
        { id: 'cedula', label: 'cedula', alignRight: false },
        { id: 'nombre', label: 'nombre', alignRight: false },
        { id: 'correo', label: 'correo', alignRight: false },
        { id: 'telefono', label: 'telefono', alignRight: false },
        { id: 'celular', label: 'celular', alignRight: false },
        { id: 'direccion', label: 'direccion', alignRight: false },
        { id: 'ciudad', label: 'ciudad', alignRight: false },
        { id: '' },
    ];

    const FILTER_OPTIONS = [
        { id: 'cedula', label: 'cedula' },
        { id: 'nombre', label: 'nombre' },
        { id: 'correo', label: 'correo' },
        { id: 'telefono', label: 'telefono' },
        { id: 'celular', label: 'celular' },
        { id: 'direccion', label: 'direccion' },
        { id: 'ciudad', label: 'ciudad' },
    ];

    const emptyCustomer = {
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
        { id: '2', label: 'Femenino' },
        { id: '3', label: 'Otro' }]

    const [customer, setCustomer] = React.useState(emptyCustomer);
    const [customers, setCustomers] = React.useState([]);
    const [openForm, setOpenForm] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [messageSnackbar, setMessageSnackbar] = useState('');
    const [typeSnackbar, setTypeSnackbar] = useState('success');
    const [genders] = useState(initialGenders);

    const getCustomers = async () => {
        try
        {
            const response = await getAllClientes();
            setCustomers(response.data);

        } catch (error)
        {
            setTypeSnackbar('error');
            setMessageSnackbar('clientes.mensaje.errorListando');
            handleOpenSnackbar();
        }
    }

    const getCustomer = async (cedula) => {

        if (cedula === null){
            setEdit(false);
            setCustomer(emptyCustomer);
        }
        else
        {
            setEdit(true);

            try{
                const response = await getCliente(cedula);
                const customerDataWithClave = { ...response.data, clave: '' };
                setCustomer(customerDataWithClave);

            } catch (error) {
                setTypeSnackbar('error');
                setMessageSnackbar('clientes.mensaje.errorCargando');
                handleOpenSnackbar();
            }
        }
    }

    const addCustomer = async (customer) => {

        try
        {
            const response = await createCliente(customer);
            setCustomers([...customers, response.data]);
            setTypeSnackbar('success');
            setMessageSnackbar('clientes.mensaje.agregado');
            handleOpenSnackbar();
            handleCloseForm();
        }
        catch (error)
        {
            const errors = error.response.data;

            if(errors.cedula)
            {
                setTypeSnackbar('error');
                setMessageSnackbar('clientes.mensaje.errorCedula');
                handleOpenSnackbar();
                setCustomerError({...customerError, cedula: 'Cedula ya existe'});

            }
            else if(errors.email)
            {
                setTypeSnackbar('error');
                setMessageSnackbar('clientes.mensaje.errorEmail');
                handleOpenSnackbar();
                setCustomerError({...customerError, correo: 'Correo ya existe'});

            }
            else
            {
                setTypeSnackbar('error');
                setMessageSnackbar('clientes.mensaje.error');
                handleOpenSnackbar();
            }
        }
    }

    const updateCustomer = async (customer) => {
        try
        {
            await updateCliente(customer.cedula, customer);
            setTypeSnackbar('success');
            setMessageSnackbar('clientes.mensaje.editado');
            handleOpenSnackbar();
            handleCloseForm();
        }
        catch (error)
        {
            const errors = error.response.data;

            if (errors.email)
            {
                setTypeSnackbar('error');
                setMessageSnackbar('clientes.mensaje.errorEmail');
                handleOpenSnackbar();
                setCustomerError({...customerError, correo: 'Correo ya existe'});

            }
            else
            {
                setTypeSnackbar('error');
                setMessageSnackbar('clientes.mensaje.errorEditar');
                handleOpenSnackbar();
            }
        }
    }


    const deleteCustomer = async (customer) => {
        try
        {
            await deleteCliente(customer.cedula);
            setTypeSnackbar('success');
            setMessageSnackbar('clientes.mensaje.eliminado');
            handleOpenSnackbar();
        }
        catch (error)
        {
            const errors = error.response.data;

            if (errors.protected)
            {
                setTypeSnackbar('error');
                setMessageSnackbar(errors.protected);
                handleOpenSnackbar();

            }
            else
            {
                setTypeSnackbar('error');
                setMessageSnackbar('clientes.mensaje.errorEliminar');
                handleOpenSnackbar();
            }
        }
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
        if (!validateCustomerOnSubmit())
        {
            if(edit)
            {
                updateCustomer(customer).then(() => getCustomers());
            }
            else
            {
                addCustomer(customer).then(() => getCustomers());
            }
        }
    }
    const handleOnBlur = (event) => {
        const {name} = event.target;
        validateCustomerOnBlur(customer, name);
    }

    const handleDelete = (event) => {
        event.preventDefault();
        deleteCustomer(customer).then(() => getCustomers());
        handleCloseDelete();
    }
    const handleOpenForm = async (event, cedula) => {
        getCustomerError();
        await getCustomer(cedula);
        setOpenForm(true)
    };
    const handleCloseForm = () => {
        setShowPassword(false);
        setOpenForm(false);
    };
    const handleOpenDelete = async (event, cedula) => {
        await getCustomer(cedula);
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

    const filteredCustomers = applySortFilter(customers, getComparator(order, orderBy), filterName, filterField, 'usuarios');
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - customers.length) : 0;
    const isNotFound = !filteredCustomers.length && !!filterName;

    const [customerError, setCustomerError] = React.useState(emptyError);

    const getCustomerError = () => {
        setCustomerError(emptyError)
    }

    const validateCustomerOnSubmit = () => {
        const updatedErrors = {};
        Object.keys(customerError).forEach((name) => {
            updatedErrors[name] = checkCustomer(customer, name, edit);
        });
        setCustomerError(updatedErrors);
        return Object.values(updatedErrors).some((error) => error !== '');
    };
    const validateCustomerOnBlur = (customer, name) => {
        setCustomerError({...customerError, [name]: checkCustomer(customer, name, edit)});
    };

    return (
        <CustomerContext.Provider value={
            {
                TABLE_HEAD,
                FILTER_OPTIONS,
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
                customerError,
                showPassword,
                handleTogglePassword,
                filterField,
                handleFilterField,
                openFilter,
                handleOpenFilter,
                handleCloseFilter}}>
            {props.children}
        </CustomerContext.Provider>
    )
}







