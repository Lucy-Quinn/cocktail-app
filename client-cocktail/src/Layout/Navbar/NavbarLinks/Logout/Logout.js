import React from 'react';
import { NavLink as Link } from 'react-router-dom';

const Logout = ({ logout }) => {
  const handleLogout = () => {
    logout();
  };

  return (
    <React.Fragment>
      <li>
        <Link to="/logout" onClick={handleLogout}>
          Logout
        </Link>
      </li>
    </React.Fragment>
  );
};

export default Logout;
