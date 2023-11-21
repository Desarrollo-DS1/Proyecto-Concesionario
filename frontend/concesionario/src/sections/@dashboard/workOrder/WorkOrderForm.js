import React, {useContext} from "react";
import Modal from "@mui/material/Modal";
import MuiMenuItem from '@mui/material/MenuItem';
import {useTranslation} from "react-i18next";
import {
    Box,
    Button, Checkbox, Chip,
    Divider, FormControl, FormHelperText,
    Grid, InputAdornment, InputLabel, ListItemText,
    MenuItem, OutlinedInput, Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import {styled, useTheme} from "@mui/material/styles";
import WorkOrderContext from "../../../hooks/workOrder/WorkOrderContext";


const MenusItem = styled(MuiMenuItem)(({ theme }) => ({
    '& .MuiSvgIcon-root': {
        marginRight: theme.spacing(1),
    },
}))

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
            maxHeight: 300 // Establece la altura máxima del menú
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

const inputProps = {
    startAdornment: <InputAdornment position="start">$</InputAdornment>,
}

export default function WorkOrderForm() {

    const {
        workOrder,
        models,
        services,
        spareParts,
        openForm,
        handleInputChange,
        handleOnBlur,
        handleCloseForm,
        handleSubmit,
        workOrderError,
        handleDeleteChip,
        edit,
        searchService,
        handleSearchService,
        filteredServices,
        searchSparePart,
        handleSearchSparePart,
        filteredSpareParts,
        handleInputChangeModel,
        activateSparePart} = useContext(WorkOrderContext);

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

    console.log(workOrder)

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
                      {t(`ordenesTrabajo.encabezado.${edit? "editar" : "agregar"}`)}
                  </Typography>
              </Stack>
              <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                      <TextField
                          id="cedulaJefeTaller"
                          error={workOrderError.cedulaJefeTaller !== ""}
                          fullWidth
                          name="cedulaJefeTaller"
                          value={workOrder.cedulaJefeTaller}
                          label={t("ordenesTrabajo.label.cedulaJefeTaller")}
                          variant="outlined"
                          disabled
                          style={textFieldStyle}
                      />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                      <TextField
                          error={workOrderError.cedulaCliente !== ''}
                          fullWidth
                          required
                          name={"cedulaCliente"}
                          value={workOrder.cedulaCliente}
                          onChange={handleInputChange}
                          onBlur={(event) => handleOnBlur(event, "cedulaCliente")}
                          label={t("ordenesTrabajo.label.cedulaCliente")} variant="outlined"
                          helperText={t(workOrderError.cedulaCliente)}
                          style={textFieldStyle}
                      />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                      <TextField
                          error={workOrderError.placa !== ''}
                          fullWidth
                          required
                          name={"placa"}
                          value={workOrder.placa}
                          onChange={handleInputChange}
                          onBlur={(event) => handleOnBlur(event, "placa")}
                          label={t("ordenesTrabajo.label.placa")} variant="outlined"
                          helperText={t(workOrderError.cedulaCliente)}
                          style={textFieldStyle}
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <TextField
                          id="modelo"
                          error={workOrderError.modelo !== ''}
                          select
                          fullWidth
                          required
                          name={"modelo"}
                          value={workOrder.modelo}
                          onChange={handleInputChangeModel}
                          onBlur={handleOnBlur}
                          label={t("ordenesTrabajo.label.modelo")} variant="outlined"
                          helperText={t(workOrderError.modelo)}
                          style={textFieldStyle}
                          SelectProps={{
                              MenuProps: selectMenuProps
                          }}
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
                  <Grid item xs={12} sm={3}>
                      <TextField
                          id={"fechaInicio"}
                          error={workOrderError.fechaInicio !== ''}
                          InputLabelProps={{ shrink: true }}
                          fullWidth
                          type={"date"}
                          name={"fechaInicio"}
                          value={workOrder.fechaInicio}
                          label={t("ordenesTrabajo.label.fechaInicio")} variant="outlined"
                          style={textFieldStyle}
                          disabled
                      />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                      <TextField
                          id={"fechaEsperada"}
                          error={workOrderError.fechaEsperada !== ''}
                          InputLabelProps={{ shrink: true }}
                          fullWidth
                          type={"date"}
                          required
                          name={"fechaEsperada"}
                          value={workOrder.fechaEsperada}
                          onChange={handleInputChange}
                          onBlur={handleOnBlur}
                          label={t("ordenesTrabajo.label.fechaEsperada")} variant="outlined"
                          helperText={t(workOrderError.fechaEsperada)}
                          style={textFieldStyle}
                      />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                      <FormControl fullWidth sx={textFieldStyle}>
                          <InputLabel error={workOrderError.servicios !== ""} id="servicios">{t("ordenesTrabajo.label.servicios")}</InputLabel>
                          <Select
                              id="servicios"
                              input={<OutlinedInput label={t("ordenesTrabajo.label.servicios")} />}
                              multiple
                              name={"servicios"}
                              value={workOrder.servicios}
                              onChange={handleInputChange}
                              onClose={(event) => handleOnBlur(event, "servicios")}
                              variant="outlined"
                              MenuProps={{...selectMenuProps, name: "servicios"}}
                              error={workOrderError.servicios !== ""}

                              renderValue={(selected) => (
                                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, maxHeight: '100px', overflowY: 'auto', ...scrollBarStyle}}>
                                      {selected.map((id) => {
                                          const selectedService = services.find((service) => service.id === id);
                                          return (<Chip
                                              key={id}
                                              label={selectedService ? selectedService.nombre : ""}
                                              onDelete={() => handleDeleteChip(id, "servicios")}
                                              onMouseDown={(event) => {
                                                  event.stopPropagation();
                                              }}
                                          />)
                                      })}
                                  </Box>
                              )}
                          >
                              <Box my={1} mx={3} onKeyDown={(e) => e.stopPropagation()}>
                                  <TextField label={t('general.buscar')} value={searchService} onChange={(event)=>handleSearchService(event)} variant="outlined" fullWidth/>
                              </Box>

                              {filteredServices.map((option) => {
                                  const { id, nombre } = option;
                                  return (
                                      <MenuItem key={id} value={id}>
                                          <Checkbox checked={workOrder.servicios.indexOf(id) > -1} />
                                          <ListItemText primary={nombre} />
                                      </MenuItem>
                                  ); })}
                          </Select>
                          <FormHelperText error={workOrderError.servicios !== ""}>{t(workOrderError.servicios)}</FormHelperText>
                      </FormControl>

                  </Grid>
                  <Grid item xs={12} sm={12}>
                      <FormControl fullWidth sx={textFieldStyle}>
                          <InputLabel error={workOrderError.repuestos !== ""} id="repuestos">{t("ordenesTrabajo.label.repuestos")}</InputLabel>
                          <Select
                              id="repuestos"
                              input={<OutlinedInput label={t("ordenesTrabajo.label.ordenesTrabajo")} />}
                              multiple
                              name={"repuestos"}
                              value={workOrder.repuestos}
                              onChange={handleInputChange}
                              onClose={(event) => handleOnBlur(event, "repuestos")}
                              variant="outlined"
                              MenuProps={{...selectMenuProps, name: "repuestos"}}
                              error={workOrderError.repuestos !== ""}
                              disabled={activateSparePart}

                              renderValue={(selected) => ( !activateSparePart &&
                                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, maxHeight: '100px', overflowY: 'auto', ...scrollBarStyle}}>
                                      {selected.map((id) => {
                                          const selectedSparePart = spareParts.find((sparePart) => sparePart.id === id);
                                          return (<Chip
                                              key={id}
                                              label={selectedSparePart ? selectedSparePart.nombre : ""}
                                              onDelete={() => handleDeleteChip(id, "repuestos")}
                                              onMouseDown={(event) => {
                                                  event.stopPropagation();
                                              }}
                                          />)
                                      })}
                                  </Box>
                              )}
                          >
                              <Box my={1} mx={3} onKeyDown={(e) => e.stopPropagation()}>
                                  <TextField label={t('general.buscar')} value={searchSparePart} onChange={(event)=>handleSearchSparePart(event)} variant="outlined" fullWidth/>
                              </Box>

                              {filteredSpareParts.map((option) => {
                                  const { id, nombre } = option;
                                  return (
                                      <MenuItem key={id} value={id}>
                                          <Checkbox checked={workOrder.repuestos.indexOf(id) > -1} />
                                          <ListItemText primary={nombre} />
                                      </MenuItem>
                                  ); })}
                          </Select>
                          <FormHelperText error={workOrderError.repuestos !== ""}>{t(workOrderError.repuestos)}</FormHelperText>
                      </FormControl>

                  </Grid>
                  <Grid item xs={12} sm={12}>
                      <TextField
                          error={workOrderError.comentario !== ''}
                          fullWidth
                          multiline
                          name={"comentario"}
                          value={workOrder.comentario}
                          onChange={handleInputChange}
                          label={t("ordenesTrabajo.label.comentario")} variant="outlined"
                          rows={2}
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