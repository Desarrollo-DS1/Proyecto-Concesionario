import axios from 'axios'

const colorsApi = axios.create({
    baseURL: 'http://localhost:8000/concesionarioapp/api/v1/Color/',
    headers: localStorage.getItem('authTokens') ? { Authorization: `Bearer ${JSON.parse(localStorage.getItem('authTokens')).access}` } : null
})

export const getAllColors = () => colorsApi.get('/')