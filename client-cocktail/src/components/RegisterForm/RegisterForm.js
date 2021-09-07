import React, { useState } from 'react';
import ErrorMessages from '../ErrorMessages';

const RegisterForm = ({ register, errors }) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    dateOfBirth: '',
    password: '',
  });
  const [error, setError] = useState({});

  const handleChange = (event) => {
    setError({});
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleRegisterForm = (event) => {
    event.preventDefault();
    const { name, email, dateOfBirth, password } = values;
    register(name, email, dateOfBirth, password);
  };

  return (
    <>
      <form onSubmit={handleRegisterForm}>
        <input
          type="text"
          value={values.name}
          name="name"
          placeholder="Enter your name"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          value={values.email}
          name="email"
          placeholder="Enter your email"
          onChange={handleChange}
          required
        />
        <input
          type="date"
          value={values.dateOfBirth}
          name="dateOfBirth"
          placeholder="Enter your date of birth"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          value={values.password}
          name="password"
          placeholder="Enter your password"
          onChange={handleChange}
          required
        />
        <button>Register</button>
      </form>
      <ErrorMessages error={error} errors={errors} setError={setError} />
    </>
  );
};

export default RegisterForm;
