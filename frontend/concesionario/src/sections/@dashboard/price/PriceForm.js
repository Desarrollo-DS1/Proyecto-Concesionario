import React, {useContext} from 'react';
import Modal from '@mui/material/Modal';
import { useTranslation } from 'react-i18next';
import {
    Box,
    Button, Card,
    Divider,
    Grid, IconButton, InputAdornment,
    MenuItem,
    Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TextField,
    Typography
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import PriceContext from '../../../hooks/price/PriceContext';
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
    startAdornment: <InputAdornment position="start">%</InputAdornment>,
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
                {el.nombreModelo}
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

export default function PriceForm() {

    const {
        price,
        extras,
        colors,
        openForm,
        handleInputChange,
        handleOnBlur,
        handleCloseForm,
        handleSubmit,
        priceError,
        edit,
        cart,
        handleInputChangeCart,
        addCartModel,
        cartModel,
        models,
        deleteCartModel,
        cartModelError,
        handleOnBlurCartModel,
        total
    } = useContext(PriceContext);

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
                            {t(`cotizaciones.encabezado.${edit? "editar" : "agregar"}`)}
                        </Typography>
                    </Stack>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                id ={"cedulaCliente"}
                                error={priceError.cedulaCliente !== ""}
                                fullWidth
                                required
                                name="cedulaCliente"
                                value={price.cedulaCliente}
                                onChange={handleInputChange}
                                onBlur={handleOnBlur}
                                label={t('cotizaciones.label.cedulaCliente')} variant="outlined"
                                helperText={t(priceError.cedulaCliente, {maximo: '10', minimo: '8'})}
                                style={textFieldStyle}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                            id={"cedulaVendedor"}
                            error={priceError.cedulaVendedor !== ""}
                            fullWidth
                            required
                            name="cedulaVendedor"
                            value={price.cedulaVendedor}
                            onChange={handleInputChange}
                            label={t('cotizaciones.label.cedulaVendedor')} variant="outlined"
                            helperText={t(priceError.cedulaVendedor, {maximo: '10', minimo: '8'})}
                            style={textFieldStyle}
                            disabled
                        />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                id={"fechaCotizacion"}
                                error={priceError.fechaCotizacion !== ''}
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                type={"date"}
                                required
                                name={"fechaCotizacion"}
                                value={price.fechaCotizacion}
                                onChange={handleInputChange}
                                onBlur={handleOnBlur}
                                label={t("cotizaciones.label.fechaCotizacion")} variant="outlined"
                                helperText={t(priceError.fechaCotizacion)}
                                style={textFieldStyle}
                            />
                        </Grid>
                    </Grid>
                    <Divider sx={{ mb: 3 }} />
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                id="modelo"
                                error={cartModelError.modelo !== ''}
                                select
                                fullWidth
                                required
                                name={"modelo"}
                                value={cartModel.modelo}
                                onChange={handleInputChangeCart}
                                onBlur={handleOnBlurCartModel}
                                label={t("cotizaciones.label.modelo")} variant="outlined"
                                helperText={t(cartModelError.modelo)}
                                style={textFieldStyle}
                                SelectProps={{
                                    MenuProps: selectMenuProps
                                }}
                            >
                                {models.map((option) => {
                                    const { id, nombre } = option;
                                    return (
                                        <MenuItem key={id} value={option}>
                                            {nombre}
                                        </MenuItem>
                                    ); })}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                error={cartModelError.color !== ''}
                                select
                                fullWidth
                                required
                                name={"color"}
                                value={cartModel.color}
                                onChange={handleInputChangeCart}
                                onBlur={handleOnBlurCartModel}
                                label={t("cotizaciones.label.color")} variant="outlined"
                                helperText={t(cartModelError.color)}
                                style={textFieldStyle}
                                SelectProps={{
                                    MenuProps: selectMenuProps
                                }}
                            >
                                {colors.map((option) => {
                                    const { idColor, colorNombre, hexadecimalColor} = option;
                                    return (
                                        <MenuItem key={idColor} value={option}>
                                            <Stack direction={"row"}>
                                                <div
                                                    style={{
                                                        width: '20px',
                                                        height: '20px',
                                                        backgroundColor: hexadecimalColor,
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        borderRadius: '30%',
                                                        marginRight: '10px',
                                                        border: '1px solid #E6E6E6'
                                                    }}
                                                />
                                                {t(`colores.${colorNombre}`)}
                                            </Stack>
                                        </MenuItem>
                                    ); })}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                id={"extra"}
                                fullWidth
                                name={"extra"}
                                value={cartModel.extra}
                                onChange={handleInputChangeCart}
                                label={t("cotizaciones.label.extra")} variant="outlined"
                                style={textFieldStyle}
                            />
                        </Grid>
                    </Grid>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                        <Button variant="contained" color="primary" onClick={addCartModel}>
                            +
                        </Button>
                        <Typography variant="subtitle1" gutterBottom>
                            {t('cotizaciones.label.total')}: $ {total}
                        </Typography>
                    </Stack>
                    <Card>
                        <Scrollbar sx={{ height: 200 }}>
                            <TableContainer sx={{ height: 200 }}>
                                <Table size={"small"}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">{t('cotizaciones.label.modelo')}</TableCell>
                                            <TableCell align="center">{t('cotizaciones.label.color')}</TableCell>
                                            <TableCell align="center">{t('cotizaciones.label.extra')}</TableCell>
                                            <TableCell align="center" width={"1%"}>{""}</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {crearFila(cart, deleteCartModel)}
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