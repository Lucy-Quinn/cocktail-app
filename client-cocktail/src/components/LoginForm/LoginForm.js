import React, { useState, useEffect } from "react";
import { map, isEmpty } from "lodash";

export const LoginForm = ({ login, errors }) => {
  const [values, setValues] = useState({ email: "", password: "" });
  const [error, setError] = useState({});

  useEffect(() => {
    setError(errors);
  }, [errors]);

  useEffect(() => {
    setError({});
  }, []);

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
      <p>
        {!isEmpty(error) &&
          map(Object.entries(error), ([value, keys]) => {
            return keys[0];
          })}
      </p>
    </form>
  );
};

export default LoginForm;
