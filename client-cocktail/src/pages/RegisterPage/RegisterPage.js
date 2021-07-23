import React from 'react';

import { withAuth } from '../../context/AuthContext';
import RegisterForm from '../../components/RegisterForm';

const RegisterPage = () => {

    return (
        <>
            <h1>register</h1>
            <RegisterForm />
        </>
    )
};

export default withAuth(RegisterPage);
