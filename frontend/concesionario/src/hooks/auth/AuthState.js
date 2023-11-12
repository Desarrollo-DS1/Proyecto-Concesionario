import propTypes from "prop-types";
import {useTranslation} from "react-i18next";
import React, {createRef, useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import AuthContext from './AuthContext';
import {login, refresh} from "../../api/Auth.api";
import { getEmpleadoByToken } from "../../api/Empleado.api";

AuthState.propTypes = {
    children: propTypes.node,
}

export function AuthState(props) {

    const captchaRef = createRef(null);

    const [captcha, setCaptcha] = useState(null);

    const emptyData = {
        cedula: '',
        password: '',
    }

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(emptyData);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [auth, setAuth] = useState(null)

    const { t } = useTranslation("lang");

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const loginUser = async ( e )=> {
        e.preventDefault()
        const response = await login(formData)

        if(response.status === 200){
            setAuthTokens(response.data)
            setUser(jwtDecode(response.data.access))
            localStorage.setItem('authTokens', JSON.stringify(response.data))

            const responseEmpleado = await getEmpleadoByToken(JSON.parse(localStorage.getItem('authTokens')).access)
            setAuth(responseEmpleado.data)

            history('/dashboard', { replace: true })
        }else{
            alert('Something went wrong!')
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        if(captchaRef.current.getValue())
        {
            await loginUser(e)
        }
        else
        {
            setErrorMessage(t('login.captcha'))
            setSnackbarOpen(true);
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };


    const [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    const [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null)
    const [loading, setLoading] = useState(true)

    const history = useNavigate()

    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        setAuth(null)
        localStorage.removeItem('authTokens')
        history('/login')
    }


    const updateToken = async ()=> {

        
        const refreshTokens = JSON.parse(localStorage.getItem('authTokens')).refresh 
        const response = await refresh({refresh: refreshTokens})

        if (response.status === 200){
            setAuthTokens(response.data)
            setUser(jwtDecode(response.data.access))
            localStorage.setItem('authTokens', JSON.stringify(response.data))
        }else{
            logoutUser()
        }

        if(loading){
            setLoading(false)
        }
    }

    const contextData = {
        user,
        authTokens,
        loginUser,
        logoutUser
    }


    useEffect(()=> {

        if(loading){
            updateToken()
        }

        const fourMinutes = 1000 * 60 * 4

        const interval =  setInterval(()=> {
            if(authTokens){
                updateToken()
            }
        }, fourMinutes)
        return ()=> clearInterval(interval)

    }, [authTokens, loading])


    return (
        <AuthContext.Provider value={
            {
                captcha,
                formData,
                showPassword,
                snackbarOpen,
                errorMessage,
                captchaRef,
                handleInputChange,
                handleLogin,
                handleCloseSnackbar,
                setShowPassword,
                setCaptcha,
                setFormData,
                setSnackbarOpen,
                setErrorMessage,
                ...contextData
            }}>
            {props.children}
        </AuthContext.Provider>
    )
}







