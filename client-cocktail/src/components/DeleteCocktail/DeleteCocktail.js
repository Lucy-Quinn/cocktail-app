import React from 'react';

const DeleteCocktail = ({ cocktail }) => {

    const { _id: cocktailId } = cocktail;

    const handleDeleteCocktail = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/cocktails/${cocktailId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        })
            .catch(err => { if (err.request) { console.log('REQUEST', err.request) } if (err.response) { console.log('RESPONSE', err.response) } });
    };

    return (
        <div>
            <button onClick={handleDeleteCocktail}>Delete Cocktail</button>
        </div>
    )
}

export default DeleteCocktail
