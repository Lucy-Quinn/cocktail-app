import React from 'react';

import { withAuth } from '../../context/AuthContext';
import RegisterForm from '../../components/RegisterForm';

const RegisterPage = ({ register, errors }) => {
  return (
    <>
      <h1>register</h1>
      <RegisterForm register={register} errors={errors} />
    </>
  );
};

export default withAuth(RegisterPage);
