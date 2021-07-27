import React, { createContext, useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

const { Consumer, Provider } = createContext();

const AuthContextProvider = (props) => {

    const [authValues, setAuthValues] = useState({ isLoggedIn: false, isLoading: true, user: {}, errors: {} });
    const { isLoggedIn } = authValues;
    const history = useHistory();

    const getAuthRoute = () => {
        try {
            fetch(`${process.env.REACT_APP_API_URL}/auth/me`, {
                method: "GET",
                withCredentials: true,
                credentials: 'include',
                headers: { "Content-Type": "application/json", "Accept": "application/json", 'Access-Control-Allow-Origin': '*' }
            })
                .then((response) => {
                    return response.json()
                        .then((user) => {
                            setAuthValues({ ...authValues, isLoggedIn: true, isLoading: false, user })
                        })
                })
                .catch((err) => {
                    setAuthValues({ ...authValues, isLoggedIn: false, isLoading: false, user: {} })
                })
        } catch (err) {
            if (err.request) { console.log('REQUEST', err.request) } if (err.response) { console.log('RESPONSE', err.response) }
        }
    };

    const register = (name, email, password) => {
        try {
            fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
                method: "POST",
                withCredentials: true,
                credentials: 'include',
                headers: { "Content-Type": "application/json", "Accept": "application/json" },
                body: JSON.stringify({
                    name, email, password
                })
            })
                .then((response) => {
                    return response.json()
                        .then((data) => {
                            if (!data.success) {
                                setAuthValues({ ...authValues, isLoggedIn: false, errors: data.data.errors })
                            } else {
                                setAuthValues({ ...authValues, isLoggedIn: true, user: data.user });
                                history.push('/');
                            }
                        })
                })
        } catch (error) {
            if (error.request) {
                console.log('REQUEST', error.request)
            }
            if (error.response) {
                console.log('RESPONSE', error.response)
            }
        }
    };

    const login = (email, password) => {
        try {
            fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
                method: "POST",
                withCredentials: true,
                credentials: 'include',
                headers: { "Content-Type": "application/json", "Accept": "application/json", 'Access-Control-Allow-Origin': '*' },
                body: JSON.stringify({
                    email, password
                })
            })
                .then((response) => {
                    return response.json()
                        .then((user) => {
                            setAuthValues({ ...authValues, isLoggedIn: true, user });
                            history.push('/');
                        })
                })
        } catch (err) {
            if (err.request) { console.log('REQUEST', err.request) } if (err.response) { console.log('RESPONSE', err.response) }
        }
    };

    const logout = () => {
        try {
            fetch(`${process.env.REACT_APP_API_URL}/auth/logout`, {
                method: "GET",
                withCredentials: true,
                credentials: 'include',
                headers: { "Content-Type": "application/json", "Accept": "application/json", 'Access-Control-Allow-Origin': '*' }
            })
                .then(() => {
                    setAuthValues({ ...authValues, isLoggedIn: false, user: {} });
                    history.push('/');
                })
        } catch (err) {
            if (err.request) { console.log('REQUEST', err.request) } if (err.response) { console.log('RESPONSE', err.response) }
        }
    };

    useEffect(() => {
        getAuthRoute();
    }, [isLoggedIn]);

    return (
        <>
            <Provider value={{ authValues, logout, login, register, getAuthRoute }}>
                {props.children}
            </Provider>
        </>
    );
};

const withAuth = (WrappedComponent) => {
    return (props) => {
        return (
            <Consumer>
                {(value) => {
                    const { isLoggedIn, user, isLoading, errors } = value.authValues;
                    const { login, logout, register, getAuthRoute } = value;
                    return (<WrappedComponent
                        {...props}
                        isLoggedIn={isLoggedIn}
                        user={user}
                        logout={logout}
                        login={login}
                        register={register}
                        isLoading={isLoading}
                        errors={errors}
                        getAuthRoute={getAuthRoute}
                    />)
                }}
            </Consumer>
        )
    }
};

export { AuthContextProvider, withAuth };