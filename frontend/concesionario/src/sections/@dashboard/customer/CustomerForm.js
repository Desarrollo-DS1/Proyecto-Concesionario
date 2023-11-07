import React, {useContext} from "react";
import {useTranslation} from "react-i18next";
import Modal from "@mui/material/Modal";
import {
    Box,
    Button,
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

export default function CustomerForm() {

    const {
        customer,
        genders,
        openForm,
        handleInputChange,
        handleOnBlur,
        handleCloseForm,
        handleSubmit,
        customerError,
        edit,
        showPassword,
        handleTogglePassword} = useContext(CustomerContext);

    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: isSmallScreen ? '90%' : '70%',
        height: isSmallScreen ? '80%' : '74%',
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
                      {t(`clientes.encabezado.${edit? "editar" : "agregar"}`)}
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
                          label= {t("clientes.label.primerNombre")} variant="outlined"
                          helperText={t(customerError.primerNombre,  {maximo: '50', minimo: '2'})}
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
                          label={t("clientes.label.segundoNombre")} variant="outlined"
                          helperText={t(customerError.segundoNombre,  {maximo: '50', minimo: '2'})}
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
                          label={t("clientes.label.primerApellido")} variant="outlined"
                          helperText={t(customerError.primerApellido,  {maximo: '50', minimo: '2'})}
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
                          label={t("clientes.label.segundoApellido")} variant="outlined"
                          helperText={t(customerError.segundoApellido,  {maximo: '50', minimo: '2'})}
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
                          label={t("clientes.label.cedula")} variant="outlined"
                          helperText={t(customerError.cedula,  {minimo: '8', maximo: '10'})}
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
                          label={t("clientes.label.telefono")} variant="outlined"
                          helperText={t(customerError.telefono, {minimo: '7', maximo: '10'})}
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
                          label={t("clientes.label.celular")} variant="outlined"
                          helperText={t(customerError.celular, {exacto: '10'})}
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
                          label={t("clientes.label.ciudad")} variant="outlined"
                          helperText={t(customerError.ciudad, {maximo: '50'})}
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
                          label={t("clientes.label.direccion")} variant="outlined"
                          helperText={t(customerError.direccion,  {maximo: '50', minimo: '5'})}
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
                          label={t("clientes.label.fechaNacimiento")} variant="outlined"
                          helperText={t(customerError.fechaNacimiento)}
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
                          label={t("clientes.label.genero")} variant="outlined"
                          helperText={t(customerError.genero)}
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
                          label={t("clientes.label.correo")} variant="outlined"
                          helperText={t(customerError.correo,  {maximo: '320', minimo: '6'})}
                          style={textFieldStyle}
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <TextField
                          type={showPassword ? 'text' : 'password'}
                          error={customerError.clave !== ''}
                          fullWidth
                          required
                          name={"clave"}
                          value={customer.clave}
                          onChange={handleInputChange}
                          onBlur={handleOnBlur}
                          label={t("clientes.label.contraseña")} variant="outlined"
                          helperText={t(customerError.clave,  {maximo: '50', minimo: '8'})}
                          style={textFieldStyle}
                          onCopy={(e) => {
                              e.preventDefault();
                          }}
                          InputProps={{
                              endAdornment: (
                                  <InputAdornment position="end">
                                      <IconButton onClick={handleTogglePassword} edge="end">
                                          {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                      </IconButton>
                                  </InputAdornment>
                              ),
                          }}
                      />
                  </Grid>
              </Grid>
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
  );
}