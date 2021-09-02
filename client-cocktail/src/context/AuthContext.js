import React, { createContext, useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

const { Consumer, Provider } = createContext();

const AuthContextProvider = (props) => {

    const [authValues, setAuthValues] = useState({ isLoggedIn: false, isLoading: true, user: {}, errors: {} });
    const history = useHistory();
    const { isLoggedIn } = authValues;

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
                            setAuthValues({
                                ...authValues,
                                isLoggedIn: true,
                                isLoading: false,
                                user
                            })
                        })
                })
                .catch(() => {
                    setAuthValues({
                        ...authValues,
                        isLoggedIn: false,
                        isLoading: false,
                        user: {}
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

    const register = (name, email, dateOfBirth, password) => {
        try {
            fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
                method: "POST",
                withCredentials: true,
                credentials: 'include',
                headers: { "Content-Type": "application/json", "Accept": "application/json" },
                body: JSON.stringify({
                    name,
                    email,
                    dateOfBirth,
                    password
                })
            })
                .then((response) => {
                    return response.json()
                        .then((data) => {
                            if (data.success === false) {
                                setAuthValues({
                                    ...authValues,
                                    isLoggedIn: false,
                                    errors: data.data
                                })
                            } else {
                                setAuthValues({
                                    ...authValues,
                                    isLoggedIn: true,
                                    user: data
                                });
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
                    email,
                    password
                })
            })
                .then((response) => {
                    return response.json()
                        .then((data) => {
                            if (data.success === false) {
                                setAuthValues({
                                    ...authValues,
                                    isLoggedIn: false,
                                    errors: data.data
                                })
                            } else {
                                setAuthValues({
                                    ...authValues,
                                    isLoggedIn: true,
                                    user: data
                                });
                                history.push('/cocktails/cocktail-inspiration');
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

    const logout = () => {
        try {
            fetch(`${process.env.REACT_APP_API_URL}/auth/logout`, {
                method: "GET",
                withCredentials: true,
                credentials: 'include',
                headers: { "Content-Type": "application/json", "Accept": "application/json", 'Access-Control-Allow-Origin': '*' }
            })
                .then(() => {
                    setAuthValues({
                        ...authValues,
                        isLoggedIn: false,
                        user: {}
                    });
                    history.push('/');
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

    useEffect(() => {
        getAuthRoute();
    }, [isLoggedIn]);

    return (
        <>
            <Provider value={{
                authValues,
                logout,
                login,
                register,
                getAuthRoute,
                setAuthValues
            }}>
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
                    const {
                        isLoggedIn,
                        user,
                        isLoading,
                        errors
                    } = value.authValues;
                    const {
                        login,
                        logout,
                        register,
                        getAuthRoute,
                        setAuthValues
                    } = value;
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
                        setAuthValues={setAuthValues}
                    />)
                }}
            </Consumer>
        )
    }
};

export { AuthContextProvider, withAuth };