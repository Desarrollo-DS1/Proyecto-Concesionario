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
import Iconify from "../../../components/iconify";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1200,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};
export default function CustomerForm(props) {

  return (
      <Modal
          open={props.open}
          onClose={props.onClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
      >
          <Box
              component="form"
              sx={style}
              noValidate
              autoComplete="off"
          >
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                  <Typography variant="h4" gutterBottom>
                      Nuevo cliente
                  </Typography>
              </Stack>
              <Grid container spacing={4}>
                  <Grid item xs={6}>
                      <TextField
                          fullWidth
                          required
                          defaultValue={props.edit !== null ? props.initialData.row.primerNombre : ''}
                          id="outlined-basic" label="Primer Nombre" variant="outlined"
                      />
                  </Grid>
                  <Grid item xs={6}>
                      <TextField
                          fullWidth
                          required
                          defaultValue={props.edit !== null ? props.initialData.row.segundoNombre : ''}
                          id="outlined-basic" label="Segundo Nombre" variant="outlined"
                      />
                  </Grid>
                  <Grid item xs={6}>
                      <TextField
                          fullWidth
                          required
                          defaultValue={props.edit !== null ? props.initialData.row.primerApellido : ''}
                          id="outlined-basic" label="Primer Apellido" variant="outlined"
                      />
                  </Grid>
                  <Grid item xs={6}>
                      <TextField
                          fullWidth
                          required
                          defaultValue={props.edit !== null ? props.initialData.row.segundoApellido : ''}
                          id="outlined-basic" label="Segundo Apellido" variant="outlined"
                      />
                  </Grid>
                  <Grid item xs={6}>
                      <TextField
                          fullWidth
                          required
                          defaultValue={props.edit !== null ? props.initialData.row.cedula : ''}
                          id="outlined-basic" label="Cedula" variant="outlined"
                      />
                  </Grid>
                  <Grid item xs={6}>
                      <TextField
                          fullWidth
                          required
                          defaultValue={props.edit !== null ? props.initialData.row.celular : ''}
                          id="outlined-basic" label="Telefono" variant="outlined"
                      />
                  </Grid>
                  <Grid item xs={4}>
                      <TextField
                          fullWidth
                          required
                          defaultValue={props.edit !== null ? props.initialData.row.direccion : ''}
                          id="outlined-basic" label="Direccion" variant="outlined"
                      />
                  </Grid>
                  <Grid item xs={4}>
                      <TextField
                          InputLabelProps={{ shrink: true }}
                          fullWidth
                          type={"date"}
                          required
                          defaultValue={props.edit !== null ? props.initialData.row.fechaNacimiento : ''}
                          id="outlined-basic" label="Fecha de Nacimiento" variant="outlined"
                      />
                  </Grid>
                  <Grid item xs={4}>
                      <TextField
                          select
                          fullWidth
                          required
                          defaultValue={props.edit !== null ? props.initialData.row.genero : ''}
                          id="outlined-basic" label="Genero" variant="outlined"
                      >
                          <MenuItem  key="0" value="male">Masculino</MenuItem >
                          <MenuItem  key="1" value="female">Femenino</MenuItem >
                          <MenuItem  key="2" value="Otro">Otro</MenuItem >
                      </TextField>
                  </Grid>
                  <Grid item xs={6}>
                      <TextField
                          fullWidth
                          required
                          defaultValue={props.edit !== null ? props.initialData.row.correo : ''}
                          id="outlined-basic" label="Correo" variant="outlined"
                      />
                  </Grid>
              </Grid>
              <Divider sx={{ my: 2 }} />
              <Stack direction="row" alignItems="center" justifyContent="space-between" >
                  <Button variant="contained">
                      Agregar
                  </Button>
                  <Button variant="contained" onClick={props.onClose}>
                      Cancelar
                  </Button>
              </Stack>
          </Box>
      </Modal>
  );
}