import React, { useState } from 'react';

import EditCocktailForm from '../EditCocktailForm';

const EditCocktail = ({ cocktail, getCocktailData }) => {

    const [isEdit, setIsEdit] = useState(false);

    const handleEditCocktailButton = () => {
        setIsEdit(!isEdit);
    };

    return (
        <div>
            {isEdit ?
                <EditCocktailForm cocktail={cocktail} setIsEdit={setIsEdit} getCocktailData={getCocktailData} />
                :
                <div>
                    <h1>{cocktail.name}</h1>
                    <p>{cocktail.ingredients.map(ingredient => ingredient + ' ')}</p>
                    <button onClick={handleEditCocktailButton}>Edit Cocktail</button>
                </div>
            }
        </div>
    )
};

export default EditCocktail;
