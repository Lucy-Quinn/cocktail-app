import React, { useState } from 'react';

import PopularCocktails from '../../components/PopularCocktails';
import CocktailsByName from '../../components/CocktailsByName';
import { COCKTAIL_SELECT_OPTIONS } from './constants';
import CocktailSelectOptions from '../../components/CocktailSelectOptions';

const CocktailInspirationPage = () => {
  const [optionTitle, setOptionTitle] = useState(
    COCKTAIL_SELECT_OPTIONS[1].title,
  );
  return (
    <>
      <CocktailSelectOptions
        setOptionTitle={setOptionTitle}
        COCKTAIL_SELECT_OPTIONS={COCKTAIL_SELECT_OPTIONS}
      />
      {optionTitle === 'Cocktails By Name' && <CocktailsByName />}
      {optionTitle === 'Popular Cocktails' && <PopularCocktails />}
    </>
  );
};

export default CocktailInspirationPage;
