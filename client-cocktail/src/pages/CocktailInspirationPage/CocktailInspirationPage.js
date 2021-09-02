import React, { useState, useEffect } from "react";

import PopularCocktails from "../../components/PopularCocktails";
import CocktailsByName from '../../components/CocktailsByName';

const CocktailInspirationPage = () => {
  
  return (
    <>
    <CocktailsByName/>
    <PopularCocktails/>
    </>
  );
};

export default CocktailInspirationPage;
