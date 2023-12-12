import propTypes from 'prop-types';
import React, { useContext, useState } from "react";
import BranchContext from './BranchContext';
import { checkBranch } from './BranchValidation';
import { applySortFilter, getComparator } from '../filter/Filter';
import { getAllSucursales, getSucursal, createSucursal, updateSucursal, deleteSucursal } from '../../api/Sucursal.api';
import AuthContext from '../auth/AuthContext';

BranchState.propTypes = {
    children: propTypes.node,
}


export default function BranchState(props) {
    const {authTokens} = useContext(AuthContext);

    const initialBranches = [{
        id: 1,
        nombre: "Sucursal 1",
        direccion: "Calle 1",
        ciudad: "Ciudad 1",
        telefono: "Telefono 1",
    },
    {
        id: 2,
        nombre: "Sucursal 2",
        direccion: "Calle 2",
        ciudad: "Ciudad 2",
        telefono: "Telefono 2",

    },
    {
        id: 3,
        nombre: "Sucursal 3",
        direccion: "Calle 3",
        ciudad: "Ciudad 3",
        telefono: "Telefono 3",
    }]
    
    const TABLE_HEAD = [
        { id: 'nombre', label: 'Nombre', alignRight: false },
        { id: 'direccion', label: 'Direccion', alignRight: false },
        { id: 'ciudad', label: 'Ciudad', alignRight: false},
        { id: 'telefono', label: 'Telefono', alignRight: false },
        { id: '' },
    ];

    const emptyBranch = {
        nombre: "",
        direccion: "",
        ciudad: "",
        telefono: "",
    }

    const emptyError = {
        nombre: '',
        direccion: '',
        ciudad: '',
        telefono: '',
    }

    const [branch, setBranch] = useState(emptyBranch);
    const [branches, setBranches] = useState([]);
    const [openForm, setOpenForm] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [messageSnackbar, setMessageSnackbar] = useState('');
    const [typeSnackbar, setTypeSnackbar] = useState('success');

    const getBranches = async () => {
        // try {
        //     const response = await getAllSucursales(authTokens.access);
        //     setBranches(response.data);
        // }
        // catch (error) {
        //     setTypeSnackbar('error');
        //     setMessageSnackbar('sucursales.mensaje.errorListando');
        //     handleOpenSnackbar();
        // }

        setBranches(initialBranches);
    }

    const getBranch = async (id) => {
        if (id === null) {
            setEdit(false);
            setBranch(emptyBranch);
        }
        else {
            setEdit(true);
            try {
                const response = await getSucursal(id, authTokens.access);
                setBranch(response.data);
            }
            catch (error) {
                setTypeSnackbar('error');
                setMessageSnackbar('sucursales.mensaje.errorCargando');
                handleOpenSnackbar();
            }
        }
    }

    const addBranch = async (branch) => {
        try {
            const response = await createSucursal(branch, authTokens.access);
            setBranches([...branches, response.data]);

            setTypeSnackbar('success');
            setMessageSnackbar('sucursales.mensaje.agregado');
            handleOpenSnackbar();
            handleCloseForm();
        }
        catch (error) {
            const errors = error.response.data;

            if (errors.nombre) {
                setTypeSnackbar('error');
                setMessageSnackbar('sucursales.mensaje.errorNombre');
                setBranchError({ ...branchError, nombre: 'Error con el nombre ingresado' });
                handleOpenSnackbar();

            } else if (errors.direccion) {
                setTypeSnackbar('error');
                setMessageSnackbar('sucursales.mensaje.errorDireccion');
                setBranchError({ ...branchError, direccion: 'Error con la direccion ingresada' });
                handleOpenSnackbar();

            } else if (errors.ciudad) {
                setTypeSnackbar('error');
                setMessageSnackbar('sucursales.mensaje.errorCiudad');
                setBranchError({ ...branchError, ciudad: 'Error con la ciudad ingresada' });
                handleOpenSnackbar();

            } else if (errors.telefono) {
                setTypeSnackbar('error');
                setMessageSnackbar('sucursales.mensaje.errorTelefono');
                setBranchError({ ...branchError, telefono: 'Error con el telefono ingresado' });
                handleOpenSnackbar();

            } else {
                setTypeSnackbar('error');
                setMessageSnackbar('sucursales.mensaje.error');
                handleOpenSnackbar();
            }
        }
    }

    const updateBranch = async (branch) => {

        try {
            await updateSucursal(branch.id, branch, authTokens.access);
            setTypeSnackbar('success');
            setMessageSnackbar('sucursales.mensaje.editado');
            handleOpenSnackbar();
            handleCloseForm();
        }
        catch (error) {

            const errors = error.response.data;
            if (errors.nombre) {
                setTypeSnackbar('error');
                setMessageSnackbar('sucursales.mensaje.errorNombre');
                handleOpenSnackbar();
                setBranchError({ ...branchError, nombre: 'Error con el nombre ingresado' });
            } else {
                setTypeSnackbar('error');
                setMessageSnackbar('sucursales.mensaje.error');
                handleOpenSnackbar();
            }
        }
    }

    const deleteBranch = async (branch) => {
        
        try {
            await deleteSucursal(branch.id, authTokens.access);
            setBranches(branches.filter((item) => item.id !== branch.id));
            setTypeSnackbar('success');
            setMessageSnackbar('sucursales.mensaje.eliminado');
            handleOpenSnackbar();
        }
        catch (error) {
            const errors = error.response.data;
            if (errors.protected) {
                setTypeSnackbar('error');
                setMessageSnackbar(errors.protected);
                handleOpenSnackbar();
            } else {
                setTypeSnackbar('error');
                setMessageSnackbar('sucursales.mensaje.errorEliminar');
                handleOpenSnackbar();
            }
        }
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setBranch({
            ...branch,
            [name]: value
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateBranchOnSubmit()) {
            if (edit) {
                updateBranch(branch).then(() => getBranches());
            }
            else {
                addBranch(branch).then(() => getBranches());
            }
        }
    }

    const handleOnBlur = (event) => {
        const { name } = event.target;
        validateBranchOnBlur(branch, name);
    }

    const handleDelete = (event) => {
        event.preventDefault();
        deleteBranch(branch).then(() => getBranches());
        handleCloseDelete();
    }

    const handleOpenForm = async (event, id) => {
        getBranchError();
        await getBranch(id);
        setOpenForm(true);
    }

    const handleCloseForm = () => {
        setOpenForm(false);
    }

    const handleOpenDelete = (event, id) => {
        getBranch(id).then(() => setOpenDelete(true));
    }

    const handleCloseDelete = () => {
        setOpenDelete(false);
    }

    const handleOpenSnackbar = () => {
        setOpenSnackbar(true);
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    }

    const [edit, setEdit] = React.useState(false);

    const [branchError, setBranchError] = useState(emptyError);

    const getBranchError = () => {
        setBranchError(emptyError);
    }

    const validateBranchOnSubmit = () => {
        const updatedErrors = {};
        Object.keys(branchError).forEach((name) => {
            updatedErrors[name] = checkBranch(branch, name, edit);
        });
        setBranchError(updatedErrors);
        return Object.values(updatedErrors).some((error) => error !== '');
    };

    const validateBranchOnBlur = (branch, name) => {
        setBranchError({...branchError, [name]: checkBranch(branch, name, edit)});
    };

    return (
        <BranchContext.Provider value={
            {
                TABLE_HEAD,
                branch,
                branches,
                openForm,
                edit,
                openSnackbar,
                messageSnackbar,
                typeSnackbar,
                openDelete,
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
                branchError,
            }}>
            {props.children}
        </BranchContext.Provider>
    )
}