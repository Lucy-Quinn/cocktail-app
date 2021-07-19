import React from 'react';
import { NavLink as Link } from 'react-router-dom';

import Logout from '../../Logout/Logout';

const NavbarLinks = () => {

    return (
        <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            <Logout />
        </ul>
    )
}

export default NavbarLinks
