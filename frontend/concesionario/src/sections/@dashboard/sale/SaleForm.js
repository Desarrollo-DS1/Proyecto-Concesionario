import React, {useContext} from 'react';
import Modal from '@mui/material/Modal';
import { useTranslation } from 'react-i18next';
import {
    Backdrop,
    Box,
    Button, Card, CircularProgress,
    Divider,
    Grid, IconButton, InputAdornment,
    MenuItem,
    Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TextField,
    Typography
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DeleteIcon from "@mui/icons-material/Delete";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import SaleContext from '../../../hooks/sales/SaleContext';
import Scrollbar from "../../../components/scrollbar";

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

const inputProps = {
    startAdornment: <InputAdornment position="start">$</InputAdornment>,
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

const crearFila = (cart, deleteCart) => {
    return cart.map(el => {
        return <TableRow key={el.id}>
            <TableCell align="center">
                {el.nombreVehiculo}
            </TableCell>
            <TableCell align="center">
                <Stack alignItems={"center"} >
                    <div
                        style={{
                            width: '20px',
                            height: '20px',
                            backgroundColor: el.hexadecimalColor,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '30%',
                            marginRight: '10px',
                            border: '1px solid #E6E6E6'
                        }}
                    />
                </Stack>
            </TableCell >
            <TableCell align="center">
                {el.descuento}
            </TableCell>
            <TableCell align="center" >
                {el.nombreExtra}
            </TableCell>
            <TableCell align="center" width={"1%"}>
                <IconButton onClick={(event)=>deleteCart(event, el.id)}>
                    <DeleteIcon/>
                </IconButton>
            </TableCell>
        </TableRow>
    })
}

export default function SaleForm() {

    const {
        sale,
        // customers,
        // salespersons,
        // dates,
        // values,
        // vehicless,
        openForm,
        handleInputChange,
        handleOnBlur,
        handleCloseForm,
        handleSubmit,
        saleError,
        edit,
        cart,
        handleInputChangeCart,
        addCartVehicle,
        cartVehicle,
        vehicles,
        deleteCartVehicle,
        cartVehicleError,
        handleOnBlurCartVehicle
    } = useContext(SaleContext);

    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "auto",
        height: "auto",
        maxWidth: isSmallScreen ? "80%" : "40%",
        maxHeight: isSmallScreen ? "80%" : "80%",
        minWidth: isSmallScreen ? "80%" : "80%",
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
        <>
            <Modal
                open={openForm}
                onClose={handleCloseForm}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    component="form"
                    sx={modalStyle}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                        <Typography variant="h4" gutterBottom>
                            {t(`ventas.encabezado.${edit? "editar" : "agregar"}`)}
                        </Typography>
                    </Stack>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                id ={"cedulaCliente"}
                                error={saleError.cedulaCliente !== ""}
                                fullWidth
                                required
                                name="cedulaCliente"
                                value={sale.cedulaCliente}
                                onChange={handleInputChange}
                                onBlur={handleOnBlur}
                                label={t('ventas.label.cedulaCliente')} variant="outlined"
                                helperText={t(saleError.cedulaCliente, {maximo: '10', minimo: '8'})}
                                style={textFieldStyle}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                            id={"cedulaVendedor"}
                            error={saleError.cedulaVendedor !== ""}
                            fullWidth
                            required
                            name="cedulaVendedor"
                            value={sale.cedulaVendedor}
                            onChange={handleInputChange}
                            label={t('ventas.label.cedulaVendedor')} variant="outlined"
                            helperText={t(saleError.cedulaVendedor, {maximo: '10', minimo: '8'})}
                            style={textFieldStyle}
                            disabled
                        />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                id={"fechaVenta"}
                                error={saleError.fechaVenta !== ''}
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                type={"date"}
                                required
                                name={"fechaVenta"}
                                value={sale.fechaVenta}
                                onChange={handleInputChange}
                                onBlur={handleOnBlur}
                                label={t("ventas.label.fechaVenta")} variant="outlined"
                                helperText={t(saleError.fechaVenta)}
                                style={textFieldStyle}
                            />
                        </Grid>
                    </Grid>
                    <Divider sx={{ mb: 3 }} />
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                select
                                id ={"vehiculo"}
                                error={cartVehicleError.vehiculo !== ""}
                                fullWidth
                                required
                                name="vehiculo"
                                value={cartVehicle.vehiculo}
                                onChange={handleInputChangeCart}
                                onBlur={handleOnBlurCartVehicle}
                                label={t('ventas.label.vehiculo')} variant="outlined"
                                helperText={t(cartVehicleError.vehiculo)}
                                style={textFieldStyle}
                                SelectProps={{
                                    MenuProps: selectMenuProps
                                }}
                            >
                            {vehicles.map((option) => (
                                <MenuItem key={option.vin} value={option}>
                                    <Stack direction={"row"}>
                                        <div
                                            style={{
                                                width: '20px',
                                                height: '20px',
                                                backgroundColor: option.hexadecimalColor,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderRadius: '30%',
                                                marginRight: '10px',
                                                border: '1px solid #E6E6E6'
                                            }}
                                        />
                                        {option.nombreModelo}
                                    </Stack>
                                </MenuItem>
                            ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                id={"descuento"}
                                error={cartVehicleError.descuento !== ""}
                                fullWidth
                                name="descuento"
                                value={cartVehicle.descuento}
                                onChange={handleInputChangeCart}
                                onBlur={handleOnBlurCartVehicle}
                                label={t('ventas.label.descuento')} variant="outlined"
                                helperText={t(cartVehicleError.descuento)}
                                style={textFieldStyle}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                id={"extra"}
                                fullWidth
                                name={"extra"}
                                value={cartVehicle.extra}
                                onChange={handleInputChangeCart}
                                label={t("ventas.label.extra")} variant="outlined"
                                style={textFieldStyle}
                            />
                        </Grid>
                    </Grid>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                        <Button variant="contained" color="primary" onClick={addCartVehicle}>
                            +
                        </Button>
                    </Stack>
                    <Card>
                        <Scrollbar sx={{ height: 200 }}>
                            <TableContainer sx={{ height: 200 }}>
                                <Table size={"small"}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">{t('ventas.label.vehiculo')}</TableCell>
                                            <TableCell align="center">{t('ventas.label.color')}</TableCell>
                                            <TableCell align="center">{t('ventas.label.descuento')}</TableCell>
                                            <TableCell align="center">{t('ventas.label.extra')}</TableCell>
                                            <TableCell align="center" width={"1%"}>{""}</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {crearFila(cart, deleteCartVehicle)}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Scrollbar>
                    </Card>
                    <Divider sx={{ my: 2 }} />
                    <Stack direction="row" alignItems="center" justifyContent="space-between" >
                        <Button variant="contained" type="submit">
                            {t(`general.botones.${edit? "editar" : "agregar"}`)}
                        </Button>
                        <Button variant="contained" onClick={handleCloseForm}>
                            {t("general.botones.cancelar")}
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        </>
    );
}