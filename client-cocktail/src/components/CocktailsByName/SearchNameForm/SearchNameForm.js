import React from 'react';

const SearchNameForm = ({ nameValue, setNameValue }) => {
  const handleChange = (event) => {
    setNameValue(event.target.value);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search by name"
        value={nameValue}
        onChange={handleChange}
      />
      <button>Search</button>
    </>
  );
};

export default SearchNameForm;
