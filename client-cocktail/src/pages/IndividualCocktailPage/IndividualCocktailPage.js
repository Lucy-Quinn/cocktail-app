import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";

import DeleteCocktail from '../../components/DeleteCocktail';
import EditCocktail from '../../components/EditCocktail';

const IndividualCocktailPage = () => {

    const [cocktail, setCocktail] = useState('');
    const { cocktailId } = useParams();

    const getCocktailData = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/cocktails/${cocktailId}`)
        setCocktail(res.data)
    };

    useEffect(() => {
        getCocktailData();
    });

    return (
        <div>
            {cocktail ?
                <div>
                    <EditCocktail cocktail={cocktail} />
                    <DeleteCocktail cocktail={cocktail} />
                </div>
                :
                'Loading cocktail'
            }
        </div>
    )
}

export default IndividualCocktailPage
