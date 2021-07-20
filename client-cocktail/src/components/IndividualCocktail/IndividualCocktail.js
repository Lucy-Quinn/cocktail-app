import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";

import DeleteCocktail from '../../components/DeleteCocktail';
import EditCocktail from '../../components/EditCocktail';
import { withAuth } from '../../context/AuthContext';

const IndividualCocktail = () => {

    const [cocktail, setCocktail] = useState('');
    const { cocktailId } = useParams();

    const getCocktailData = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/cocktails/${cocktailId}`, { withCredentials: true });
        setCocktail(res.data)
    };

    useEffect(() => {
        getCocktailData();
        return () => {
            setCocktail();
        }
    }, []);

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
};

export default withAuth(IndividualCocktail);
