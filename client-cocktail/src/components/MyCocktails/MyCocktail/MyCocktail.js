import React from 'react';
import { Link } from 'react-router-dom';
import { map } from 'lodash';

import { CocktailImage } from './MyCocktail.styled';

const MyCocktail = ({ cocktail }) => {
  return (
    <div>
      <Link to={`/cocktails/${cocktail._id}`}>
        <h2>{cocktail.name}</h2>
        <p>{map(cocktail.ingredients, (ingredient) => ingredient + ' ')}</p>
        <CocktailImage src={cocktail.image} alt={cocktail.name} />
      </Link>
    </div>
  );
};

export default MyCocktail;
