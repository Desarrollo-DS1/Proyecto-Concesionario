import axios from "axios";

const servicioApi = token =>
  axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}concesionarioapp/api/v1/Servicio/`,
    headers: { Authorization: `Bearer ${token}` }
  });

export const getAllServicios = (token) => servicioApi(token).get('');