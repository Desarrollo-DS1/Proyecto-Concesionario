import React, {useContext} from "react";
import Modal from "@mui/material/Modal";
import {useTranslation} from "react-i18next";
import {
    Box, Checkbox, Divider, FormControlLabel,
    IconButton,
    Stack, Table, TableBody, TableCell, TableRow,
    TextField,
    Typography
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import HomeRepairServiceRoundedIcon from '@mui/icons-material/HomeRepairServiceRounded';
import WorkOrderContext from "../../../hooks/workOrder/WorkOrderContext";
import LabelPlate from "../../../components/label-plate/LabelPlate";

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

const createRows = (array, t, onChange, workOrder) => (
    array.map(el => (
        <Stack direction="row" alignItems="center" justifyContent="space-between" key={el.id}>
            <Typography variant="subtitle1">
                {el.servicio}
            </Typography>
            <Checkbox disabled={workOrder.estado} checked={el.estado} onChange={(event)=>onChange(event, el.id)}/>
        </Stack>
    ))
);

export default function ServiceWorkOrderForm() {

    const {
         workOrder,
         service,
         subtitle,
         openServiceForm,
         handleInputChangeService,
         handleCloseServiceForm} = useContext(WorkOrderContext);


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
        minWidth: isSmallScreen ? "80%" : "30%",
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
            open = {openServiceForm}
            onClose={handleCloseServiceForm}
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
                <Stack direction="row" alignItems="center" justifyContent="space-between" >
                    <Stack>
                        <Typography variant="h4" gutterBottom>
                            {t('ordenesTrabajo.encabezado.servicios')}
                        </Typography>
                    </Stack>
                    <HomeRepairServiceRoundedIcon />
                </Stack>
                <Stack direction="row" alignItems="center" mb={2} >
                    <LabelPlate plate={workOrder.placa} />
                    <Typography variant="subtitle2" ml={1}>
                        {subtitle}
                    </Typography>
                </Stack>
                <Divider/>
                {createRows(service, t, handleInputChangeService, workOrder)}
                <Stack direction="row" alignItems="center" justifyContent="space-between" mt={2}>
                    <IconButton color="success" disabled={workOrder.estado}>
                        <DoneRoundedIcon />
                    </IconButton>
                    <IconButton color="error" onClick={(event)=>handleCloseServiceForm(event)}>
                        <ClearRoundedIcon />
                    </IconButton>
                </Stack>
            </Box>
        </Modal>
    );
}