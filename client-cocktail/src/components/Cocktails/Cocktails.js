import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

const Cocktails = ({ user }) => {

    const [cocktails, setCocktails] = useState('')
    const { _id: userId } = user || {};

    useEffect(() => {
        getCocktailData();
        return () => {
            setCocktails();
        }
    }, []);

    const getCocktailData = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/cocktails`, { withCredentials: true });
        const foundCocktails = res.data.filter(cocktail => cocktail.cocktailCreator === userId)
        setCocktails(foundCocktails)
    };

    return (
        <div>
            {!cocktails ?
                'loading cocktails'
                :
                cocktails.length ?
                    cocktails.map(cocktail => {
                        return (
                            <Link to={`/cocktails/${cocktail._id}`} key={cocktail._id}>
                                <h2>{cocktail.name}</h2>
                                <p>{cocktail.ingredients.map(ingredient => ingredient + ' ')}</p>
                            </Link>
                        )
                    })
                    :
                    <p>You have no cocktails</p>
            }
        </div>
    )
};

export default Cocktails;
