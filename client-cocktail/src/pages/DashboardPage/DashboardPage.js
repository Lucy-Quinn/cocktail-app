import React from 'react'
import { DashboardWrapper } from './Dashboard.styled';
import { Link } from 'react-router-dom';

import MyCocktails from '../../components/MyCocktails';
import { withAuth } from '../../context/AuthContext';

const DashboardPage = ({ user }) => {

    return (
        <DashboardWrapper>
            <h1>Your Cocktails</h1>
            <button>
                <Link to="/cocktails/create-cocktail">Create Cocktail</Link>
            </button>
            <MyCocktails user={user} />
        </DashboardWrapper>
    );
};

export default withAuth(DashboardPage);
