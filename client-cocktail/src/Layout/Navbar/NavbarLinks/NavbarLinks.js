import React from 'react';
import { NavLink as Link } from 'react-router-dom';

import Logout from './Logout/Logout';

const NavbarLinks = ({ isLoggedIn, user, logout }) => {

    const { _id: profileId } = user || {};

    return (
        <ul>
            {isLoggedIn ?
                <>
                    <li><Link to="/cocktails">Your cocktails</Link></li>
                    <li><Link to="/cocktails/create-cocktail">Create a cocktail</Link></li>
                    <li><Link to={`/profile/${profileId && profileId}`}>Your profile</Link></li>

                    <Logout logout={logout} />
                </>
                :
                <>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                </>
            }
        </ul>
    )
}

export default NavbarLinks;
