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
import SparePartContext from "../../../hooks/sparePart/SparePartContext";


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

export default function SparePartForm() {

    const {
        sparePart,
        models,
        openForm,
        handleInputChange,
        handleOnBlur,
        handleCloseForm,
        handleSubmit,
        sparePartError,
        handleDeleteChip,
        edit,
        searchModel,
        handleSearchModel,
        filteredModels} = useContext(SparePartContext);

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
                      {t(`repuestos.encabezado.${edit? "editar" : "agregar"}`)}
                  </Typography>
              </Stack>
              <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                      <TextField
                          id="nombre"
                          error={sparePartError.nombre !== ""}
                          fullWidth
                          required
                          name="nombre"
                          value={sparePart.nombre}
                          onChange={handleInputChange}
                          onBlur={(event) => handleOnBlur(event, "nombre")}
                          label={t("repuestos.label.nombre")}
                          variant="outlined"
                          helperText={t(sparePartError.nombre, {maximo: 50, minimo: 2})}
                          style={textFieldStyle}
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <TextField
                          error={sparePartError.precio !== ''}
                          fullWidth
                          required
                          name={"precio"}
                          value={sparePart.precio}
                          onChange={handleInputChange}
                          onBlur={(event) => handleOnBlur(event, "precio")}
                          label={t("repuestos.label.precio")} variant="outlined"
                          helperText={t(sparePartError.precio)}
                          style={textFieldStyle}
                          InputProps={inputProps}
                      />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                      <FormControl fullWidth sx={textFieldStyle}>
                          <InputLabel error={sparePartError.modelos !== ""} id="modelos">{t("repuestos.label.modelos")}</InputLabel>
                          <Select
                              id="modelos"
                              input={<OutlinedInput label={t("repuestos.label.modelos")} />}
                              multiple
                              name={"modelos"}
                              value={sparePart.modelos}
                              onChange={handleInputChange}
                              onClose={(event) => handleOnBlur(event, "modelos")}
                              variant="outlined"
                              MenuProps={{...selectMenuProps, name: "modelos"}}
                              error={sparePartError.modelos !== ""}

                              renderValue={(selected) => (
                                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, maxHeight: '100px', overflowY: 'auto', ...scrollBarStyle}}>
                                      {selected.map((id) => {
                                          const selectedModel = models.find((model) => model.id === id);
                                          return (<Chip
                                              key={id}
                                              label={selectedModel ? selectedModel.nombre : ""}
                                              onDelete={() => handleDeleteChip(id)}
                                              onMouseDown={(event) => {
                                                  event.stopPropagation();
                                              }}
                                          />)
                                      })}
                                  </Box>
                              )}
                          >
                              <Box my={1} mx={3} onKeyDown={(e) => e.stopPropagation()}>
                                  <TextField label={t('general.buscar')} value={searchModel} onChange={(event)=>handleSearchModel(event)} variant="outlined" fullWidth/>
                              </Box>

                              {filteredModels.map((option) => {
                                  const { id, nombre } = option;
                                  return (
                                      <MenuItem key={id} value={id}>
                                          <Checkbox checked={sparePart.modelos.indexOf(id) > -1} />
                                          <ListItemText primary={nombre} />
                                      </MenuItem>
                                  ); })}
                          </Select>
                          <FormHelperText error={sparePartError.modelos !== ""}>{t(sparePartError.modelos)}</FormHelperText>
                      </FormControl>

                  </Grid>
                  <Grid item xs={12} sm={12}>
                      <TextField
                          id="descripcion"
                          multiline
                          fullWidth
                          name={"descripcion"}
                          value={sparePart.descripcion}
                          onChange={handleInputChange}
                          label={t("repuestos.label.descripcion")} variant="outlined"
                          rows={4}
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