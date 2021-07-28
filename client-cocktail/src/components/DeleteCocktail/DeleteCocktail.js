import React from 'react';
import { useHistory } from "react-router-dom";

const DeleteCocktail = ({ cocktail }) => {

    const history = useHistory()
    const { _id: cocktailId } = cocktail;

    const handleDeleteCocktail = () => {
        try {
            fetch(`${process.env.REACT_APP_API_URL}/api/cocktails/${cocktailId}`, {
                method: "DELETE",
                withCredentials: true,
                credentials: 'include',
                headers: { "Content-Type": "application/json", "Accept": "application/json", 'Access-Control-Allow-Origin': '*' },
            })
                .then(() => {
                    history.push('/cocktails');
                })
        }
        catch (error) {
            if (error.request) {
                console.log('REQUEST', error.request)
            }
            if (error.response) {
                console.log('RESPONSE', error.response)
            }
        }
    };

    return (
        <div>
            <button onClick={handleDeleteCocktail}>Delete Cocktail</button>
        </div>
    );
};

export default DeleteCocktail;
