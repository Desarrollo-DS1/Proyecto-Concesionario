import React, {useContext} from "react";
import Modal from "@mui/material/Modal";
import {useTranslation} from "react-i18next";
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
                      {t(`empleados.encabezado.${edit? "editar" : "agregar"}`)}
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
                          label={t("empleados.label.primerNombre")} variant="outlined"
                          helperText={t(employeeError.primerNombre, {maximo: 50, minimo: 2})}
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
                          label={t("empleados.label.segundoNombre")} variant="outlined"
                          helperText={t(employeeError.segundoNombre, {maximo: 50, minimo: 2})}
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
                          label={t("empleados.label.primerApellido")} variant="outlined"
                          helperText={t(employeeError.primerApellido, {maximo: 50, minimo: 2})}
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
                          label={t("empleados.label.segundoApellido")} variant="outlined"
                          helperText={t(employeeError.segundoApellido, {maximo: 50, minimo: 2})}
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
                          label={t("empleados.label.cedula")} variant="outlined"
                          helperText={t(employeeError.cedula, {exacto: 10})}
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
                          label={t("empleados.label.telefono")} variant="outlined"
                          helperText={t(employeeError.telefono, {exacto: 7})}
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
                          label={t("empleados.label.celular")} variant="outlined"
                          helperText={t(employeeError.celular, {exacto: 10})}
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
                          label={t("empleados.label.ciudad")} variant="outlined"
                          helperText={t(employeeError.ciudad, {maximo: 50})}
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
                          label={t("empleados.label.direccion")} variant="outlined"
                          helperText={t(employeeError.direccion,  {maximo: '50', minimo: '5'})}
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
                          label={t("empleados.label.fechaNacimiento")} variant="outlined"
                          helperText={t(employeeError.fechaNacimiento)}
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
                          label={t("empleados.label.genero")} variant="outlined"
                          helperText={t(employeeError.genero)}
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
                          label={t("empleados.label.fechaIngreso")} variant="outlined"
                          helperText={t(employeeError.fechaIngreso)}
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
                          label={t("empleados.label.fechaRetiro")} variant="outlined"
                          helperText={t(employeeError.fechaRetiro)}
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
                          label={t("empleados.label.tipoSangre")} variant="outlined"
                          helperText={t(employeeError.tipoSangre)}
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
                          label={t("empleados.label.salario")} variant="outlined"
                          helperText={t(employeeError.salario)}
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
                          helperText={t(employeeError.eps)}
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
                          helperText={t(employeeError.arl)}
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
                          label={t("empleados.label.cargo")} variant="outlined"
                          helperText={t(employeeError.cargo)}
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
                          label={t("empleados.label.correo")} variant="outlined"
                          helperText={t(employeeError.correo,  {maximo: '320', minimo: '6'})}
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
                          label={t("empleados.label.contraseña")} variant="outlined"
                          helperText={t(employeeError.clave,  {maximo: '50', minimo: '8'})}
                          style={textFieldStyle}
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