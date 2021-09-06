import React, { useState, useEffect } from "react";
import axios from "axios";
import { map } from "lodash";

import Cocktail from '../Cocktail';
import {
  PopularDrinksWrapper,
} from "./PopularCocktails.styled";

const PopularCocktails = () => {
  const [cocktailData, setCocktailData] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [loadedCocktails, setLoadedCocktails] = useState([]);

  const onCocktailLoad = (cocktail) => {
    setLoadedCocktails(prevState => 
       [...prevState,cocktail]
    )
  };

  useEffect(() => {
    getPopularCocktails();
  }, []);

  const getPopularCocktails = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/cocktails/popular-cocktails`,
      { withCredentials: true }
    );
    setCocktailData(response.data);
    setIsReady(true);
  };

  return (
    <>
      <h2>Popular Cocktails</h2>
      <PopularDrinksWrapper loadedCocktails={loadedCocktails} cocktailData={cocktailData}>
        {isReady ? (
          map(cocktailData, (cocktail) => {
            return (
            cocktail !== null &&
              <Cocktail  key={cocktail.idDrink} cocktail={cocktail} onCocktailLoad={onCocktailLoad}/>
            );
          })
        ) : (
          <p>Loading cocktails</p>
        )}
      </PopularDrinksWrapper>
    </>
  );
};

export default PopularCocktails;
