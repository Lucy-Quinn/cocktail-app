import React from 'react';
import { NavLink as Link } from 'react-router-dom';
import { withAuth } from '../../../../context/AuthContext';

const Logout = ({ logout }) => {

    const handleLogout = () => {
        logout();
    };

    return (
        <React.Fragment>
            <li><Link to="/logout" onClick={handleLogout}>Logout</Link></li>
        </React.Fragment>
    )
}

export default withAuth(Logout);
