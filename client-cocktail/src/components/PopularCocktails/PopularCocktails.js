import React, { useState, useEffect } from "react";
import axios from "axios";
import { map } from "lodash";

import {
  PopularDrinksWrapper,
  CocktailWrapper,
  CocktailImage,
} from "./PopularCocktails.styled";

const PopularCocktails = () => {
  const [cocktailData, setCocktailData] = useState([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    getPopularCocktails();
  }, []);

  const getPopularCocktails = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/cocktails/popular-cocktails`,
      { withCredentials: true }
    );
    setCocktailData(res.data);
    setIsReady(true);
  };

  return (
    <>
      <h2>Popular Cocktails</h2>
      <PopularDrinksWrapper>
        {isReady ? (
          map(cocktailData, (cocktail) => {
            return (
            cocktail !== null &&
              <CocktailWrapper key={cocktail.idDrink}>
                <CocktailImage src={cocktail.strDrinkThumb} alt="cocktail" />
                <p>{cocktail.strDrink}</p>
              </CocktailWrapper>
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
