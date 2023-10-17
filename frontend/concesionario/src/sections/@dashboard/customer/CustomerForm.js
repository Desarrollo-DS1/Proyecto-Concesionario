import React, {useState} from "react";
import Modal from "@mui/material/Modal";
import {
    Box,
    Button,
    Card,
    Divider,
    Grid,
    MenuItem,
    Stack,
    TableCell,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import Iconify from "../../../components/iconify";

// function checkFields(formData) {
//     if (formData.primerNombre === null || formData.primerNombre === '') {
//         return "El campo primer nombre es obligatorio";
//     }
//
// }

function checkEmail(email) {
    if (email === null || email === '') {
        return "El campo correo es obligatorio";
    }
    if (email.length > 320)
    {
        return "El correo no puede tener mas de 320 caracteres";
    }
    if (!email.includes('@'))
    {
        return "El correo debe tener un @";
    }

    return "";
}

function checkCellphone() {

}

function checkPhone() {

}

function checkPassword() {

}

function checkCity() {

}

function checkAddress() {

}

function checkNames() {

}

function checkLastNames() {

}

function checkBornDate() {

}

export default function CustomerForm(props) {

    const initialFormData = {
        primerNombre: null,
        segundoNombre: null,
        primerApellido: null,
        segundoApellido: null,
        cedula: null,
        telefono: null,
        celular: null,
        ciudad: null,
        direccion: null,
        fechaNacimiento: null,
        genero: null,
        correo: null,
        clave: null,
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
            console.log('Datos del formulario:', formData);
        }
    };

    const handleModalClose = () => {
        // Restablece los valores del formulario y los errores al estado inicial
        setFormData(initialFormData);
        setErrores(initialErrors);
        // Llama a la función onClose para cerrar el modal desde el componente padre
        props.onClose();
    };

    const handleMessageError = (event) => {
        const {name} = event.target;
        setErrores({
            ...errores,
            [name]: ''
        });
    };

    const checkFields = () => {
        setErrores({
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
            correo: checkEmail(formData.correo),
            clave: '',
        });
    };

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
                          error={errores.primerNombre !== ''}
                          fullWidth
                          required
                          name="primerNombre"
                          value={formData.primerNombre}
                          onChange={handleInputChange}
                          onClick={handleMessageError}
                          defaultValue={props.edit !== null ? props.initialData.row.primerNombre : ''}
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
                          defaultValue={props.edit !== null ? props.initialData.row.segundoNombre : ''}
                          id="outlined-basic" label="Segundo Nombre" variant="outlined"
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <TextField
                          fullWidth
                          required
                          name={"primerApellido"}
                          value={formData.primerApellido}
                          onChange={handleInputChange}
                          defaultValue={props.edit !== null ? props.initialData.row.primerApellido : ''}
                          id="outlined-basic" label="Primer Apellido" variant="outlined"
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <TextField
                          fullWidth
                          name={"segundoApellido"}
                          value={formData.segundoApellido}
                          onChange={handleInputChange}
                          defaultValue={props.edit !== null ? props.initialData.row.segundoApellido : ''}
                          id="outlined-basic" label="Segundo Apellido" variant="outlined"
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <TextField
                          fullWidth
                          required
                          name={"cedula"}
                          value={formData.cedula}
                          onChange={handleInputChange}
                          defaultValue={props.edit !== null ? props.initialData.row.cedula : ''}
                          id="outlined-basic" label="Cedula" variant="outlined"
                      />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                      <TextField
                          fullWidth
                          required
                          name={"telefono"}
                          value={formData.telefono}
                          onChange={handleInputChange}
                          defaultValue={props.edit !== null ? props.initialData.row.telefono : ''}
                          id="outlined-basic" label="Telefono" variant="outlined"
                      />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                      <TextField
                          fullWidth
                          required
                          name={"celular"}
                          value={formData.telefono}
                          onChange={handleInputChange}
                          defaultValue={props.edit !== null ? props.initialData.row.celular : ''}
                          id="outlined-basic" label="Celular" variant="outlined"
                      />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                      <TextField
                          fullWidth
                          required
                          name={"ciudad"}
                          value={formData.ciudad}
                          onChange={handleInputChange}
                          defaultValue={props.edit !== null ? props.initialData.row.ciudad : ''}
                          id="outlined-basic" label="Ciudad" variant="outlined"
                      />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                      <TextField
                          fullWidth
                          required
                          name={"direccion"}
                          value={formData.direccion}
                          onChange={handleInputChange}
                          defaultValue={props.edit !== null ? props.initialData.row.direccion : ''}
                          id="outlined-basic" label="Direccion" variant="outlined"
                      />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                      <TextField
                          InputLabelProps={{ shrink: true }}
                          fullWidth
                          type={"date"}
                          required
                          name={"fechaNacimiento"}
                          value={formData.fechaNacimiento}
                          onChange={handleInputChange}
                          defaultValue={props.edit !== null ? props.initialData.row.fechaNacimiento : ''}
                          id="outlined-basic" label="Fecha de Nacimiento" variant="outlined"
                      />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                      <TextField
                          select
                          fullWidth
                          required
                          name={"genero"}
                          value={formData.genero}
                          onChange={handleInputChange}
                          defaultValue={props.edit !== null ? props.initialData.row.genero : ''}
                          id="outlined-basic" label="Genero" variant="outlined"
                      >
                          <MenuItem  key="0" value="male">Masculino</MenuItem >
                          <MenuItem  key="1" value="female">Femenino</MenuItem >
                          <MenuItem  key="2" value="Otro">Otro</MenuItem >
                      </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <TextField
                          error={errores.correo !== ''}
                          email
                          fullWidth
                          required
                          name={"correo"}
                          value={formData.correo}
                          onChange={handleInputChange}
                          onClick={handleMessageError}
                          defaultValue={props.edit !== null ? props.initialData.row.correo : ''}
                          id="outlined-basic" label="Correo" variant="outlined"
                          helperText={errores.correo}
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <TextField
                          fullWidth
                          required
                          name={"clave"}
                          value={formData.clave}
                          onChange={handleInputChange}
                          defaultValue={props.edit !== null ? props.initialData.row.clave : ''}
                          id="outlined-basic" label="Contraseña" variant="outlined"
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