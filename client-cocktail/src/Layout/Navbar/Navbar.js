import React from 'react';
import { NavbarWrapper } from './Navbar.styled';
import NavbarLinks from './NavbarLinks';

const Navbar = () => {
    return (
        <NavbarWrapper>
            <h1><a href="/cocktails">Home</a></h1>
            <NavbarLinks />
        </NavbarWrapper>
    )
}

export default Navbar
