import React from 'react';

import CreateCocktailForm from '../../components/CreateCocktailForm';
import { withAuth } from '../../context/AuthContext';

const CreateCocktailPage = () => {

    return (
        <div>
            <CreateCocktailForm />
        </div>
    )
};

export default withAuth(CreateCocktailPage);