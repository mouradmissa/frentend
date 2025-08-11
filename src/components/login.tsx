import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/style.css';
import '../assets/cssf/Login.css';
import AOS from 'aos';
import { useLocation } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init();
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

const location = useLocation();

useEffect(() => {
  const params = new URLSearchParams(location.search);
  const token = params.get('token');

  if (token) {
    fetch(`http://192.168.1.64:5000/login/autologin?token=${token}`)
    .then(res => res.json())
      .then(data => {
        if (data.userId) {
          localStorage.setItem('userId', data.userId);
          localStorage.setItem('userName', data.name);
          localStorage.setItem('userEmail', data.uid);
          localStorage.setItem('userRole', data.role);

          if (data.role === 'admin') {
            navigate('/home_admin');
          } else {
            navigate('/home');
          }
        } else {
          setError(data.message || 'Erreur de connexion automatique.');
        }
      })
      .catch(err => {
        console.error('Erreur auto-login', err);
        setError('Erreur de connexion automatique.');
      });
  }
}, [location.search]);


  
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://192.168.1.64:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur de connexion');
      }

      const { userId, name, uid, role } = data;

      // Stocker les infos
      localStorage.setItem('userId', userId);
      localStorage.setItem('userName', name);
      localStorage.setItem('userEmail', uid);
      localStorage.setItem('userRole', role);
      localStorage.setItem('userEmail', email);
      setSuccess('Connexion réussie.');

      // Redirection selon le rôle
      if (role === 'admin') {
        navigate('/home_admin');
      } else {
        navigate('/home');
      }
    } catch (err: any) {
      setError(err.message || 'Échec de la connexion.');
      console.error('Erreur lors de la connexion:', err);
    }
  };

  return (
    <>
      {loading ? (
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
      ) : (
        <div id="wrapper">
          <div id="page">
            <div className="wrap-login-page">
              <div className="login-box">
                <div className="title-container">
                  <img src="/logoOoredoo.png" alt="Logo" className="logo" />
                  <h3 className="pagetitre">Connectez-vous à votre compte</h3>
                </div>
                <form className="form-login" onSubmit={handleLogin}>
                  <fieldset className="email">
                    <div className="body-title mb-10">
                      Adresse mail <span className="tf-color-1">*</span>
                    </div>
                    <div className="input-icon">
                      <i className="fas fa-envelope"></i>
                      <input
                        type="email"
                        placeholder="Entrez votre adresse mail"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </fieldset>

                  <fieldset className="password">
                    <div className="body-title mb-10">
                      Mot de passe <span className="tf-color-1">*</span>
                    </div>
                    <div className="input-icon">
                      <i className="fas fa-lock"></i>
                      <input
                        type="password"
                        placeholder="Entrez votre mot de passe"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </fieldset>

                  <button type="submit" className="tf-button style-2 w-full" id="bot">
                    Se connecter
                  </button>

                  <p>
                    <a href="/Forgetpassword">Mot de passe oublié ?</a>
                  </p>

                  {error && <div className="error">{error}</div>}
                  {success && <div className="success">{success}</div>}
                </form>

                <div className="new-client">
                  <p>
                    <a href="/signup">Vous n'avez pas de compte ? Inscrivez-vous ici.</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;









