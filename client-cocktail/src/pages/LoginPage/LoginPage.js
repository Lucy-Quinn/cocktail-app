import React from 'react';

import LoginForm from '../../components/LoginForm';
import { withAuth } from '../../context/AuthContext';

const LoginPage = () => {

    return (
        <div>
            <h1>Login</h1>
            <LoginForm />
        </div>
    )
}

export default withAuth(LoginPage);
