import React from 'react';
import { useContext } from 'react';
import { mainContext } from '../../App';
import { logout } from '../../services/backEndService';
import { useNavigate } from 'react-router-dom';
import './Logout.css';
import { AppContextInterface } from '../../App';

const Logout: React.FC = () => {
  const context = useContext(mainContext) as AppContextInterface; //provides access to isAuthenticated states
  let navigate = useNavigate();

  function handleLogout() {
    logout();
    handleAuth();
    navigate('/login');
  }

  function handleAuth() {
    context.setIsAuthenticated(false);
  }

  return (
    <div className="logout-container">
      <h2 className="top">Logout</h2>
      <h4 className="sub-top">Click the button below to log out</h4>
      <div className="btn-container">
        <button className="logout-btn" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Logout;
