import axios from 'axios'

const colorsApi = axios.create({
    baseURL: 'http://localhost:8000/concesionarioapp/api/v1/Color/'
})

export const getAllColors = () => colorsApi.get('/')