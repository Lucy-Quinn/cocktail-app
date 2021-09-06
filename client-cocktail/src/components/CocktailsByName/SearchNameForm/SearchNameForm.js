import React from 'react';

const SearchNameForm = ({handleCocktailByNameSubmit, nameValue, setNameValue}) => {

    const handleChange = (event) => {
        setNameValue(event.target.value);
    }
    
    return (
              <form onSubmit={handleCocktailByNameSubmit}>
            <input type="text" placeholder="Search by name" value={nameValue} onChange={handleChange}/>
            <button>Search</button>
        </form>
    )
}

export default SearchNameForm
