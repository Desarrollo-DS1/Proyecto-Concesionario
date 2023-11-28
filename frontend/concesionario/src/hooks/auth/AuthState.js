import propTypes from "prop-types";
import React, {createRef, useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import AuthContext from './AuthContext';
import {login, refresh} from "../../api/Auth.api";
import {verifyCaptcha} from "../../api/Captcha.api";

AuthState.propTypes = {
    children: propTypes.node,
}

export function AuthState(props) {

    const captchaRef = createRef(null);

    const history = useNavigate()

    const emptyData = {
        cedula: '',
        password: '',
    }

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(emptyData);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    const [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null)
    const [loading, setLoading] = useState(true)

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const loginUser = async ( e )=> {
        e.preventDefault()

        try{
            const response = await login(formData)

            const user = jwtDecode(response.data.access)
            setAuthTokens(response.data)
            setUser(user)
            localStorage.setItem('authTokens', JSON.stringify(response.data))
            setFormData(emptyData)
            if (user.tipoUsuario === 'Cliente')
            {
                history('/cliente', { replace: true })
            }
            else
            {
                history('/dashboard', { replace: true })
            }
        } catch(error){
            setErrorMessage('login.error')
            setSnackbarOpen(true);
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        const captcha = captchaRef.current.getValue()

        if (captcha){
            try{
                const response = await verifyCaptcha(captcha)
                await loginUser(e)

            } catch(error){
                if (error.response.data.fail === 'timeout-or-duplicate') {
                    setErrorMessage('login.captchaDuplicado')

                } else  {
                    console.log(error.response.data.fail)
                    setErrorMessage('login.captchaError')
                }

                setSnackbarOpen(true);
                captchaRef.current.reset();
            }

        } else {
            setErrorMessage('login.captcha')
            setSnackbarOpen(true);
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        history('/login')
    }


    const updateToken = async ()=> {
        try{
            const response = await refresh(authTokens.refresh)
            setAuthTokens(response.data)
            setUser(jwtDecode(response.data.access))
            localStorage.setItem('authTokens', JSON.stringify(response.data))

        }catch(error){
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
                formData,
                showPassword,
                snackbarOpen,
                errorMessage,
                captchaRef,
                handleInputChange,
                handleLogin,
                handleCloseSnackbar,
                setShowPassword,
                setFormData,
                setSnackbarOpen,
                setErrorMessage,
                ...contextData
            }}>
            {loading ? null : props.children}
        </AuthContext.Provider>
    )
}