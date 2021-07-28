import React from 'react'
import { DashboardWrapper } from './Dashboard.styled';
import { Link } from 'react-router-dom';

import Cocktails from '../../components/Cocktails';
import { withAuth } from '../../context/AuthContext';

const DashboardPage = ({ user }) => {

    return (
        <DashboardWrapper>
            <h1>Your Cocktails</h1>
            <button>
                <Link to="/cocktails/create-cocktail">Create Cocktail</Link>
            </button>
            <Cocktails user={user} />
        </DashboardWrapper>
    );
};

export default withAuth(DashboardPage);
