import React, { useState, useEffect } from 'react';
import { FiUser, FiMail, FiPhone, FiMapPin, FiSettings, FiLogOut } from 'react-icons/fi';
import '../assets/css/Profile.css';
import { useNavigate } from 'react-router-dom';

import Headerglobal from './headerglobal'; 

const Profile = () => {
  // États pour infos utilisateur
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    // Chargement des infos depuis localStorage au montage
    setName(localStorage.getItem('userName') || 'Nom non défini');
    setEmail(localStorage.getItem('userEmail') || 'Email non défini');
    setPhone(localStorage.getItem('userPhone') || 'Téléphone non défini');
    setAddress(localStorage.getItem('userAddress') || 'Adresse non définie');
  }, []);

  const logLogoutAction = async () => {
    const email = localStorage.getItem('userEmail') || 'inconnu';
  
    try {
      await fetch('http://192.168.1.64:5000/log-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          action: 'logout',
          details: 'Déconnexion de l’utilisateur'
        })
      });
    } catch (error) {
      console.error("Erreur lors du log de déconnexion :", error);
    }
  };
  
  const handleLogout = async () => {
    await logLogoutAction(); // Log l’action avant de vider le localStorage
    localStorage.clear();
    navigate('/logout');
  };
    const handleupdatepassword = () => {
      navigate('/Forgetpassword');
    };
  return (
    <div className="home-page">
      
      <Headerglobal />
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            <FiUser className="avatar-icon" />
          </div>
          <h1 className="profile-name">{name}</h1>
          <p className="profile-email">{email}</p>
        </div>

        <div className="profile-content">
          <div className="profile-section">
            <h2 className="section-title">Informations Personnelles</h2>
            <div className="info-item">
              <FiUser className="info-icon" />
              <div className="info-content">
                <span className="info-label">Nom Complet</span>
                <span className="info-value">{name}</span>
              </div>
            </div>
            <div className="info-item">
              <FiMail className="info-icon" />
              <div className="info-content">
                <span className="info-label">Email</span>
                <span className="info-value">{email}</span>
              </div>
            </div>
            <div className="info-item">
              <FiPhone className="info-icon" />
              <div className="info-content">
                <span className="info-label">Téléphone</span>
                <span className="info-value">{phone}</span>
              </div>
            </div>
         
          </div>

          <div className="profile-section">
            <h2 className="section-title">Paramètres du Compte</h2>
            <button className="profile-action-btn" onClick={handleupdatepassword}>
              <FiSettings className="action-icon" />
              <span>Modifier le mote de passe</span>
            </button>
            <button className="profile-action-btn logout-btn" onClick={() => {
              localStorage.clear();
              window.location.href = '/login'; // redirige vers login après déconnexion
            }}>
          <button className="profile-action-btn logout-btn" onClick={handleLogout}>
            <FiLogOut className="action-icon" />
            <span>Déconnexion</span>
          </button>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;









