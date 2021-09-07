import React from 'react';

import LoginForm from '../../components/LoginForm';
import { withAuth } from '../../context/AuthContext';

const LoginPage = ({ login, errors }) => {
  return (
    <>
      <h1>Login</h1>
      <LoginForm login={login} errors={errors} />
    </>
  );
};

export default withAuth(LoginPage);
