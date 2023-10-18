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
import {Alert} from "@mui/lab";

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

    const [isNotError, setIsNotError] = useState(true);

    const [formData, setFormData] = useState(initialFormData);

    const [errores, setErrores] = useState(initialErrors);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const a = () => {
        return isNotError;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = checkFields();
        console.log(isValid);
        if (a()) {
            console.log('Datos del formulario:', formData);
            props.onSuccess();
        }
    };

    const handleModalClose = () => {
        setFormData(initialFormData);
        setErrores(initialErrors);
        setIsNotError(true);
        props.onClose();
    };

    const handleMessageError = (event) => {
        const {name} = event.target;
        setErrores({
            ...errores,
            [name]: ''
        });

        if (!isNotError){
            setIsNotError(true);
        }
    };

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
            genero: checkGender(),}

        setErrores(errorData);
        return isNotError;
    };

    const checkEmail = () =>  {
        if (formData.correo === null || formData.correo === '') {
            setIsNotError(false)
            return "El campo correo es requerido";
        }
        if ((formData.correo).length > 320)
        {
            setIsNotError(false)
            return "El campo correo es requerido";
        }
        if (!formData.correo.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ))
        {
            setIsNotError(false)
            return "El campo correo es requerido";
        }

        return "";
    }

    function checkCellphone() {
        if (formData.celular === null || formData.celular === '') {
            setIsNotError(false)
            return "El campo celular es requerido"
        }
        if ((formData.celular).length > 10)
        {
            setIsNotError(false)
            return "El celular no puede tener mas de 10 caracteres"
        }
        return "";
    }

    function checkPhone() {
        if (formData.telefono === null || formData.telefono === '') {
            setIsNotError(false)
            return "El campo telefono es requerido"
        }
        if ((formData.telefono).length > 10)
        {
            setIsNotError(false)
            return "El telefono no puede tener mas de 10 caracteres"
        }
        return "";
    }

    function checkPassword() {
        if (formData.clave === null || formData.clave === '') {
            setIsNotError(false);
            return "El campo clave es requerido"
        }
        if ((formData.clave).length > 50)
        {
            setIsNotError(false)
            return "La clave no puede tener mas de 50 caracteres"
        }
        return "";
    }

    function checkCity() {
        if (formData.ciudad === null || formData.ciudad === '') {
            setIsNotError(false);
            return "El campo ciudad es requerido"
        }
        if ((formData.ciudad).length > 50)
        {
            setIsNotError(false)
            return "La ciudad no puede tener mas de 50 caracteres"
        }
        return "";
    }

    function checkAddress() {
        if (formData.direccion === null || formData.direccion === '') {
            setIsNotError(false);
            return "El campo direccion es requerido"
        }
        if ((formData.direccion).length > 50)
        {
            setIsNotError(false)
            return "La direccion no puede tener mas de 50 caracteres"
        }
        return "";
    }

    function checkFirstName() {
        if (formData.primerNombre === null || formData.primerNombre === '') {
            setIsNotError(false);
            return "El campo primer nombre es requerido"
        }
        if ((formData.primerNombre).length > 50)
        {
            setIsNotError(false)
            return "El primer nombre no puede tener mas de 50 caracteres"
        }
        return "";
    }

    function checkFirstLastName() {
        if (formData.primerApellido === null || formData.primerApellido === '') {
            setIsNotError(false);
            return "El campo primer apellido es requerido"
        }
        if ((formData.primerApellido).length > 50)
        {
            setIsNotError(false)
            return "El primer apellido no puede tener mas de 50 caracteres"
        }
        return "";
    }

    function checkBornDate() {
        if (formData.fechaNacimiento === null || formData.fechaNacimiento === '') {
            setIsNotError(false);
            return "El campo fecha de nacimiento es requerido"
        }
        return "";
    }

    function checkCedula() {
        if (formData.cedula === null || formData.cedula === '') {
            setIsNotError(false);
            return "El campo cedula es requerido"
        }
        return "";
    }

    function checkGender() {
        if (formData.genero === null || formData.genero === '') {
            setIsNotError(false);
            return "El campo genero es requerido"
        }
        return "";
    }

    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const style = {
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

    return (
      <Modal
          open={props.open}
          onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
      >
          <Box
              component="form"
              sx={style}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
          >
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                  <Typography variant="h4" gutterBottom>
                      Nuevo cliente
                  </Typography>
              </Stack>
              <Grid container spacing={4}>
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
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <TextField
                          fullWidth
                          name="segundoNombre"
                          value={formData.segundoNombre}
                          onChange={handleInputChange}
                          id="outlined-basic" label="Segundo Nombre" variant="outlined"
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
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <TextField
                          fullWidth
                          name={"segundoApellido"}
                          value={formData.segundoApellido}
                          onChange={handleInputChange}
                          id="outlined-basic" label="Segundo Apellido" variant="outlined"
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
                          onChange={handleInputChange}
                          onClick={handleMessageError}
                          id="outlined-basic" label="Genero" variant="outlined"
                          helperText={errores.genero}
                      >
                          <MenuItem  key="0" value="male">Masculino</MenuItem >
                          <MenuItem  key="1" value="female">Femenino</MenuItem >
                          <MenuItem  key="2" value="Otro">Otro</MenuItem >
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