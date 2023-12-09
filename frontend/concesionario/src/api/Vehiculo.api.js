import axios from 'axios'

const vehiculoApi = (token) => axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}concesionarioapp/api/v1/Vehiculo/`,
    headers: { Authorization: `Bearer ${token}` }
})

export const getAllVehiculos = (token) => vehiculoApi(token).get('');

export const getAllAvailableVehiculos = (token) => vehiculoApi(token).get('disponibles/');

export const getVehiculo = (vin, token) => vehiculoApi(token).get(`${vin}/`);

export const createVehiculo = (vehiculo, token) => vehiculoApi(token).post('', vehiculo);

export const updateVehiculo = (vin, vehiculo, token) => vehiculoApi(token).put(`${vin}/`, vehiculo);

export const deleteVehiculo = (vin, token) => vehiculoApi(token).delete(`${vin}/`);