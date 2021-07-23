import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { withAuth } from '../../context/AuthContext';
import EditProfileForm from '../EditProfileForm/EditProfileForm';

const Profile = () => {

    const [isEdit, setIsEdit] = useState(false);
    const [userData, setUserData] = useState('');
    const { name, email, myCocktails } = userData;
    const { profileId } = useParams();

    const handleEditProfileButton = () => {
        setIsEdit(!isEdit);
    };

    const getUserData = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/profile/${profileId}`, { withCredentials: true });
        setUserData(res.data)
    };

    useEffect(() => {
        getUserData();
        return () => {
            getUserData();
        }
    }, []);

    return (
        <>
            {isEdit ?
                <EditProfileForm getUserData={getUserData} setIsEdit={setIsEdit} />
                :
                <>
                    <h1> {name}</h1>
                    <p>{email}</p>
                    <p>Total number of cocktail recipes: {myCocktails?.length}</p>
                    <button onClick={handleEditProfileButton}>Edit</button>
                </>
            }

        </>
    )
}

export default withAuth(Profile);
