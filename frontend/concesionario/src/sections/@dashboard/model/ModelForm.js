import React, {useContext} from "react";
import Modal from "@mui/material/Modal";
import {
    Box,
    Button,
    Divider,
    Grid, InputAdornment,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import ModelContext from "../../../hooks/model/ModelContext";

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

export default function ModelForm() {

    const {
        model,
        openForm,
        handleInputChange,
        handleOnBlur,
        handleCloseForm,
        handleSubmit,
        modelError,
        edit} = useContext(ModelContext);

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
                      {edit? "Editar Modelo" : "Agregar Modelo"}
                  </Typography>
              </Stack>

              <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                      <TextField
                          error={modelError.nombre !== ""}
                          fullWidth
                          required
                          name="primerNombre"
                          value={model.nombre}
                          onChange={handleInputChange}
                          onBlur={handleOnBlur}
                          label="Nombre" variant="outlined"
                          helperText={modelError.nombre}
                          style={textFieldStyle}
                      />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                      <TextField
                          error={modelError.año !== ''}
                          InputLabelProps={{ shrink: true }}
                          fullWidth
                          type={"year"}
                          required
                          name={"año"}
                          value={model.año}
                          onChange={handleInputChange}
                          onBlur={handleOnBlur}
                          label="Año" variant="outlined"
                          helperText={modelError.año}
                          style={textFieldStyle}
                          inputProps={{
                              max: new Date().getFullYear(), // Establece el año actual como el valor máximo permitido.
                          }}
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <TextField
                          error={modelError.carroceria !== ''}
                          fullWidth
                          required
                          name={"primerApellido"}
                          value={model.carroceria}
                          onChange={handleInputChange}
                          onBlur={handleOnBlur}
                          label="Carroceria" variant="outlined"
                          helperText={modelError.carroceria}
                          style={textFieldStyle}
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <TextField
                          error={modelError.cilindraje !== ''}
                          fullWidth
                          name={"cilindraje"}
                          value={model.cilindraje}
                          onChange={handleInputChange}
                          onBlur={handleOnBlur}
                          label="Cilindraje" variant="outlined"
                          helperText={modelError.cilindraje}
                          style={textFieldStyle}
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <TextField
                          error={modelError.potencia !== ''}
                          fullWidth
                          required
                          name={"potencia"}
                          value={model.potencia}
                          onChange={handleInputChange}
                          onBlur={handleOnBlur}
                          label="Potencia" variant="outlined"
                          helperText={modelError.potencia}
                          style={textFieldStyle}
                      />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                      <TextField
                          error={modelError.combustible !== ''}
                          fullWidth
                          required
                          name={"combustible"}
                          value={model.combustible}
                          onChange={handleInputChange}
                          onBlur={handleOnBlur}
                          label="Combustible" variant="outlined"
                          helperText={modelError.combustible}
                          style={textFieldStyle}
                      />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                      <TextField
                          error={modelError.numeroPasajeros !== ''}
                          fullWidth
                          required
                          name={"numeroPasajeros"}
                          value={model.numeroPasajeros}
                          onChange={handleInputChange}
                          onBlur={handleOnBlur}
                          label="Numero Pasajeros" variant="outlined"
                          helperText={modelError.numeroPasajeros}
                          style={textFieldStyle}
                      />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                      <TextField
                          error={modelError.precioBase !== ''}
                          fullWidth
                          required
                          name={"precioBase"}
                          value={model.precioBase}
                          onChange={handleInputChange}
                          onBlur={handleOnBlur}
                          label="Precio Base" variant="outlined"
                          helperText={modelError.precioBase}
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