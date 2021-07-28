import React from 'react';
import { withAuth } from '../../context/AuthContext';

const HomePage = () => {

    return (
        <>
            <h1>Homepage</h1>
        </>
    );
};

export default withAuth(HomePage);
