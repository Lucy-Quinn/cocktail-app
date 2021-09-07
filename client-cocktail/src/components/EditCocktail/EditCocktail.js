import React, { useState } from 'react';
import { map } from 'lodash';

import EditCocktailForm from '../EditCocktailForm';

const EditCocktail = ({ cocktail, getCocktailData }) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleEditCocktailButton = () => {
    setIsEdit(!isEdit);
  };

  return (
    <div>
      {isEdit ? (
        <EditCocktailForm
          cocktail={cocktail}
          setIsEdit={setIsEdit}
          getCocktailData={getCocktailData}
        />
      ) : (
        <div>
          <h1>{cocktail.name}</h1>
          <p>{map(cocktail.ingredients, (ingredient) => ingredient + ' ')}</p>
          <button onClick={handleEditCocktailButton}>Edit Cocktail</button>
        </div>
      )}
    </div>
  );
};

export default EditCocktail;
