import React from 'react'
import { Route, Redirect } from 'react-router-dom';

import { withAuth } from '../context/AuthContext';

const AnonRoute = ({ component: ComponentToShow, isLoggedIn, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => isLoggedIn ? <Redirect to="/cocktails" />
                :
                <ComponentToShow {...props} />}
        />
    )
};

export default withAuth(AnonRoute);
