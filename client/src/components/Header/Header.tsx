import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
//CSS
import './Header.css';
//Material UI Icons and Buttons
import PersonIcon from '@mui/icons-material/Person';
import ForumIcon from '@mui/icons-material/Forum';
import { IconButton } from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
//Logout component => TO BE REPLACED WITH PROFILE COMP
// import Logout from '../Logout/Logout';

const Header: React.FC = (backButton) => {
  const navigate = useNavigate();
  return (
    <div className="finalheader">
      {/* If backButton is passed as prop, link to homepage */}
      {backButton ? (
        <IconButton
          onClick={() => {
            console.log('click');
            navigate('/logout');
          }}
        >
          <ArrowLeftIcon
            fontSize="large"
            className="arrow-back-btn"
          ></ArrowLeftIcon>
        </IconButton>
      ) : (
        <Link to="logout">
          <IconButton>
            <PersonIcon fontSize="large" className="profile-icon" />
          </IconButton>
        </Link>
      )}
      {/* Logo / Text */}
      <h2 className="header__logo-text">FMB</h2>
      {/* Chat button with link */}
      <Link to="/chat">
        <IconButton>
          <ForumIcon className="chat-icon" fontSize="large" />
        </IconButton>
      </Link>
    </div>
  );
};

export default Header;
