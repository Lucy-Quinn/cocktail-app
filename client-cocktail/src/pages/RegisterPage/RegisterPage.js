import React from 'react';

import { withAuth } from '../../context/AuthContext';
import RegisterForm from '../../components/RegisterForm';

const RegisterPage = () => {

    return (
        <div>
            <h1>register</h1>
            <RegisterForm />
        </div>
    )
}

export default withAuth(RegisterPage);
