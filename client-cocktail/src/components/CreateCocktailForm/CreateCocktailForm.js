import React, { useState } from 'react';
import { CreateFormWrapper } from './CreateCocktailForm.styled';

const CreateCocktailForm = () => {
    const [values, setValues] = useState({ name: '', ingredients: '' });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    };

    const handleCocktailFormSubmit = (event) => {
        event.preventDefault();
        const { name, ingredients } = values;
        fetch(`${process.env.REACT_APP_API_URL}/api/cocktails/create-cocktail`, {
            method: "POST",
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name, ingredients
            })
        })
            .catch(err => { if (err.request) { console.log('REQUEST', err.request) } if (err.response) { console.log('RESPONSE', err.response) } });
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
