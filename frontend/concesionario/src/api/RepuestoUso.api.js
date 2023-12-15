import axios from "axios";

const repuestoUsoApi = token =>
  axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}concesionarioapp/api/v1/Uso_Repuesto/`,
    headers: { Authorization: `Bearer ${token}` }
  });

ex
