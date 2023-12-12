import React, {useContext} from "react";
import Modal from "@mui/material/Modal";
import {useTranslation} from "react-i18next";
import {
    Box, Divider,
    IconButton,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import SparePartContext from "../../../hooks/sparePart/SparePartContext";

const scrollBarStyle = {
    scrollbarWidth: 'thin',
    scrollbarColor: '#888 #f1f1f1',
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

const createRows = (array, t, onChange) => (
    array.map(el => (


        <Stack direction="row" alignItems="center" justifyContent="space-between" key={el.id} mb={2}>
            <Typography variant="subtitle1">
                {el.sucursal}
            </Typography>
            <TextField
                label={t('repuestos.label.cantidad')}
                name="cantidad"
                value={el.cantidad}
                variant="outlined"
                onChange={(event)=>onChange(event, el.id)}
                InputProps={{
                    inputProps: { min: 0 }
                }}
            />
        </Stack>
    ))
);


export default function SparePartInventoryForm() {

    const {
         inventory,
         subtitle,
         openInventoryForm,
         handleInputChangeInventory,
         handleCloseInventoryForm,
         handleOnSubmitInventory} = useContext(SparePartContext);


    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "auto",
        height: "auto",
        maxWidth: isSmallScreen ? "80%" : "27%",
        maxHeight: isSmallScreen ? "80%" : "80%",
        minWidth: isSmallScreen ? "80%" : "27%",
        minHeight: "20%",
        overflowY: 'auto',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,

        ...(isSmallScreen ? {} : {scrollBarStyle}),
    };

    const { t } = useTranslation("lang");

    return (
        <Modal
            open = {openInventoryForm}
            onClose={handleCloseInventoryForm}
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
                    <Stack>
                        <Typography variant="h4" gutterBottom>
                            {t('repuestos.encabezado.inventario')}
                        </Typography>
                        <Typography variant="subtitle1">
                            {subtitle}
                        </Typography>
                    </Stack >
                    <Inventory2RoundedIcon />
                </Stack>
                <Divider sx={{ mb: 2}} />
                {createRows(inventory, t, handleInputChangeInventory)}
                <Stack direction="row" alignItems="center" justifyContent="space-between" mt={2}>
                    <IconButton color="success" >
                        <DoneRoundedIcon />
                    </IconButton>
                    <IconButton color="error" onClick={(event)=>handleCloseInventoryForm(event)}>
                        <ClearRoundedIcon />
                    </IconButton>
                </Stack>
            </Box>
        </Modal>
    );
}