import axios from 'axios'

const vehiculoApi = axios.create({
    baseURL: 'http://localhost:8000/concesionarioapp/api/v1/Vehiculo/'
})

export const getAllVehiculos = () => vehiculoApi.get('/')

export const getVehiculo = (vin) => vehiculoApi.get(`/${vin}/`);

export const createVehiculo = (vehiculo) => vehiculoApi.post('/', vehiculo);
