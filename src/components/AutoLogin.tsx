// src/pages/AutoLoginPage.tsx
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AutoLogin: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (!token) {
      console.error('Token manquant');
      return;
    }

    fetch(`https://backend-18yu.onrender.com/auto-login?token=${token}`)
      .then(res => res.json())
      .then(data => {
        if (data.userId) {
          localStorage.setItem('userId', data.userId);
          localStorage.setItem('userName', data.name);
          localStorage.setItem('userEmail', data.uid);
          localStorage.setItem('userRole', data.role);

          // Redirige selon rôle
          if (data.role === 'admin') {
            navigate('/home_admin');
          } else {
            navigate('/home');
          }
        } else {
          console.error(data.message || 'Erreur de connexion automatique.');
          navigate('/login');
        }
      })
      .catch(err => {
        console.error('Erreur auto-login :', err);
        navigate('/login');
      });
  }, [location.search, navigate]);

  return (
    <div className="page-loader">
      <div className="wrapper">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
        <span>Connexion automatique...</span>
      </div>
    </div>
  );
};

export default AutoLogin;










