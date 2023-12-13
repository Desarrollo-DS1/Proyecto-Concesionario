import axios from "axios";

const repuestoApi = token =>
  axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}concesionarioapp/api/v1/Repuesto/`,
    headers: { Authorization: `Bearer ${token}` }
  });

export const getAllRepuestos = token => repuestoApi(token).get('');

export const getRepuesto = (id, token) => repuestoApi(token).get(`${id}/`);

export const createRepuesto = (repuesto, token) => repuestoApi(token).post('', repuesto);

export const updateRepuesto = (id, repuesto, token) => repuestoApi(token).put(`${id}/`, repuesto);

export const deleteRepuesto = (id, token) => repuestoApi(token).delete(`${id}/`);
