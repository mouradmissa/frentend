import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        localStorage.removeItem('userId'); // Clear the user ID from local storage
        navigate('/LandingPage'); // Redirect to the landing page after logout
      } catch (error) {
        console.error('Erreur lors de la déconnexion:', error);
      }
    };

    performLogout();
    navigate('/login'); 
  });

  return (
    <div>
      <p>Déconnexion en cours...</p>
      
    </div>
    
  );
};

export default Logout;










