import axios from 'axios'

const extraApi = (token) => axios.create({
    baseURL: 'http://localhost:8000/concesionarioapp/api/v1/Extra/',
    headers: { Authorization: `Bearer ${token}` }
})

export const getAllExtras = (token) => extraApi(token).get('');
