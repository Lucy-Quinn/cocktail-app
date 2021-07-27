import React, { useState } from 'react';

export const LoginForm = ({ login }) => {

    const [values, setValues] = useState({ email: '', password: '', });

    const handleChange = (event) => {
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
            <input type="text" value={values.email} name="email" placeholder="Enter your email" onChange={handleChange} />
            <input type="password" value={values.password} name="password" placeholder="Enter your password" onChange={handleChange} />
            <button>Login</button>
        </form>
    );
};

export default LoginForm;