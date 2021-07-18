import React, { useState, useEffect } from 'react';
import axios from "axios";

const Cocktails = () => {

    const [cocktails, setCocktails] = useState('')

    useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_API_URL}/api/cocktails`,
                { withCredentials: true }
            )
            .then(({ data: cocktailData }) => {
                setCocktails(cocktailData)
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div>
            {!cocktails ?
                'loading cocktails'
                :
                cocktails.map(cocktail => {
                    return (
                        <div key={cocktail._id}>
                            <h2>{cocktail.name}</h2>
                            <p>{cocktail.ingredients.map(ingredient => ingredient + ' ')}</p>
                        </div>
                    )
                })}
        </div>
    )
}

export default Cocktails
