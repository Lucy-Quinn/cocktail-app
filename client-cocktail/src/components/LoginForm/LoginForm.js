import React, { useState } from "react";
import ErrorMessages from "../ErrorMessages";

export const LoginForm = ({ login, errors }) => {
  const [values, setValues] = useState({ email: "", password: "" });
  const [error, setError] = useState({});

  const handleChange = (event) => {
    setError({});
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleLoginFormSubmit = (event) => {
    event.preventDefault();
    const { email, password } = values;
    login(email, password);
  };

    return (
    <form onSubmit={handleLoginFormSubmit}>
      <input
        type="text"
        value={values.email}
        name="email"
        placeholder="Enter your email"
        onChange={handleChange}
      />
      <input
        type="password"
        value={values.password}
        name="password"
        placeholder="Enter your password"
        onChange={handleChange}
      />
      <button>Login</button>
     <ErrorMessages error={error} errors={errors} setError={setError}/>
    </form>
  );
};

export default LoginForm;
