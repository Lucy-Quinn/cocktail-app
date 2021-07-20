import React from 'react';
import { withAuth } from '../../context/AuthContext';

const HomePage = () => {
    return (
        <div>
            <h1>Homepage</h1>
        </div>
    )
};

export default withAuth(HomePage);
