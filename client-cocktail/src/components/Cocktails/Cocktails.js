import React, { useState, useEffect } from 'react';
import axios from "axios";
import Cocktail from './Cocktail';
import {map, filter} from 'lodash';

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
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/cocktails/your-cocktails`, { withCredentials: true });
        const foundCocktails = filter(res.data, cocktail => cocktail.cocktailCreator === userId)
        setCocktails(foundCocktails)
    };

    return (
        <div>
            {!cocktails ?
                'loading cocktails'
                :
                cocktails.length ?
                    map(cocktails, cocktail => {
                        return (
                            <Cocktail cocktail={cocktail} key={cocktail._id}/>
                        )
                    })
                    :
                    <p>You have no cocktails</p>
            }
        </div>
    )
};

export default Cocktails;
