import axios from "axios";

const empleadoApi = (token) => axios.create({
    baseURL: "http://localhost:8000/concesionarioapp/api/v1/Empleado/",
    headers: { Authorization: `Bearer ${token}` }
});

export const getAllEmpleados = (token) => empleadoApi(token).get("");

export const getEmpleado = (id, token) => empleadoApi(token).get(`${id}/`);

export const createEmpleado = (empleado, token) => empleadoApi(token).post("", empleado);

export const updateEmpleado = (id, empleado, token) => empleadoApi(token).put(`${id}/`, empleado);

export const deleteEmpleado = (id, token) => empleadoApi(token).delete(`${id}/`);