import React from 'react';
import { NavbarWrapper } from './Navbar.styled';
import { NavLink as Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <NavbarWrapper>
            <h1><a href="/">Home</a></h1>
            <ul>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Signup</Link></li>
                <li><Link to="/logout">Logout</Link></li>
            </ul>
        </NavbarWrapper>
    )
}

export default Navbar
