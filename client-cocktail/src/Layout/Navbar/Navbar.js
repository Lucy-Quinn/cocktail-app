import React from 'react';
import { NavbarWrapper } from './Navbar.styled';
import { Link } from 'react-router-dom';

import NavbarLinks from './NavbarLinks';
import { withAuth } from '../../context/AuthContext';

const Navbar = ({ user, isLoggedIn, logout }) => {
    return (
        <NavbarWrapper>
            {isLoggedIn ?
                <>
                    <h1><Link to="/cocktails/cocktail-inspiration">Cocktail Mania</Link></h1>
                    <h2>Welcome {user && user.name}</h2>
                </>
                :
                <>
                    <h1><Link to="/">Cocktail Mania</Link></h1>
                </>
            }
            <NavbarLinks user={user} isLoggedIn={isLoggedIn} logout={logout} />
        </NavbarWrapper>
    );
};

export default withAuth(Navbar);
