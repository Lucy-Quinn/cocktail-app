import React, { useState } from 'react';
import { CocktailWrapper, CocktailImage } from './Cocktail.styled';

const Cocktail = ({ cocktail, onCocktailLoad }) => {
  function onLoad() {
    onCocktailLoad({ id: cocktail.idDrink });
  }

  return (
    <CocktailWrapper>
      <CocktailImage
        src={cocktail.strDrinkThumb}
        onLoad={onLoad}
        alt="cocktail"
        className="cocktail-image"
      />
      <p>{cocktail.strDrink}</p>
    </CocktailWrapper>
  );
};

export default Cocktail;
