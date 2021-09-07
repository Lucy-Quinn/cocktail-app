import React from 'react';
import { map } from 'lodash';

import { CocktailsByNameWrapper } from './SearchNameFormResults.styled';
import Cocktail from '../../Cocktail';

const SearchNameFormResults = ({
  loadedCocktails,
  cocktailData,
  nameValue,
  cocktailName,
  setLoadedCocktails,
}) => {
  const onCocktailLoad = (cocktail) => {
    setLoadedCocktails((prevState) => [...prevState, cocktail]);
  };
  return (
    <CocktailsByNameWrapper
      loadedCocktails={loadedCocktails}
      cocktailData={cocktailData}
    >
      {!cocktailData && cocktailName.length === nameValue.length ? (
        <p>
          There are no cocktails by the name {cocktailName}. Please search
          again!
        </p>
      ) : (
        map(cocktailData, (cocktail) => {
          return (
            <Cocktail
              key={cocktail.idDrink}
              cocktail={cocktail}
              onCocktailLoad={onCocktailLoad}
            />
          );
        })
      )}
      ;
    </CocktailsByNameWrapper>
  );
};

export default SearchNameFormResults;
