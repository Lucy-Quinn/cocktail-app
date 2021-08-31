import React, { useState, useEffect } from "react";
import { map, isEmpty } from "lodash";

const RegisterForm = ({ register, errors }) => {
  const [values, setValues] = useState({ name: "", email: "", password: "" });
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

  const handleRegisterForm = (event) => {
    event.preventDefault();
    const { name, email, password } = values;
    register(name, email, password);
  };

  console.log(error);

  return (
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
        type="password"
        value={values.password}
        name="password"
        placeholder="Enter your password"
        onChange={handleChange}
        required
      />
      <button>Register</button>
      <p>
        {!isEmpty(error) &&
          map(Object.entries(error), ([value, keys]) => {
            return keys[0];
          })}
      </p>
    </form>
  );
};

export default RegisterForm;
