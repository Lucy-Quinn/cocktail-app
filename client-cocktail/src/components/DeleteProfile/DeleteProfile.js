import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DeleteProfile = ({ logout }) => {

    const { profileId } = useParams();

    const handleDeleteProfile = () => {
        axios
            .delete(
                `${process.env.REACT_APP_API_URL}/api/profile/${profileId}`,
                {
                    withCredentials: true,
                }
            )
            .then(() => {
                logout();
            })
            .catch((error) => console.log(error));
    };

    return (
        <div>
            <button onClick={handleDeleteProfile}>Delete</button>
        </div>
    );
};

export default DeleteProfile;
