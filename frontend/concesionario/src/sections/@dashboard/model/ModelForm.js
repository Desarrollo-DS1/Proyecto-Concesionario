import React, {useContext} from "react";
import Modal from "@mui/material/Modal";
import {useTranslation} from "react-i18next";
import {
    Box,
    Button,
    Divider,
    Grid, InputAdornment, MenuItem,
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
    getcontentanchorel: null,
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
        bodyworks,
        fuels,
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
                      {t(`modelos.encabezado.${edit? "editar" : "agregar"}`)}
                  </Typography>
              </Stack>

              <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                      <TextField
                          error={modelError.nombre !== ""}
                          fullWidth
                          required
                          name="nombre"
                          value={model.nombre}
                          onChange={handleInputChange}
                          onBlur={handleOnBlur}
                          label={t("modelos.label.nombre")} variant="outlined"
                          helperText={t(modelError.nombre, {maximo: 50, minimo: 2})}
                          style={textFieldStyle}
                      />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                      <TextField
                          select
                          error={modelError.carroceria !== ''}
                          fullWidth
                          required
                          name={"carroceria"}
                          value={model.carroceria}
                          onChange={handleInputChange}
                          onBlur={handleOnBlur}
                          label={t("modelos.label.carroceria")} variant="outlined"
                          helperText={t(modelError.carroceria)}
                          style={textFieldStyle}
                          SelectProps={{
                              MenuProps: selectMenuProps
                          }}
                      >
                            {bodyworks.map((option) => (
                                <MenuItem key={option.id} value={option.label}>
                                    {t(`carrocerias.${option.label}`)}
                                </MenuItem>
                            ))}
                        </TextField>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                      <TextField
                          error={modelError.año !== ''}
                          fullWidth
                          required
                          name={"año"}
                          type={"text"}
                          value={model.año}
                          onChange={handleInputChange}
                          onBlur={handleOnBlur}
                          label={t("modelos.label.año")} variant="outlined"
                          helperText={t(modelError.año, {exacta: 4})}
                          style={textFieldStyle}
                          inputProps={{
                              maxLength: 4,
                          }}
                      />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                      <TextField
                          error={modelError.cilindraje !== ''}
                          fullWidth
                          required
                          name={"cilindraje"}
                          value={model.cilindraje}
                          onChange={handleInputChange}
                          onBlur={handleOnBlur}
                          label={t("modelos.label.cilindraje")} variant="outlined"
                          helperText={t(modelError.cilindraje, {maximo: 4})}
                          style={textFieldStyle}
                      />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                      <TextField
                          error={modelError.potencia !== ''}
                          fullWidth
                          required
                          name={"potencia"}
                          value={model.potencia}
                          onChange={handleInputChange}
                          onBlur={handleOnBlur}
                          label={t("modelos.label.potencia")} variant="outlined"
                          helperText={t(modelError.cilindraje, {maximo: 3})}
                          style={textFieldStyle}
                      />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                      <TextField
                          select
                          error={modelError.combustible !== ''}
                          fullWidth
                          required
                          name={"combustible"}
                          value={model.combustible}
                          onChange={handleInputChange}
                          onBlur={handleOnBlur}
                          label={t("modelos.label.combustible")} variant="outlined"
                          helperText={t(modelError.combustible)}
                          style={textFieldStyle}
                          SelectProps={{
                              MenuProps: selectMenuProps
                          }}
                      >
                          {fuels.map((option) => (
                              <MenuItem key={option.id} value={option.label}>
                                    {t(`combustibles.${option.label}`)}
                              </MenuItem>
                          ))}
                      </TextField>
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
                          label={t("modelos.label.capacidad")} variant="outlined"
                          helperText={t(modelError.numeroPasajeros, {maximo: 1})}
                          style={textFieldStyle}
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <TextField
                          error={modelError.precioBase !== ''}
                          fullWidth
                          required
                          name={"precioBase"}
                          value={model.precioBase}
                          onChange={handleInputChange}
                          onBlur={handleOnBlur}
                          label={t("modelos.label.precioBase")} variant="outlined"
                          helperText={t(modelError.precioBase)}
                          style={textFieldStyle}
                          InputProps={inputProps}
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