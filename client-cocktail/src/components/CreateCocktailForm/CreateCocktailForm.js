import React, { useState } from 'react';
import { CreateFormWrapper } from './CreateCocktailForm.styled';
import { useHistory } from "react-router-dom";

import { withAuth } from '../../context/AuthContext';

const CreateCocktailForm = () => {

    const [values, setValues] = useState({ name: '', ingredients: '' });
    const { name, ingredients } = values;
    const history = useHistory();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    };

    const handleCocktailFormSubmit = (event) => {
        event.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/api/cocktails/create-cocktail`, {
            method: "POST",
            withCredentials: true,
            credentials: 'include',
            headers: { "Content-Type": "application/json", "Accept": "application/json", 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({
                name, ingredients
            })
        })
            .then(() => {
                history.push('/cocktails');
            })
            .catch(err => { if (err.request) { console.log('REQUEST', err.request) } if (err.response) { console.log('RESPONSE', err.response) } });
    };

    return (
        <CreateFormWrapper onSubmit={handleCocktailFormSubmit}>
            <input type="text" value={name} name="name" placeholder="Cocktail name" onChange={handleChange} />
            <input type="text" value={ingredients} name="ingredients" placeholder="Cocktail ingredients" onChange={handleChange} />
            <button>Make your magic</button>
        </CreateFormWrapper>
    )
};

export default withAuth(CreateCocktailForm);
