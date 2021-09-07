import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import DeleteProfile from '../DeleteProfile/DeleteProfile';
import { EditProfileFormWrapper } from '../EditProfileForm/EditProfileForm.styled';

const EditProfileForm = ({ getUserData, setIsEdit, userData, logout }) => {
  const [values, setValues] = useState({ name: '', email: '' });
  const { profileId } = useParams();
  const { name, email } = values;

  useEffect(() => {
    const { name, email } = userData;
    setValues({ ...values, name, email });
    return () => {
      setValues();
      getUserData();
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleProfileEditSubmit = (event) => {
    event.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/api/profile/${profileId}`, {
      method: 'PUT',
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        name,
        email,
      }),
    })
      .then(() => {
        getUserData();
        setTimeout(() => {
          setIsEdit(false);
        }, 300);
      })
      .catch((error) => {
        if (error.request) {
          console.log('REQUEST', error.request);
        }
        if (error.response) {
          console.log('RESPONSE', error.response);
        }
      });
  };

  return (
    <EditProfileFormWrapper onSubmit={handleProfileEditSubmit}>
      <input type="text" name="name" value={name} onChange={handleChange} />
      <input type="email" name="email" value={email} onChange={handleChange} />
      <button>Save</button>
      <DeleteProfile logout={logout} />
    </EditProfileFormWrapper>
  );
};

export default EditProfileForm;
