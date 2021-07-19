import React from 'react';
import { NavLink as Link } from 'react-router-dom';

const NavbarLinks = () => {
    return (
        <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/logout">Logout</Link></li>
        </ul>
    )
}

export default NavbarLinks
