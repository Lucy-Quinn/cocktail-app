import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

const Cocktails = () => {

    const [cocktails, setCocktails] = useState('')

    const getCocktailData = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/cocktails`, { withCredentials: true });
        setCocktails(res.data)
    };

    useEffect(() => {
        getCocktailData();
    }, []);

    return (
        <div>
            {!cocktails ?
                'loading cocktails'
                :
                cocktails.map(cocktail => {
                    return (
                        <Link to={`/cocktails/${cocktail._id}`} key={cocktail._id}>
                            <h2>{cocktail.name}</h2>
                            <p>{cocktail.ingredients.map(ingredient => ingredient + ' ')}</p>
                        </Link>
                    )
                })}
        </div>
    )
}

export default Cocktails
