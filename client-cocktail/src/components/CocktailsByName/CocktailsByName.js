import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { map } from 'lodash';

import SearchNameForm from './SearchNameForm';

import { CocktailsByNameWrapper } from './CocktailsByName.styled';
import Cocktail from '../Cocktail/Cocktail';

const CocktailsByName = () => {
  const [cocktailData, setCocktailData] = useState([]);
  const [nameValue, setNameValue] = useState('');
  const [loadedCocktails, setLoadedCocktails] = useState([]);
  const [cocktailName, setCocktailName] = useState('');

  useEffect(() => {
    handleCocktailByName();
  }, [nameValue]);

  const onCocktailLoad = (cocktail) => {
    setLoadedCocktails((prevState) => [...prevState, cocktail]);
  };

  const handleCocktailByName = async () => {
    setCocktailData([]);
    setLoadedCocktails([]);
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/cocktails/cocktails-by-name`,
      { nameValue },
      { withCredentials: true },
    );
    setCocktailData(response.data);
    setCocktailName(nameValue);
  };

  return (
    <>
      <SearchNameForm nameValue={nameValue} setNameValue={setNameValue} />
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
    </>
  );
};

export default CocktailsByName;
