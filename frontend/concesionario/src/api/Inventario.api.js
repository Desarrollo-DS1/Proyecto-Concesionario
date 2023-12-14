import axios from "axios";

const inventarioApi = token =>
  axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}concesionarioapp/api/v1/Inventario_Repuesto/`,
    headers: { Authorization: `Bearer ${token}` }
  });

export const getInventariosId = (idRepuesto, token) =>
inventarioApi(token).get(`getInventariosRepuesto/`, { params: { idRepuesto } });
