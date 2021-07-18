import React, { useState, useEffect } from 'react'
import { DashboardWrapper } from './Dashboard.styled';
import { Link } from 'react-router-dom';

import Cocktails from '../../components/Cocktails';

const DashboardPage = () => {

    return (
        <DashboardWrapper>
            <h1>Your Cocktails</h1>
            <button>
                <Link to="/api/cocktails/create-cocktail">Create Cocktail</Link>
            </button>
            <Cocktails />
        </DashboardWrapper>
    )
}

export default DashboardPage
