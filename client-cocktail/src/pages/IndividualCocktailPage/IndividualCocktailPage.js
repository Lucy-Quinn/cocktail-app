import React from 'react';

import IndividualCocktail from '../../components/IndividualCocktail';
import { withAuth } from '../../context/AuthContext';

const IndividualCocktailPage = () => {

    return (
        <div>
            <IndividualCocktail />
        </div>
    )
};

export default withAuth(IndividualCocktailPage);
