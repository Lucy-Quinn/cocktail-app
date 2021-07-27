import React, { useState, useEffect } from 'react';

const EditCocktailForm = ({ cocktail, setIsEdit, getCocktailData }) => {

    const [values, setValues] = useState({ name: '', ingredients: '' });
    const { name, ingredients, _id: cocktailId } = cocktail;

    useEffect(() => {
        setValues({ ...values, name, ingredients });
    }, [])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    };

    const handleEditCocktailformSubmit = (event) => {
        event.preventDefault();
        const { name, ingredients } = values;
        fetch(`${process.env.REACT_APP_API_URL}/api/cocktails/${cocktailId}`, {
            method: "PUT",
            withCredentials: true,
            credentials: 'include',
            headers: { "Content-Type": "application/json", "Accept": "application/json", 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({
                name, ingredients
            })
        })
            .then(() => {
                getCocktailData();
                setTimeout(() => {
                    setIsEdit(false);
                }, 300);
            })
            .catch(err => { if (err.request) { console.log('REQUEST', err.request) } if (err.response) { console.log('RESPONSE', err.response) } });
    };

    return (
        <form onSubmit={handleEditCocktailformSubmit}>
            <input type="text" value={values.name} name="name" onChange={handleChange} />
            <input type="text" value={values.ingredients} name="ingredients" onChange={handleChange} />
            <button type="submit">Save</button>
        </form>
    );
};

export default EditCocktailForm;
