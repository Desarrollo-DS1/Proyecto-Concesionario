import axios from "axios";

const serivicioOrdenApi = token =>
  axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}concesionarioapp/api/v1/Servicio_Orden/`,
    headers: { Authorization: `Bearer ${token}` }
  });


export const getServiciosOrden = (idOrden, token) => serivicioOrdenApi(token).get(`getServiciosOrden/`, { params: { idOrden } });