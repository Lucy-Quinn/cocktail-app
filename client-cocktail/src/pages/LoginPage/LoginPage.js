import React, { useState } from 'react'

const LoginPage = () => {

    const [values, setValues] = useState({ email: '', password: '' });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    };

    const handleLoginFormSubmit = (event) => {
        event.preventDefault();
        const { email, password } = values;
        try {
            fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
                method: "POST",
                withCredentials: true, credentials: 'include',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email, password
                })
            })
        } catch (err) { if (err.request) { console.log('REQUEST', err.request) } if (err.response) { console.log('RESPONSE', err.response) } }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLoginFormSubmit}>
                <input type="text" value={values.email} name="email" placeholder="Enter your email" onChange={handleChange} />
                <input type="password" value={values.password} name="password" placeholder="Enter your password" onChange={handleChange} />
                <button>Login</button>
            </form>
        </div>
    )
}

export default LoginPage
