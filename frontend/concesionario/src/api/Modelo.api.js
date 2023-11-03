import axios from 'axios'


const modeloApi = axios.create({
    baseURL: 'http://localhost:8000/concesionarioapp/api/v1/Modelo/'
})

export const getAllModelos = () => modeloApi.get('/')
