import * as PropTypes from "prop-types";
import React, {useContext} from "react";
import Modal from "@mui/material/Modal";
import {useTranslation} from "react-i18next";
import {
    Box,
    Button,
    Divider,
    Grid, IconButton,
    MenuItem,
    Stack, Table, TableBody, TableCell, TableRow,
    TextField,
    Typography
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import SparePartContext from "../../../hooks/sparePart/SparePartContext";


const selectMenuProps = {
    anchorOrigin: {
        vertical: "bottom",
        horizontal: "left"
    },
    transformOrigin: {
        vertical: "top",
        horizontal: "left"
    },
    getcontentanchorel: null,
    PaperProps: {
        style: {
            maxHeight: 125 // Establece la altura máxima del menú
        }
    }
};

const scrollBarStyle = {
    scrollbarWidth: 'thin', // Para navegadores que no sean webkit
    scrollbarColor: '#888 #f1f1f1', // Color del pulgar y del riel
    WebkitOverflowScrolling: 'touch',
    '&::-webkit-scrollbar': {
        width: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
        background: '#888',
        borderRadius: '12px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        background: '#555',
    },
}

function TableHeader(props) {
    return null;
}

TableHeader.propTypes = {children: PropTypes.node};
export default function SparePartInventoryForm() {

    // const {
    //     vehicle,
    //     colors,
    //     models,
    //     branches,
    //     openForm,
    //     handleInputChange,
    //     handleOnBlur,
    //     handleCloseForm,
    //     handleSubmit,
    //     vehicleError,
    //     edit} = useContext(SparePartContext);

    const edit = false;


    const [filas, setFilas] = React.useState([{id:1, sucursal:`Sede norte`, cantidad: 10}, {id: 2, sucursal:`Sede sur`, cantidad: 10}]);

    const [filasNuevas, setFilasNuevas] = React.useState([]);

    const addFilas = () => {

        const ultimoId = filasNuevas.length > 0 ? filasNuevas[filasNuevas.length - 1].id : 0;

        // Incrementa el id para la nueva fila
        const nuevoId = ultimoId + 1;

        setFilasNuevas([...filasNuevas, {id:nuevoId, sucursal:'', cantidad: ''}]);
    }

    const chulo = (id) => {

        console.log(id);
        const fila = filasNuevas.find(el => el.id === id);
        console.log(fila);

        setFilasNuevas(filasNuevas.filter(el => el.id !== id));
        setFilas([...filas, fila])


    }

    const handleChange = (id, event) => {
        const { name, value } = event.target;

        setFilasNuevas((prevFilas) =>
            prevFilas.map((fila) =>
                fila.id === id ? { ...fila, [name]: value } : fila
            )
        );
    };


    const crearFila = () => {
        return filas.map(el => {
            return <TableRow>
                <TableCell align="left" width={"40%"}>
                    <TextField
                        fullWidth
                        label="Sucursal"
                        name="sucursal"
                        value={el.sucursal}
                        SelectProps={selectMenuProps}dfff
                        variant="outlined"
                    >
                        {/* {branches.map((branch) => ( */}
                        {/*    <MenuItem key={branch.id} value={branch.id}> */}
                        {/*        {branch.nombre} */}
                        {/*    </MenuItem> */}
                        {/* ))} */}
                    </TextField>
                </TableCell>
                <TableCell align="left" width={"30%"}>
                    <TextField

                        fullWidth
                        label="Cantidad"
                        name="cantidad"
                        value={el.cantidad}
                        variant="outlined"
                        type={"number"}
                    />
                </TableCell>
                <TableCell align="left" width={"20%"}>
                    <IconButton color="success">
                        <DoneRoundedIcon />
                    </IconButton>
                    <IconButton color="error">
                        <ClearRoundedIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
        })
    }

    const crearFilaNueva = () => {
        return filasNuevas.map(el => {
            return <TableRow>
                <TableCell align="left" width={"40%"}>
                    <TextField
                        fullWidth
                        label="Sucursal"
                        name="sucursal"
                        value={el.sucursal}
                        onChange={(event) => handleChange(el.id, event)}
                        SelectProps={selectMenuProps}
                    >
                        {/* {branches.map((branch) => ( */}
                        {/*    <MenuItem key={branch.id} value={branch.id}> */}
                        {/*        {branch.nombre} */}
                        {/*    </MenuItem> */}
                        {/* ))} */}
                    </TextField>
                </TableCell>
                <TableCell align="left" width={"30%"}>
                    <TextField
                        fullWidth
                        label="Cantidad"
                        name="cantidad"
                        value={el.cantidad}
                        variant="outlined"
                        onChange={(event) => handleChange(el.id, event)}
                        type={"number"}
                        InputProps={{ inputProps: { min: 0 } }}
                    />
                </TableCell>
                <TableCell align="left" width={"20%"}>
                    <IconButton color="success" onClick={(event)=>chulo(el.id)}>
                        <DoneRoundedIcon />
                    </IconButton>
                    <IconButton color="error">
                        <ClearRoundedIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
        })
    }


    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: isSmallScreen ? '90%' : '50%',
        height: isSmallScreen ? '80%' : '80%',
        overflowY: 'auto',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,

        ...(isSmallScreen ? {} : {scrollBarStyle}),
    };

    const textFieldStyle = { minHeight: "5rem" };

    const { t } = useTranslation("lang");

    return (
        <Modal
            open
            // onClose={handleCloseForm}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                component="form"
                sx={modalStyle}
                noValidate
                autoComplete="off"
                // onSubmit={handleSubmit}
            >
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2} >
                    <Typography variant="h4" gutterBottom>
                        Inventario en sucursales
                    </Typography>
                    <Inventory2RoundedIcon />
                </Stack>

                <Table size="small">
                    <TableHeader>
                        <TableRow>
                            <TableCell align="left">Sucursal</TableCell>
                            <TableCell align="left">Cantidad</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {crearFila()}
                        {crearFilaNueva()}
                    </TableBody>
                </Table>
                <Stack direction="row" alignItems="center" >
                    <IconButton color={"primary"} onClick={(event) => addFilas()}>
                        <AddRoundedIcon />
                    </IconButton>
                </Stack>
            </Box>
        </Modal>
    );
}