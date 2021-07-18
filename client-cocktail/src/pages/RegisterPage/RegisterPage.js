import React, { useState } from 'react';

const RegisterPage = () => {

    const [values, setValues] = useState({ name: '', email: '', password: '' });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    };

    const handleRegisterForm = (event) => {
        event.preventDefault();
        const { name, email, password } = values;
        try {
            fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
                method: "POST",
                withCredentials: true, credentials: 'include',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name, email, password
                })
            })
        } catch (err) { if (err.request) { console.log('REQUEST', err.request) } if (err.response) { console.log('RESPONSE', err.response) } }
    }

    return (
        <form onSubmit={handleRegisterForm}>
            <input type="text" value={values.name} name="name" placeholder="Enter your name" onChange={handleChange} />
            <input type="text" value={values.email} name="email" placeholder="Enter your email" onChange={handleChange} />
            <input type="password" value={values.password} name="password" placeholder="Enter your password" onChange={handleChange} />
            <button>Login</button>
        </form>
    )
}

export default RegisterPage;
