import React, {useContext} from "react";
import {useTranslation} from "react-i18next";
import Modal from "@mui/material/Modal";
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
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import BranchContext from "../../../hooks/branch/BranchContext";

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

export default function BranchForm() {
    const {
        branch,
        openForm,
        handleInputChange,
        handleOnBlur,
        handleCloseForm,
        handleSubmit,
        branchError,
        edit,
        isLoading} = useContext(BranchContext);

        const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: isSmallScreen ? '90%' : 'auto',
        height: isSmallScreen ? '80%' : 'auto',
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
                        {t(`sucursales.encabezado.${edit? "editar" : "agregar"}`)}
                    </Typography>
                </Stack>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="nombre"
                            error={branchError.nombre !== ""}
                            fullWidth
                            required
                            name="nombre"
                            value={branch.nombre}
                            onChange={handleInputChange}
                            onBlur={handleOnBlur}
                            label={t("sucursales.label.nombre")} variant="outlined"
                            helperText={t(branchError.nombre, {maximo: '50', minimo: '2'})}
                            style={textFieldStyle}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="direccion"
                            error={branchError.direccion !== ""}
                            fullWidth
                            required
                            name="direccion"
                            value={branch.direccion}
                            onChange={handleInputChange}
                            onBlur={handleOnBlur}
                            label={t("sucursales.label.direccion")} variant="outlined"
                            helperText={t(branchError.direccion, {maximo: '100', minimo: '2'})}
                            style={textFieldStyle}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="ciudad"
                            error={branchError.ciudad !== ""}
                            fullWidth
                            required
                            name="ciudad"
                            value={branch.ciudad}
                            onChange={handleInputChange}
                            onBlur={handleOnBlur}
                            label={t("sucursales.label.ciudad")} variant="outlined"
                            helperText={t(branchError.ciudad, {maximo: '50', minimo: '2'})}
                            style={textFieldStyle}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="telefono"
                            error={branchError.telefono !== ""}
                            fullWidth
                            required
                            name="telefono"
                            value={branch.telefono}
                            onChange={handleInputChange}
                            onBlur={handleOnBlur}
                            label={t("sucursales.label.telefono")} variant="outlined"
                            helperText={t(branchError.telefono, {maximo: '10', minimo: '7'})}
                            style={textFieldStyle}
                        />
                    </Grid>
                </Grid>
                <Divider sx={{my: 2}}/>
                <Stack direction="row" alignItems="center" justifyContent="space-between" >
                    <Button id={"agregar-editar-sucursal"} variant="contained" type="submit">
                        {t(`general.botones.${edit? "editar" : "agregar"}`)}
                    </Button>
                    <Button variant="contained" onClick={handleCloseForm}>
                        {t("general.botones.cancelar")}
                    </Button>
                </Stack>
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