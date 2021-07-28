import React, { useState } from 'react';
import { CreateFormWrapper } from './CreateCocktailForm.styled';
import { useHistory } from "react-router-dom";

const CreateCocktailForm = ({ getAuthRoute }) => {

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
                name,
                ingredients
            })
        })
            .then(() => {
                getAuthRoute();
                history.push('/cocktails');
            })
            .catch(error => {
                if (error.request) {
                    console.log('REQUEST', error.request)
                }
                if (error.response) {
                    console.log('RESPONSE', error.response)
                }
            });
    };

    return (
        <CreateFormWrapper onSubmit={handleCocktailFormSubmit}>
            <input type="text" value={name} name="name" placeholder="Cocktail name" onChange={handleChange} />
            <input type="text" value={ingredients} name="ingredients" placeholder="Cocktail ingredients" onChange={handleChange} />
            <button>Make your magic</button>
        </CreateFormWrapper>
    );
};

export default CreateCocktailForm;
