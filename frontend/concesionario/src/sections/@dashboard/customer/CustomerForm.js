import React, {useContext, useEffect, useState} from "react";
import Modal from "@mui/material/Modal";
import {
    Box,
    Button,
    Divider,
    Grid,
    MenuItem, Snackbar,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import CustomerContext from "../../../hooks/customer/CustomerContext";

export default function CustomerForm(props) {

    const {customer, editCustomer, customerError, edit, validateCustomerOnSubmit, validateCustomerOnBlur, setOpenSnackbar} = useContext(CustomerContext);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        editCustomer({
            ...customer,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateCustomerOnSubmit()) {
            setOpenSnackbar(true);
            props.onClose();
        }
    };

    const handleModalClose = () => {
        props.onClose();
    };

    const handleOnBlur = (event) => {
        const {name} = event.target;
        validateCustomerOnBlur(customer, name);
    }

    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: isSmallScreen ? '90%' : '70%',
        height: isSmallScreen ? '80%' : 'auto',
        overflowY: 'auto',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
    };

    const textFieldStyle = { minHeight: "5rem" };

    return (
      <Modal
          open={props.open}
          onClose={handleModalClose}
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
                      {edit? "Editar Cliente" : "Agregar Cliente"}
                  </Typography>
              </Stack>
              <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                      <TextField
                          error={customerError.primerNombre !== ""}
                          fullWidth
                          required
                          name="primerNombre"
                          value={customer.primerNombre}
                          onChange={handleInputChange}
                          onBlur={handleOnBlur}
                          id="outlined-error-helper-text" label="Primer Nombre" variant="outlined"
                          helperText={customerError.primerNombre}
                          style={textFieldStyle}
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <TextField
                          error={customerError.segundoNombre !== ''}
                          fullWidth
                          name="segundoNombre"
                          value={customer.segundoNombre}
                          onChange={handleInputChange}
                          onBlur={handleOnBlur}
                          id="outlined-basic" label="Segundo Nombre" variant="outlined"
                          helperText={customerError.segundoNombre}
                          style={textFieldStyle}
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <TextField
                          error={customerError.primerApellido !== ''}
                          fullWidth
                          required
                          name={"primerApellido"}
                          value={customer.primerApellido}
                          onChange={handleInputChange}
                          onBlur={handleOnBlur}
                          id="outlined-basic" label="Primer Apellido" variant="outlined"
                          helperText={customerError.primerApellido}
                          style={textFieldStyle}
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <TextField
                          error={customerError.segundoApellido !== ''}
                          fullWidth
                          name={"segundoApellido"}
                          value={customer.segundoApellido}
                          onChange={handleInputChange}
                          onBlur={handleOnBlur}
                          id="outlined-basic" label="Segundo Apellido" variant="outlined"
                          helperText={customerError.segundoApellido}
                          style={textFieldStyle}
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <TextField

                          error={customerError.cedula !== ''}
                          fullWidth
                          required
                          name={"cedula"}
                          value={customer.cedula}
                          onChange={handleInputChange}
                          onBlur={handleOnBlur}
                          id="outlined-basic" label="Cedula" variant="outlined"
                          helperText={customerError.cedula}
                          style={textFieldStyle}
                          disabled={edit}
                      />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                      <TextField
                          error={customerError.telefono !== ''}
                          fullWidth
                          required
                          name={"telefono"}
                          value={customer.telefono}
                          onChange={handleInputChange}
                          onBlur={handleOnBlur}
                          id="outlined-basic" label="Telefono" variant="outlined"
                          helperText={customerError.telefono}
                          style={textFieldStyle}
                      />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                      <TextField
                          error={customerError.celular !== ''}
                          fullWidth
                          required
                          name={"celular"}
                          value={customer.celular}
                          onChange={handleInputChange}
                          onBlur={handleOnBlur}
                          id="outlined-basic" label="Celular" variant="outlined"
                          helperText={customerError.celular}
                          style={textFieldStyle}
                      />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                      <TextField
                          error={customerError.ciudad !== ''}
                          fullWidth
                          required
                          name={"ciudad"}
                          value={customer.ciudad}
                          onChange={handleInputChange}
                          onBlur={handleOnBlur}
                          id="outlined-basic" label="Ciudad" variant="outlined"
                          helperText={customerError.ciudad}
                          style={textFieldStyle}
                      />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                      <TextField
                          error={customerError.direccion !== ''}
                          fullWidth
                          required
                          name={"direccion"}
                          value={customer.direccion}
                          onChange={handleInputChange}
                          onBlur={handleOnBlur}
                          id="outlined-basic" label="Direccion" variant="outlined"
                          helperText={customerError.direccion}
                          style={textFieldStyle}
                      />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                      <TextField
                          error={customerError.fechaNacimiento !== ''}
                          InputLabelProps={{ shrink: true }}
                          fullWidth
                          type={"date"}
                          required
                          name={"fechaNacimiento"}
                          value={customer.fechaNacimiento}
                          onChange={handleInputChange}
                          onBlur={handleOnBlur}
                          id="outlined-basic" label="Fecha de Nacimiento" variant="outlined"
                          helperText={customerError.fechaNacimiento}
                          style={textFieldStyle}
                      />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                      <TextField
                          error={customerError.genero !== ''}
                          select
                          fullWidth
                          required
                          name={"genero"}
                          value={customer.genero}
                          onChange={handleInputChange}
                          onBlur={handleOnBlur}
                          id="outlined-basic" label="Genero" variant="outlined"
                          helperText={customerError.genero}
                          style={textFieldStyle}
                      >
                          <MenuItem  key="0" value="male" name={"genero"}>Masculino</MenuItem >
                          <MenuItem  key="1" value="female" >Femenino</MenuItem >
                          <MenuItem  key="2" value="Otro" >Otro</MenuItem >
                      </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <TextField
                          error={customerError.correo !== ''}
                          fullWidth
                          required
                          name={"correo"}
                          value={customer.correo}
                          onChange={handleInputChange}
                          onBlur={handleOnBlur}
                          id="outlined-basic" label="Correo" variant="outlined"
                          helperText={customerError.correo}
                          style={textFieldStyle}
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <TextField
                          error={customerError.clave !== ''}
                          fullWidth
                          required
                          name={"clave"}
                          value={customer.clave}
                          onChange={handleInputChange}
                          onBlur={handleOnBlur}
                          id="outlined-basic" label="Contraseña" variant="outlined"
                          helperText={customerError.clave}
                          style={textFieldStyle}
                      />
                  </Grid>
              </Grid>
              <Divider sx={{ my: 2 }} />
              <Stack direction="row" alignItems="center" justifyContent="space-between" >
                  <Button variant="contained" type="submit">
                      {edit? "Editar" : "Agregar"}
                  </Button>
                  <Button variant="contained" onClick={handleModalClose}>
                      Cancelar
                  </Button>
              </Stack>
          </Box>
      </Modal>
  );
}