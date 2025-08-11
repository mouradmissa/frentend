import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import { useNavigate } from 'react-router-dom';
import '../assets/css/animate.min.css';
import '../assets/css/animation.css';
import '../assets/css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/cssf/owl.carousel.min.css';
import '../assets/cssf/owl.theme.default.min.css';
import '../assets/cssf/aos.css';
import '../assets/cssf/style.css';
import '../assets/cssf/color.css';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState('visitor'); // valeur par défaut

  useEffect(() => {
    AOS.init();
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    // Validation simple avant envoi
    if (!email || !password || !name) {
      setError('Tous les champs sont obligatoires.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Email invalide.');
      return;
    }
    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }
  
    setError('');
    setSuccess('');
  
    try {
      const response = await fetch('https://backend-18yu.onrender.com/signup', {  // port corrigé ici
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          name,
          role,    // <--- ajout du role
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        if (role === 'admin') {
          setSuccess("Compte admin créé. En attente de validation par l'administrateur principal.");
        } else {
          setSuccess("Inscription réussie !");
          navigate('/productlist');
        }
        setEmail('');
        setPassword('');
        setName('');
      }
      
    } catch (err) {
      setError('Erreur réseau : impossible de contacter le serveur.');
    }
  };
  
  return (
    <>
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
    <div id="wrapper" style={{ backgroundColor: 'WHITE' }}>
      <div id="page" className="">
        <div className="wrap-login-page">
          <div className="flex-grow flex flex-column justify-center gap30">
            <a href="index.html" id="site-logo-inner"></a>
            <div className="login-box">
              <div>
                <div className="title-container">
                <img src="/logoOoredoo.png" alt="Logo" className="logo" />
                 <h3 className="pagetitre">Créer votre compte</h3>
                </div>
                <div className="pagetitre body-text">Entrez vos informations pour vous inscrire</div>
              </div>
              <form className="form-login flex flex-column gap24" onSubmit={handleSignup}>
                <fieldset className="email">
                  <div className="body-title mb-10">
                    Adresse mail <span className="tf-color-1">*</span>
                  </div>
                  <div className="input-icon">
                    <i className="fas fa-envelope"></i>
                    <input
                      className="flex-grow"
                      type="email"
                      placeholder="Entrez votre adresse mail."
                      name="email"
                      tabIndex={0}
                      aria-required="true"
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
                      className="flex-grow"
                      type="password"
                      placeholder="Entrez votre mot de passe."
                      name="password"
                      tabIndex={0}
                      aria-required="true"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </fieldset>
                <fieldset className="name">
                  <div className="body-title mb-10">
                    Nom et Prénom <span className="tf-color-1">*</span>
                  </div>
                  <div className="input-icon">
                    <i className="fas fa-user"></i>
                    <input
                      className="flex-grow"
                      type="text"
                      placeholder="Entrez votre nom et votre prénom."
                      name="name"
                      tabIndex={0}
                      aria-required="true"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </fieldset>
                <fieldset className="role">
  <div className="body-title mb-10">
    Rôle <span className="tf-color-1">*</span>
  </div>
  <select
    className="flex-grow"
    value={role}
    onChange={(e) => setRole(e.target.value)}
    required
  >
    <option value="visitor">Visiteur</option>
    <option value="admin">Administrateur</option>
  </select>
</fieldset>
              
                <button id="bot" type="submit" className="tf-button style-2 w-full">S'inscrire</button>
                <p>
                  <a href="/login">Vous avez déjà un compte ? Connectez-vous ici.</a>
                </p>
                {error && <div className="error" style={{ color: 'red' }}>{error}</div>}
                {success && <div className="success" style={{ color: 'green' }}>{success}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
      )}
      </>
    );
  };
export default Signup;










