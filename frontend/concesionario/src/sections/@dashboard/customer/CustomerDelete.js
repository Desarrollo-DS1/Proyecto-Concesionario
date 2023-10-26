import React, { useContext, useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import {
    Box,
    Button,
    Divider,
    Grid,
    MenuItem,
    Snackbar,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import CustomerContext from "../../../hooks/customer/CustomerContext";

export default function CustomerDelete(props) {

    const { openDelete, customer, deleteCustomer } = useContext(CustomerContext);

    const handleDeleteCustomer = () => {
        deleteCustomer(customer);
        props.onClose();
    }

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const modalStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: isSmallScreen ? "90%" : "70%",
        height: isSmallScreen ? "25%" : "auto",
        overflowY: "auto",
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
    };

    const handleModalClose = () => {
        props.onClose();
    };

    return (
        <Modal
            open = {openDelete}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                    <Typography variant="h4" gutterBottom>
                        Eliminar Cliente
                    </Typography>
                </Stack>
                <Typography variant="body1" gutterBottom>
                    ¿Está seguro de que desea eliminar este cliente?
                </Typography>
                <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button variant="contained" onClick={handleModalClose}>
                        No
                    </Button>
                    <Button variant="contained" color="error" onClick={handleDeleteCustomer}>
                        Sí
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
}