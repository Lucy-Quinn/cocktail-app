import React from 'react';

import CreateCocktailForm from '../../components/CreateCocktailForm';
import { withAuth } from '../../context/AuthContext';

const CreateCocktailPage = () => {

    return (
        <>
            <h1>Create a cocktail</h1>
            <CreateCocktailForm />
        </>
    )
};

export default withAuth(CreateCocktailPage);