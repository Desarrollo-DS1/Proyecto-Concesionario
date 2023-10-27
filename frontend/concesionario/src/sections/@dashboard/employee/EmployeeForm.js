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
import EmployeeContext from "../../../hooks/employee/EmployeeContext";

const selectMenuProps = {
    anchorOrigin: {
        vertical: "bottom",
        horizontal: "left"
    },
    transformOrigin: {
        vertical: "top",
        horizontal: "left"
    },
    getContentAnchorEl: null,
    PaperProps: {
        style: {
            maxHeight: 125 // Establece la altura máxima del menú
        }
    }
};

const inputProps = {
    startAdornment: <InputAdornment position="start">$</InputAdornment>,
}

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

export default function EmployeeForm() {

    const {
        employee,
        bloodTypes,
        epss,
        arls,
        positions,
        genders,
        openForm,
        handleInputChange,
        handleOnBlur,
        handleCloseForm,
        handleSubmit,
        employeeError,
        edit} = useContext(EmployeeContext);

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
                      {edit? "Editar Empleado" : "Agregar Empleado"}
                  </Typography>
              </Stack>

              <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                      <TextField
                          error={employeeError.primerNombre !== ""}
                          fullWidth
                          required
                          name="primerNombre"
                          value={employee.primerNombre}
                          onChange={handleInputChange}
                          onBlur={handleOnBlur}
                          label="Primer Nombre" variant="outlined"
                          helperText={employeeError.primerNombre}
                          style={textFieldStyle}
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <TextField
                          error={employeeError.segundoNombre !== ''}
                          fullWidth
                          name="segundoNombre"
                          value={employee.segundoNombre}
                          onChange={handleInputChange}
                          onBlur={handleOnBlur}
                          label="Segundo Nombre" variant="outlined"
                          helperText={employeeError.segundoNombre}
                          style={textFieldStyle}
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <TextField
                          error={employeeError.primerApellido !== ''}
                          fullWidth
                          required
                          name={"primerApellido"}
                          value={employee.primerApellido}
                          onChange={handleInputChange}
                          onBlur={handleOnBlur}
                          label="Primer Apellido" variant="outlined"
                          helperText={employeeError.primerApellido}
                          style={textFieldStyle}
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <TextField
                          error={employeeError.segundoApellido !== ''}
                          fullWidth
                          name={"segundoApellido"}
                          value={employee.segundoApellido}
                          onChange={handleInputChange}
                          onBlur={handleOnBlur}
                          label="Segundo Apellido" variant="outlined"
                          helperText={employeeError.segundoApellido}
                          style={textFieldStyle}
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <TextField
                          error={employeeError.cedula !== ''}
                          fullWidth
                          required
                          name={"cedula"}
                          value={employee.cedula}
                          onChange={handleInputChange}
                          onBlur={handleOnBlur}
                          label="Cedula" variant="outlined"
                          helperText={employeeError.cedula}
                          style={textFieldStyle}
                          disabled={edit}
                      />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                      <TextField
                          error={employeeError.telefono !== ''}
                          fullWidth
                          required
                          name={"telefono"}
                          value={employee.telefono}
                          onChange={handleInputChange}
                          onBlur={handleOnBlur}
                          label="Telefono" variant="outlined"
                          helperText={employeeError.telefono}
                          style={textFieldStyle}
                      />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                      <TextField
                          error={employeeError.celular !== ''}
                          fullWidth
                          required
                          name={"celular"}
                          value={employee.celular}
                          onChange={handleInputChange}
                          onBlur={handleOnBlur}
                          label="Celular" variant="outlined"
                          helperText={employeeError.celular}
                          style={textFieldStyle}
                      />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                      <TextField
                          error={employeeError.ciudad !== ''}
                          fullWidth
                          required
                          name={"ciudad"}
                          value={employee.ciudad}
                          onChange={handleInputChange}
                          onBlur={handleOnBlur}
                          label="Ciudad" variant="outlined"
                          helperText={employeeError.ciudad}
                          style={textFieldStyle}
                      />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                      <TextField
                          error={employeeError.direccion !== ''}
                          fullWidth
                          required
                          name={"direccion"}
                          value={employee.direccion}
                          onChange={handleInputChange}
                          onBlur={handleOnBlur}
                          label="Direccion" variant="outlined"
                          helperText={employeeError.direccion}
                          style={textFieldStyle}
                      />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                      <TextField
                          error={employeeError.fechaNacimiento !== ''}
                          InputLabelProps={{ shrink: true }}
                          fullWidth
                          type={"date"}
                          required
                          name={"fechaNacimiento"}
                          value={employee.fechaNacimiento}
                          onChange={handleInputChange}
                          onBlur={handleOnBlur}
                          label="Fecha de Nacimiento" variant="outlined"
                          helperText={employeeError.fechaNacimiento}
                          style={textFieldStyle}
                      />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                      <TextField
                          error={employeeError.genero !== ''}
                          select
                          fullWidth
                          required
                          name={"genero"}
                          value={employee.genero}
                          onChange={handleInputChange}
                          onBlur={handleOnBlur}
                          label="Genero" variant="outlined"
                          helperText={employeeError.genero}
                          style={textFieldStyle}
                      >
                          {genders.map((option) => (
                              <MenuItem key={option.id} value={option.label}>
                                    {option.label}
                              </MenuItem>
                          ))}
                      </TextField>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                      <TextField
                          error={employeeError.fechaIngreso !== ''}
                          InputLabelProps={{ shrink: true }}
                          fullWidth
                          type={"date"}
                          required
                          name={"fechaIngreso"}
                          value={employee.fechaIngreso}
                          onChange={handleInputChange}
                          onBlur={handleOnBlur}
                          label="Fecha de Ingreso" variant="outlined"
                          helperText={employeeError.fechaIngreso}
                          style={textFieldStyle}
                      />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                      <TextField
                          error={employeeError.fechaRetiro !== ''}
                          InputLabelProps={{ shrink: true }}
                          fullWidth
                          type={"date"}
                          name={"fechaRetiro"}
                          value={employee.fechaRetiro}
                          onChange={handleInputChange}
                          onBlur={handleOnBlur}
                          label="Fecha de Retiro" variant="outlined"
                          helperText={employeeError.fechaRetiro}
                          style={textFieldStyle}
                      />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                      <TextField
                          error={employeeError.tipoSangre !== ''}
                          select
                          fullWidth
                          required
                          name={"tipoSangre"}
                          value={employee.tipoSangre}
                          onChange={handleInputChange}
                          onBlur={handleOnBlur}
                          label="T. Sangre" variant="outlined"
                          helperText={employeeError.tipoSangre}
                          style={textFieldStyle}
                          SelectProps={{
                              MenuProps: selectMenuProps
                          }}
                      >
                            {bloodTypes.map((option) => (
                                <MenuItem key={option.id} value={option.label}>
                                    {option.label}
                                </MenuItem>
                            ))}
                      </TextField>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                      <TextField
                          error={employeeError.salario !== ''}
                          fullWidth
                          name={"salario"}
                          value={employee.salario}
                          onChange={handleInputChange}
                          onBlur={handleOnBlur}
                          label="Salario" variant="outlined"
                          helperText={employeeError.salario}
                          style={textFieldStyle}
                          InputProps={inputProps}
                      />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                      <TextField
                          error={employeeError.eps !== ''}
                          select
                          fullWidth
                          required
                          name={"eps"}
                          value={employee.eps}
                          onChange={handleInputChange}
                          onBlur={handleOnBlur}
                          label="EPS" variant="outlined"
                          helperText={employeeError.eps}
                          style={textFieldStyle}
                          SelectProps={{
                              MenuProps: selectMenuProps
                          }}
                      >
                            {epss.map((option) => (
                                <MenuItem key={option.id} value={option.label}>
                                    {option.label}
                                </MenuItem>
                            ))}
                      </TextField>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                      <TextField
                          error={employeeError.arl !== ''}
                          select
                          fullWidth
                          required
                          name={"arl"}
                          value={employee.arl}
                          onChange={handleInputChange}
                          onBlur={handleOnBlur}
                          label="ARL" variant="outlined"
                          helperText={employeeError.arl}
                          style={textFieldStyle}
                          SelectProps={{
                              MenuProps: selectMenuProps
                          }}
                      >
                          {arls.map((option) => (
                              <MenuItem key={option.id} value={option.label}>
                                    {option.label}
                              </MenuItem>
                          ))}
                      </TextField>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                      <TextField
                          error={employeeError.cargo !== ''}
                          select
                          fullWidth
                          required
                          name={"cargo"}
                          value={employee.cargo}
                          onChange={handleInputChange}
                          onBlur={handleOnBlur}
                          label="Cargo" variant="outlined"
                          helperText={employeeError.cargo}
                          style={textFieldStyle}
                          SelectProps={{
                              MenuProps: selectMenuProps
                          }}
                      >
                            {positions.map((option) => (
                                <MenuItem key={option.id} value={option.label}>
                                    {option.label}
                                </MenuItem>
                            ))}
                      </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <TextField
                          error={employeeError.correo !== ''}
                          fullWidth
                          required
                          name={"correo"}
                          value={employee.correo}
                          onChange={handleInputChange}
                          onBlur={handleOnBlur}
                          label="Correo" variant="outlined"
                          helperText={employeeError.correo}
                          style={textFieldStyle}
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <TextField
                          error={employeeError.clave !== ''}
                          fullWidth
                          required
                          name={"clave"}
                          value={employee.clave}
                          onChange={handleInputChange}
                          onBlur={handleOnBlur}
                          label="Contraseña" variant="outlined"
                          helperText={employeeError.clave}
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