import axios from 'axios'

const colorsApi = (token) => axios.create({
    baseURL: 'http://localhost:8000/concesionarioapp/api/v1/Color/',
    headers: { Authorization: `Bearer ${token}` }
});

export const getAllColors = (token) => colorsApi(token).get('');