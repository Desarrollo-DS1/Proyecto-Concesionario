import axios from 'axios';


const ventaApi = axios.create({
    baseURL: 'http://localhost:8000/concesionarioapp/api/v1/Venta/'
})

export const getAllVentas = () => ventaApi.get('/')

export const getVenta = (id) => ventaApi.get(`/${id}/`)

export const createVenta = (venta) => ventaApi.post('/', venta)

export const updateVenta = (id, venta) => ventaApi.put(`/${id}/`, venta)
