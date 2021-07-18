import React, { useState } from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom";

import { CreateFormWrapper } from './CreateCocktailForm.styled';

const CreateCocktailForm = () => {
    const [values, setValues] = useState({ name: '', ingredients: '' });
    const history = useHistory();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    };

    const handleCocktailFormSubmit = (event) => {
        event.preventDefault();
        const { name, ingredients } = values;
        console.log(typeof name, typeof ingredients)
        axios
            .post(
                `${process.env.REACT_APP_API_URL}/api/cocktails/create-cocktail`,
                { name, ingredients },
                { withCredentials: true }
            )
            .then(() => {
                // history.push('/api/cocktails');
                console.log('hell yes')

            })
            .catch((err) => console.log(err));
    };
    return (
        <CreateFormWrapper onSubmit={handleCocktailFormSubmit}>
            <input type="text" value={values.name} name="name" placeholder="Cocktail name" onChange={handleChange} />
            <input type="text" value={values.ingredients} name="ingredients" placeholder="Cocktail ingredients" onChange={handleChange} />
            <button>Make your magic</button>
        </CreateFormWrapper>
    )
}

export default CreateCocktailForm
