import axios from 'axios'

const extraApi = (token) => axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}concesionarioapp/api/v1/Extra/`,
    headers: { Authorization: `Bearer ${token}` }
})

export const getAllExtras = (token) => extraApi(token).get('');
