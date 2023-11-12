import axios from "axios";

const empleadoApi = axios.create({
    baseURL: "http://localhost:8000/concesionarioapp/api/v1/Empleado/"
});

export const getAllEmpleados = () => empleadoApi.get("/");

export const getEmpleado = (id) => empleadoApi.get(`/${id}/`);

export const createEmpleado = (empleado) => empleadoApi.post("/", empleado);

export const updateEmpleado = (id, empleado) => empleadoApi.put(`/${id}/`, empleado);

export const deleteEmpleado = (id) => empleadoApi.delete(`/${id}/`);

export const getEmpleadoByToken = (token) => axios.get("http://localhost:8000/concesionarioapp/api/v1/auth/users/me/", {
    headers: { Authorization: `JWT ${token}` }
});
