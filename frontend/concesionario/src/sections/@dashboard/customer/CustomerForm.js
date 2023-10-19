import React, {useState} from "react";
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

export default function CustomerForm(props) {

    const initialFormData = {
        primerNombre: "",
        segundoNombre: "",
        primerApellido: "",
        segundoApellido: "",
        cedula: "",
        telefono: "",
        celular: "",
        ciudad: "",
        direccion: "",
        fechaNacimiento: "",
        genero: "",
        correo: "",
        clave: "",
    }

    const initialErrors = {
        primerNombre: '',
        segundoNombre: '',
        primerApellido: '',
        segundoApellido: '',
        cedula: '',
        telefono: '',
        celular: '',
        ciudad: '',
        direccion: '',
        fechaNacimiento: '',
        genero: '',
        correo: '',
        clave: '',
    }

    const [formData, setFormData] = useState(initialFormData);

    const [errores, setErrores] = useState(initialErrors);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (checkFields()) {
            handleModalClose();
            console.log('Datos del formulario:', formData);
            props.onSuccess();
        }
    };

    const handleModalClose = () => {
        setFormData(initialFormData);
        setErrores(initialErrors);
        props.onClose();
    };

    const handleMessageError = (event) => {
        const {name} = event.target;
        setErrores({
            ...errores,
            [name]: ''
        });
        console.log(errores);
    };

    const handleSelectChange = (event) => {
        handleInputChange(event);
        handleMessageError(event);
    }

    const checkFields = () => {

        const errorData = {
            correo: checkEmail(),
            celular: checkCellphone(),
            telefono: checkPhone(),
            clave: checkPassword(),
            ciudad: checkCity(),
            direccion: checkAddress(),
            primerNombre: checkFirstName(),
            primerApellido: checkFirstLastName(),
            fechaNacimiento: checkBornDate(),
            cedula: checkCedula(),
            genero: checkGender(),
            segundoNombre: checkSecondName(),
            segundoApellido: checkSecondLastName(),}

        setErrores(errorData);

        const isValid = Object.values(errorData).every(error => error === '')

        return isValid;
    };

    const checkEmail = () =>  {
        if (formData.correo === null || formData.correo === '') {
            return "El campo es requerido";
        }
        if (formData.correo.length > 320 || formData.correo.length < 6)
        {
            return "Max: 320 caracteres, Min: 6 caracteres";
        }
        if (!formData.correo.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ))
        {
            return "Ingrese un correo valido";
        }

        return "";
    }

    function checkCellphone() {
        if (formData.celular === null || formData.celular.trim() === '') {
            return "El campo es requerido";
        }
        if ((formData.celular).length !== 10)
        {
            return "Debe tener 10 digitos";
        }
        if (!formData.celular.match(/^[0-9]+$/))
        {
            return "Solo se permiten numeros";
        }
        return "";
    }

    function checkPhone() {
        if (formData.telefono === null || formData.telefono.trim() === '') {
            return "El campo es requerido";
        }
        if (!formData.telefono.match(/^[0-9]+$/))
        {
            return "Solo se permiten numeros";
        }
        if ((formData.telefono).length !== 7)
        {
            return "Debe tener 7 digitos";
        }

        return "";
    }

    function checkPassword() {
        if (formData.clave === null || formData.clave.trim() === '') {
            return "El campo es requerido"
        }
        if ((formData.clave).length > 50 || (formData.clave).length < 8)
        {
            return "Max: 50 caracteres, Min: 8 caracteres"
        }
        if (!formData.clave.match(/^(?=.*[a-z])$/))
        {
            return "Debe tener al menos una letra minuscula"
        }
        if (!formData.clave.match(/^(?=.*[A-Z])$/))
        {
            return "Debe tener al menos una letra mayuscula"
        }
        if (!formData.clave.match(/^(?=.*[0-9])$/))
        {
            return "Debe tener al menos un numero"
        }
        if (formData.clave.match(/\s/))
        {
            return "No se permiten espacios en blanco"
        }
        return "";
    }

    function checkCity() {
        if (formData.ciudad === null || formData.ciudad === '') {
            return "El campo ciudad es requerido"
        }
        if ((formData.ciudad).length > 50)
        {
            return "La ciudad no puede tener mas de 50 caracteres"
        }
        return "";
    }

    function checkAddress() {
        if (formData.direccion === null || formData.direccion === '') {
            return "El campo es requerido";
        }
        if ((formData.direccion).length > 50 || (formData.direccion).length < 5)
        {
            return "Max: 50 caracteres, Min: 5 caracteres";
        }
        return "";
    }

    function checkFirstName() {
        if (formData.primerNombre === null || formData.primerNombre.trim() === '') {
            return "El campo es requerido";
        }
        if (formData.primerNombre.length > 50 || formData.primerNombre.length < 2)
        {
            return "Max: 50 caracteres, Min: 2 caracteres";
        }
        if (!formData.primerNombre.match(/^[a-zA-Z]+$/))
        {
            return "Solo se permiten letras";
        }
        return "";
    }

    function checkSecondName() {

        if (formData.segundoNombre.trim() !== '') {
            if (formData.segundoNombre.length > 50 || formData.segundoNombre.length < 2)
            {
                return "Max: 50 caracteres, Min: 2 caracteres";
            }
            if (!formData.segundoNombre.match(/^[a-zA-Z]+$/))
            {
                return "Solo se permiten letras";
            }
        }
        return "";
    }

    function checkFirstLastName() {
        if (formData.primerApellido === null || formData.primerApellido.trim() === '') {
            return "El campo es requerido";
        }
        if (formData.primerApellido.length > 50 || formData.primerApellido.length < 2)
        {
            return "Max: 50 caracteres, Min: 2 caracteres";
        }
        if (!formData.primerApellido.match(/^[a-zA-Z]+$/))
        {
            return "Solo se permiten letras";
        }
        return "";
    }

    function checkSecondLastName() {
        if (formData.segundoApellido.trim() !== '') {
            if (formData.segundoApellido.length > 50 || formData.segundoApellido.length < 2)
            {
                return "Max: 50 caracteres, Min: 2 caracteres";
            }
            if (!formData.segundoApellido.match(/^[a-zA-Z]+$/))
            {
                return "Solo se permiten letras";
            }
        }
        return "";
    }

    function checkBornDate() {

        if (formData.fechaNacimiento === null || formData.fechaNacimiento.trim() === '') {
            return "El campo es requerido";
        }
        const fechaActual = new Date();
        const fechaNac = new Date(formData.fechaNacimiento);
        if (fechaNac > fechaActual)
        {
            return "Seleccione una fecha valida";
        }
        if (fechaNac.getFullYear() < 1900)
        {
            return "Seleccione una fecha valida";
        }
        if ((fechaActual.getFullYear() - fechaNac.getFullYear()) < 18)
        {
            return "Edad minima 18 años";
        }
        return "";
    }

    function checkCedula() {
        if (formData.cedula === null || formData.cedula.trim() === '') {
            return "El campo es requerido";
        }
        if (!formData.cedula.match(/^[0-9]+$/))
        {
            return "Solo se permiten numeros";
        }
        if (formData.cedula.length !== 10)
        {
            return "Debe tener 10 digitos";
        }

        return "";
    }

    function checkGender() {
        if (formData.genero === null || formData.genero === '') {
            return "El campo genero es requerido";
        }
        return "";
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
                      Nuevo cliente
                  </Typography>
              </Stack>
              <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                      <TextField
                          error={errores.primerNombre !== ""}
                          fullWidth
                          required
                          name="primerNombre"
                          value={formData.primerNombre}
                          onChange={handleInputChange}
                          onClick={handleMessageError}
                          id="outlined-error-helper-text" label="Primer Nombre" variant="outlined"
                          helperText={errores.primerNombre}
                          style={textFieldStyle}
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <TextField
                          error={errores.segundoNombre !== ''}
                          fullWidth
                          name="segundoNombre"
                          value={formData.segundoNombre}
                          onChange={handleInputChange}
                          onClick={handleMessageError}
                          id="outlined-basic" label="Segundo Nombre" variant="outlined"
                          helperText={errores.segundoNombre}
                          style={textFieldStyle}
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <TextField
                          error={errores.primerApellido !== ''}
                          fullWidth
                          required
                          name={"primerApellido"}
                          value={formData.primerApellido}
                          onChange={handleInputChange}
                          onClick={handleMessageError}
                          id="outlined-basic" label="Primer Apellido" variant="outlined"
                          helperText={errores.primerApellido}
                          style={textFieldStyle}
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <TextField
                          error={errores.segundoApellido !== ''}
                          fullWidth
                          name={"segundoApellido"}
                          value={formData.segundoApellido}
                          onChange={handleInputChange}
                          onClick={handleMessageError}
                          id="outlined-basic" label="Segundo Apellido" variant="outlined"
                          helperText={errores.segundoApellido}
                          style={textFieldStyle}
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <TextField
                          error={errores.cedula !== ''}
                          fullWidth
                          required
                          name={"cedula"}
                          value={formData.cedula}
                          onChange={handleInputChange}
                          onClick={handleMessageError}
                          id="outlined-basic" label="Cedula" variant="outlined"
                          helperText={errores.cedula}
                          style={textFieldStyle}
                      />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                      <TextField
                          error={errores.telefono !== ''}
                          fullWidth
                          required
                          name={"telefono"}
                          value={formData.telefono}
                          onChange={handleInputChange}
                          onClick={handleMessageError}
                          id="outlined-basic" label="Telefono" variant="outlined"
                          helperText={errores.telefono}
                          style={textFieldStyle}
                      />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                      <TextField
                          error={errores.celular !== ''}
                          fullWidth
                          required
                          name={"celular"}
                          value={formData.celular}
                          onChange={handleInputChange}
                          onClick={handleMessageError}
                          id="outlined-basic" label="Celular" variant="outlined"
                          helperText={errores.celular}
                          style={textFieldStyle}
                      />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                      <TextField
                          error={errores.ciudad !== ''}
                          fullWidth
                          required
                          name={"ciudad"}
                          value={formData.ciudad}
                          onChange={handleInputChange}
                          onClick={handleMessageError}
                          id="outlined-basic" label="Ciudad" variant="outlined"
                          helperText={errores.ciudad}
                          style={textFieldStyle}
                      />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                      <TextField
                          error={errores.direccion !== ''}
                          fullWidth
                          required
                          name={"direccion"}
                          value={formData.direccion}
                          onChange={handleInputChange}
                          onClick={handleMessageError}
                          id="outlined-basic" label="Direccion" variant="outlined"
                          helperText={errores.direccion}
                          style={textFieldStyle}
                      />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                      <TextField
                          error={errores.fechaNacimiento !== ''}
                          InputLabelProps={{ shrink: true }}
                          fullWidth
                          type={"date"}
                          required
                          name={"fechaNacimiento"}
                          value={formData.fechaNacimiento}
                          onChange={handleInputChange}
                          onClick={handleMessageError}
                          id="outlined-basic" label="Fecha de Nacimiento" variant="outlined"
                          helperText={errores.fechaNacimiento}
                          style={textFieldStyle}
                      />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                      <TextField
                          error={errores.genero !== ''}
                          select
                          fullWidth
                          required
                          name={"genero"}
                          value={formData.genero}
                          onChange={handleSelectChange}
                          id="outlined-basic" label="Genero" variant="outlined"
                          helperText={errores.genero}
                          style={textFieldStyle}
                      >
                          <MenuItem  key="0" value="male" name={"genero"}>Masculino</MenuItem >
                          <MenuItem  key="1" value="female" >Femenino</MenuItem >
                          <MenuItem  key="2" value="Otro" >Otro</MenuItem >
                      </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <TextField
                          error={errores.correo !== ''}
                          fullWidth
                          required
                          name={"correo"}
                          value={formData.correo}
                          onChange={handleInputChange}
                          onClick={handleMessageError}
                          id="outlined-basic" label="Correo" variant="outlined"
                          helperText={errores.correo}
                          style={textFieldStyle}
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <TextField
                          error={errores.clave !== ''}
                          fullWidth
                          required
                          name={"clave"}
                          value={formData.clave}
                          onChange={handleInputChange}
                          onClick={handleMessageError}
                          id="outlined-basic" label="Contraseña" variant="outlined"
                          helperText={errores.clave}
                          style={textFieldStyle}
                      />
                  </Grid>
              </Grid>
              <Divider sx={{ my: 2 }} />
              <Stack direction="row" alignItems="center" justifyContent="space-between" >
                  <Button variant="contained" type="submit">
                      Agregar
                  </Button>
                  <Button variant="contained" onClick={handleModalClose}>
                      Cancelar
                  </Button>
              </Stack>
          </Box>
      </Modal>
  );
}