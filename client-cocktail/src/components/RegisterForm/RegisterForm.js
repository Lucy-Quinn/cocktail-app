import React, { useState } from 'react';
import { withAuth } from '../../context/AuthContext';

const RegisterForm = ({ register, errors }) => {

    const [values, setValues] = useState({ name: '', email: '', password: '' });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    };

    const handleRegisterForm = (event) => {
        event.preventDefault();
        const { name, email, password } = values;
        register(name, email, password);
    };

    return (
        <form onSubmit={handleRegisterForm}>
            <input type="text" value={values.name} name="name" placeholder="Enter your name" onChange={handleChange} />
            <input type="email" value={values.email} name="email" placeholder="Enter your email" onChange={handleChange} required />
            <input type="password" value={values.password} name="password" placeholder="Enter your password" onChange={handleChange} />
            <button>Register</button>
        </form>
    )
};

export default withAuth(RegisterForm);
