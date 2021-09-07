import React, { useRef, createRef } from 'react';
import { map } from 'lodash';

import { OptionsWrapper } from './CocktailSelectOptions.styled';

const CocktailSelectOptions = ({ setOptionTitle, COCKTAIL_SELECT_OPTIONS }) => {
  const refArray = useRef(map(COCKTAIL_SELECT_OPTIONS, () => createRef()));

  const handleSearchOption = (ref) => {
    setOptionTitle(ref.target.className);
  };

  return (
    <OptionsWrapper>
      {map(COCKTAIL_SELECT_OPTIONS, (searchOption, index) => {
        return (
          <h3
            onClick={handleSearchOption}
            key={searchOption.id}
            ref={refArray.current[index]}
            className={searchOption.title}
          >
            {searchOption.title}
          </h3>
        );
      })}
    </OptionsWrapper>
  );
};

export default CocktailSelectOptions;
