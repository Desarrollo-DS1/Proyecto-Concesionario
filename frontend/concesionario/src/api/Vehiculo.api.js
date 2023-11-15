import axios from 'axios'

const vehiculoApi = (token) => axios.create({
    baseURL: 'http://localhost:8000/concesionarioapp/api/v1/Vehiculo/',
    headers: { Authorization: `Bearer ${token}` }
})

export const getAllVehiculos = (token) => vehiculoApi(token).get('');

export const getVehiculo = (vin, token) => vehiculoApi(token).get(`${vin}/`);

export const createVehiculo = (vehiculo, token) => vehiculoApi(token).post('', vehiculo);

export const updateVehiculo = (vin, vehiculo, token) => vehiculoApi(token).put(`${vin}/`, vehiculo);

export const deleteVehiculo = (vin, token) => vehiculoApi(token).delete(`${vin}/`);