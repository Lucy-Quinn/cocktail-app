import React, { useState, useEffect } from 'react';
import axios from 'axios';

import SearchNameForm from './SearchNameForm';
import SearchNameFormResults from './SearchNameFormResults';

const CocktailsByName = () => {
  const [cocktailData, setCocktailData] = useState([]);
  const [nameValue, setNameValue] = useState('');
  const [loadedCocktails, setLoadedCocktails] = useState([]);
  const [cocktailName, setCocktailName] = useState('');

  useEffect(() => {
    handleCocktailByName();
  }, [nameValue]);

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
      <SearchNameFormResults
        loadedCocktails={loadedCocktails}
        cocktailData={cocktailData}
        nameValue={nameValue}
        cocktailName={cocktailName}
        setLoadedCocktails={setLoadedCocktails}
      />
    </>
  );
};

export default CocktailsByName;
