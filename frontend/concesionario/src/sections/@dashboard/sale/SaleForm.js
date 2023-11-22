import React, {useContext} from 'react';
import Modal from '@mui/material/Modal';
import { useTranslation } from 'react-i18next';
import {
    Backdrop,
    Box,
    Button, CircularProgress,
    Divider,
    Grid, IconButton, InputAdornment,
    MenuItem,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import SaleContext from '../../../hooks/sales/SaleContext'; 

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
        isLoading
    } = useContext(SaleContext);

    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: isSmallScreen ? '90%' : '70%',
        height: isSmallScreen ? '80%' : '93%',
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
                            onBlur={handleOnBlur}
                            label={t('ventas.label.cedulaVendedor')} variant="outlined"
                            helperText={t(saleError.cedulaVendedor, {maximo: '10', minimo: '8'})}
                            style={textFieldStyle}
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
                </Box>
            </Modal>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 5000, position: 'absolute'}}
                open = {isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

        </>
    );
}