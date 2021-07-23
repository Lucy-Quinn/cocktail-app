import React from 'react';

import LoginForm from '../../components/LoginForm';
import { withAuth } from '../../context/AuthContext';

const LoginPage = () => {

    return (
        <>
            <h1>Login</h1>
            <LoginForm />
        </>
    )
};

export default withAuth(LoginPage);
