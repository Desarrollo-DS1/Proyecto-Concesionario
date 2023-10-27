import React, {useContext} from "react";
import Modal from "@mui/material/Modal";
import {
    Box,
    Button,
    Divider,
    Grid, InputAdornment,
    MenuItem,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import CustomerContext from "../../../hooks/customer/CustomerContext";

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

export default function CustomerForm(props) {

    const {
        customer,
        genders,
        openForm,
        handleInputChange,
        handleOnBlur,
        handleCloseForm,
        handleSubmit,
        customerError,
        edit} = useContext(CustomerContext);

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

        ...(isSmallScreen ? {} : {scrollBarStyle}),
    };

    const textFieldStyle = { minHeight: "5rem" };

    return (
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
                          label="Primer Nombre" variant="outlined"
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
                          label="Segundo Nombre" variant="outlined"
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
                          label="Primer Apellido" variant="outlined"
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
                          label="Segundo Apellido" variant="outlined"
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
                          label="Cedula" variant="outlined"
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
                          label="Telefono" variant="outlined"
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
                          label="Celular" variant="outlined"
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
                          label="Ciudad" variant="outlined"
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
                          label="Direccion" variant="outlined"
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
                          label="Fecha de Nacimiento" variant="outlined"
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
                          label="Genero" variant="outlined"
                          helperText={customerError.genero}
                          style={textFieldStyle}
                      >
                          {genders.map((option) => (
                              <MenuItem key={option.id} value={option.label}>
                                  {option.label}
                              </MenuItem>
                          ))}
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
                          label="Correo" variant="outlined"
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
                          label="Contraseña" variant="outlined"
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
                  <Button variant="contained" onClick={handleCloseForm}>
                      Cancelar
                  </Button>
              </Stack>
          </Box>
      </Modal>
  );
}