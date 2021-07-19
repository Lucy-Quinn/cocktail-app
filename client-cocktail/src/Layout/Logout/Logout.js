import React from 'react';
import { NavLink as Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

const Logout = () => {

    const history = useHistory()

    const handleLogout = () => {
        try {
            fetch(`${process.env.REACT_APP_API_URL}/auth/logout`, {
                method: "GET",
                withCredentials: true,
                credentials: 'include',
                headers: { "Content-Type": "application/json", "Accept": "application/json", 'Access-Control-Allow-Origin': '*' }
            })
                .then(() => {
                    history.push('/')
                })
        } catch (err) { if (err.request) { console.log('REQUEST', err.request) } if (err.response) { console.log('RESPONSE', err.response) } }
    };
    return (
        <React.Fragment>
            <li><Link to="/logout" onClick={handleLogout}>Logout</Link></li>
        </React.Fragment>
    )
}

export default Logout
