import axios from 'axios';


const ventaApi = axios.create({
    baseURL: 'http://localhost:8000/concesionarioapp/api/v1/Venta/',
    headers: localStorage.getItem('authTokens') ? { Authorization: `Bearer ${JSON.parse(localStorage.getItem('authTokens')).access}` } : null
})

export const getAllVentas = () => ventaApi.get('/')

export const getVenta = (id) => ventaApi.get(`/${id}/`)

export const createVenta = (venta) => ventaApi.post('/', venta)

export const updateVenta = (id, venta) => ventaApi.put(`/${id}/`, venta)
