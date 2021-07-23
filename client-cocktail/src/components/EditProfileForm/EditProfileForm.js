import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { withAuth } from '../../context/AuthContext';
import DeleteProfile from '../DeleteProfile/DeleteProfile';
import { EditProfileFormWrapper } from '../EditProfileForm/EditProfileForm.styled';

const EditProfileForm = ({ user, getUserData, setIsEdit }) => {

    const [values, setValues] = useState({ name: '', email: '' });
    const { name, email } = values;
    const { profileId } = useParams();

    useEffect(() => {
        const { name, email } = user;
        setValues({ ...values, name, email });
    }, [])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    };

    const handleProfileEditSubmit = (event) => {
        event.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/api/profile/${profileId}`, {
            method: "PUT",
            withCredentials: true,
            credentials: 'include',
            headers: { "Content-Type": "application/json", "Accept": "application/json", 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({
                name, email
            })
        })
            .then(() => {
                getUserData();
                setTimeout(() => {
                    setIsEdit(false);
                }, 300);
            })
            .catch(err => { if (err.request) { console.log('REQUEST', err.request) } if (err.response) { console.log('RESPONSE', err.response) } });
    };

    return (
        <EditProfileFormWrapper onSubmit={handleProfileEditSubmit}>
            <input type="text" name="name" value={name} onChange={handleChange} />
            <input type="email" name="email" value={email} onChange={handleChange} />
            <button>Save</button>
            <DeleteProfile />
        </EditProfileFormWrapper>
    )
};

export default withAuth(EditProfileForm);
