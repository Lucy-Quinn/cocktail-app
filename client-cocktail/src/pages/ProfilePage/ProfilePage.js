import React from 'react';

import Profile from '../../components/Profile/Profile';
import { withAuth } from '../../context/AuthContext';

const ProfilePage = ({ user, getAuthRoute, logout }) => {

    return (
        <Profile user={user} getAuthRoute={getAuthRoute} logout={logout} />
    );
};

export default withAuth(ProfilePage);