import React, { useEffect, useState } from 'react';
import '../assets/css/headergloble.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiHome, FiPieChart, FiPhone, FiMail, FiUser } from 'react-icons/fi';
import OoredooLogo from '../assets/image/logo/logoOoredoo.png';

const Headerglobal: React.FC = () => {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem('userName');
    if (name) {
      setUserName(name);
    }
  }, []);

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <header className="ooredoo-header">
      <div className="header-container">
        <div className="logo-container">
          <img src={OoredooLogo} alt="Ooredoo Logo" className="logo" />
        </div>

        <nav className="main-nav">
          <ul className="nav-list">
            <li className="nav-item">
              <NavLink to="/home" className="nav-link">
                <FiHome className="nav-icon" />
                <span>Accueil</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/transactions" className="nav-link">
                <FiPieChart className="nav-icon" />
                <span>transactions</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contact" className="nav-link">
                <FiPhone className="nav-icon" />
                <span>Contact</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/support" className="nav-link">
                <FiMail className="nav-icon" />
                <span>Support</span>
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="profilee-container">
          <button className="profile-button" onClick={handleProfileClick}>
            <FiUser className="profile-icon" />
            <span className="profile-text">{userName || 'Profil'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Headerglobal;









