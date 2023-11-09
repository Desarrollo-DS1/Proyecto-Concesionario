import React, {useContext} from "react";
import Modal from "@mui/material/Modal";
import {useTranslation} from "react-i18next";
import {
    Box,
    Button,
    Divider,
    Grid,
    MenuItem,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import VehicleContext from "../../../hooks/vehicle/VehicleContext";

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

export default function VehicleForm() {

    const {
        vehicle,
        colors,
        models,
        branches,
        openForm,
        handleInputChange,
        handleOnBlur,
        handleCloseForm,
        handleSubmit,
        vehicleError,
        edit} = useContext(VehicleContext);

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
                      {t(`vehiculos.encabezado.${edit? "editar" : "agregar"}`)}
                  </Typography>
              </Stack>
              <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                      <TextField
                          id="vin"
                          error={vehicleError.vin !== ""}
                          fullWidth
                          required
                          name="vin"
                          disabled={ edit }
                          value={vehicle.vin}
                          onChange={handleInputChange}
                          onBlur={handleOnBlur}
                          label={t("vehiculos.label.vin")}
                          variant="outlined"
                          helperText={t(vehicleError.vin, {maximo: 17, minimo: 5})}
                          style={textFieldStyle}
                          inputProps={{style: {textTransform: 'uppercase'}}}
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <TextField
                          id="modelo"
                          error={vehicleError.modelo !== ''}
                          select
                          fullWidth
                          required
                          name={"modelo"}
                          value={vehicle.modelo}
                          onChange={handleInputChange}
                          onBlur={handleOnBlur}
                          label={t("vehiculos.label.modelo")} variant="outlined"
                          helperText={t(vehicleError.modelo)}
                          style={textFieldStyle}
                      >
                          {models.map((option) => {
                              const { id, nombre } = option;
                              return (
                                  <MenuItem key={id} value={id}>
                                      {nombre}
                                  </MenuItem>
                              ); })}
                      </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <TextField
                          id="sucursal"
                          error={vehicleError.sucursal !== ''}
                          select
                          fullWidth
                          required
                          name={"sucursal"}
                          value={vehicle.sucursal}
                          onChange={handleInputChange}
                          onBlur={handleOnBlur}
                          label={t("vehiculos.label.sucursal")} variant="outlined"
                          helperText={t(vehicleError.sucursal)}
                          style={textFieldStyle}
                          SelectProps={{
                              MenuProps: selectMenuProps
                          }}
                      >
                          {branches.map((option) => {
                            const { sucursal, nombreSucursal } = option;
                            return (
                              <MenuItem key={sucursal} value={sucursal}>
                                  {nombreSucursal}
                              </MenuItem>
                          ); })}
                      </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <TextField
                          error={vehicleError.color !== ''}
                          select
                          fullWidth
                          required
                          name={"color"}
                          value={vehicle.color}
                          onChange={handleInputChange}
                          onBlur={handleOnBlur}
                          label={t("vehiculos.label.color")} variant="outlined"
                          helperText={t(vehicleError.color)}
                          style={textFieldStyle}
                          SelectProps={{
                              MenuProps: selectMenuProps
                          }}
                      >
                          {colors.map((option) => {
                              const { idColor, colorNombre, hexadecimalColor} = option;
                              return (
                                  <MenuItem key={idColor} value={idColor}>
                                      <Stack direction={"row"}>
                                          <div
                                              style={{
                                                  width: '20px',
                                                  height: '20px',
                                                  backgroundColor: hexadecimalColor,
                                                  display: 'flex',
                                                  justifyContent: 'center',
                                                  alignItems: 'center',
                                                  borderRadius: '30%',
                                                  marginRight: '10px',
                                                  border: '1px solid #E6E6E6'
                                              }}
                                          />
                                          {colorNombre}
                                      </Stack>
                                  </MenuItem>
                              ); })}
                      </TextField>
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