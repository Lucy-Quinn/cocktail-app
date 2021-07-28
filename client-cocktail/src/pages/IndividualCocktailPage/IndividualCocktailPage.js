import React from 'react';

import IndividualCocktail from '../../components/IndividualCocktail';
import { withAuth } from '../../context/AuthContext';

const IndividualCocktailPage = () => {

    return (
        <>
            <IndividualCocktail />
        </>
    );
};

export default withAuth(IndividualCocktailPage);
