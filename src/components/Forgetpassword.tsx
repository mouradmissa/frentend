import React, { useState, useEffect, useRef } from 'react';
import AOS from 'aos';
import { useNavigate } from 'react-router-dom';
import '../assets/css/style.css';

const Forgetpassword: React.FC = () => {
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  useEffect(() => {
    AOS.init();
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    console.log('UserId récupéré:', storedUserId);
    if (storedUserId) setUserId(storedUserId);
  }, []);
  
  const handleReset = async () => {
    try {
      const response = await fetch('https://backend-18yu.onrender.com/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          newPassword, // À récupérer d’un input ou générer
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Erreur inconnue');
      }
  
      alert('Mot de passe réinitialisé !');
      setSuccess('Mot de passe réinitialisé !');
  
      // Petite pause avant redirection pour que l'utilisateur voie le message
      setTimeout(() => {
        navigate('/profile');
      }, 1000);
  
    } catch (error) {
      setError(`Erreur lors de la réinitialisation du mot de passe : `);
      
    }
  };
  
  return (
    <div>
      {loading && (
        <div className="page-loader">
          <div className="wrapper">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="shadow"></div>
            <div className="shadow"></div>
            <div className="shadow"></div>
            <span>Loading</span>
          </div>
        </div>
      )}
      {!loading && (
        <div id="page" className="page-container">
          <div className="wrap-login-page">
            <div className="flex-grow flex flex-column justify-center gap-30">
              <div className="login-box">
                <div className="title-container">
                  <img src="/logoOoredoo.png" alt="Logo" className="logo" />
                  <h3 className="pagetitre">Réinitialiser le mot de passe</h3>
                </div>
                <form
  className="form-login flex flex-column gap-24"
  onSubmit={(e) => {
    e.preventDefault(); // empêche la page de se recharger
    handleReset();
  }}
>
                <fieldset>
                    <label>Email</label>
                    <input
                      type="email"
                      placeholder="Entrez votre adresse email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input-style"
                      required
                    />
                  </fieldset>

                  <fieldset>
                    <label>Nouveau mot de passe</label>
                    <input
                      type="password"
                      placeholder="Nouveau mot de passe"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="input-style"
                      required
                    />
                  </fieldset>

                  {error && <div className="error" style={{ color: '#f44336' }}>{error}</div>}
                  {success && <div className="success" style={{ color: '#4caf50' }}>{success}</div>}

                  <button type="submit" className="tf-button style-2 w-full" id="bot">
                  Réinitialiser
                  </button>
                </form>

                
              </div>

              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Forgetpassword;
























