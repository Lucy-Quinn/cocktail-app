import React from 'react';

import CreateCocktailForm from '../../components/CreateCocktailForm';
import { withAuth } from '../../context/AuthContext';

const CreateCocktailPage = ({ getAuthRoute }) => {
  return (
    <>
      <h1>Create a cocktail</h1>
      <CreateCocktailForm getAuthRoute={getAuthRoute} />
    </>
  );
};

export default withAuth(CreateCocktailPage);
