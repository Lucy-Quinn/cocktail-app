import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { withAuth } from '../context/AuthContext';

const PrivateRoute = ({ component: Component, isLoggedIn, isLoading, ...rest }) => {
    if (isLoading) return 'Loading';
    return (
        <Route
            {...rest}
            render={(props) => isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />}
        />
    );
};

export default withAuth(PrivateRoute);