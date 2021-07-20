import React from 'react'
import { DashboardWrapper } from './Dashboard.styled';
import { Link } from 'react-router-dom';

import { withAuth } from '../../context/AuthContext';
import Cocktails from '../../components/Cocktails';

const DashboardPage = () => {

    return (
        <DashboardWrapper>
            <h1>Your Cocktails</h1>
            <button>
                <Link to="/cocktails/create-cocktail">Create Cocktail</Link>
            </button>
            <Cocktails />
        </DashboardWrapper>
    )
}

export default withAuth(DashboardPage);
