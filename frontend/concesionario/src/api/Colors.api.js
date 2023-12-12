import axios from 'axios'

const colorsApi = (token) => axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}concesionarioapp/api/v1/Color/`,
    headers: { Authorization: `Bearer ${token}` }
});

export const getAllColors = (token) => colorsApi(token).get('');