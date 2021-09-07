import React, { useState } from 'react';

import EditProfileForm from '../EditProfileForm/EditProfileForm';

const Profile = ({ user, getAuthRoute, logout }) => {
  const [isEdit, setIsEdit] = useState(false);
  const { name, email, myCocktails, dateOfBirth } = user;

  const date = new Date(dateOfBirth).toDateString().slice(4);

  const handleEditProfileButton = () => {
    setIsEdit(!isEdit);
  };

  return (
    <>
      {isEdit ? (
        <EditProfileForm
          getUserData={getAuthRoute}
          setIsEdit={setIsEdit}
          userData={user}
          logout={logout}
        />
      ) : (
        <>
          <h1> {name}</h1>
          <p>{email}</p>
          <p>{date}</p>
          <p>Total number of cocktail recipes: {myCocktails?.length}</p>
          <button onClick={handleEditProfileButton}>Edit</button>
        </>
      )}
    </>
  );
};

export default Profile;
