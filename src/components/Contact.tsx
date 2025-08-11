import React from 'react';
import Headerglobal from './headerglobal'; 
import '../assets/css/Contact.css';
import FooterOoredoo from '../components/FooterOoredoo';

const Contact: React.FC = () => {
  return (
    <div className="contact-page">
      <Headerglobal /> {/* ✅ Insertion du header en haut */}

      <h1>Contactez Ooredoo Support</h1>

      <div className="contact-container">
        <form className="contact-form">
          <label>Nom complet</label>
          <input type="text" placeholder="Entrez votre nom" required />

          <label>Email</label>
          <input type="email" placeholder="exemple@ooredoo.tn" required />

          <label>Message</label>
          <textarea placeholder="Votre message..." rows={6} required />

          <button type="submit">Envoyer</button>
        </form>

        <div className="contact-info">
  <h2>Informations de contact</h2>
  
  <div className="info-item">
    <span className="info-icon">📧</span>
    <span><strong>Email :</strong> support@ooredoo.tn</span>
  </div>

  <div className="info-item">
    <span className="info-icon">📞</span>
    <span><strong>Téléphone :</strong> +216 111 222 333</span>
  </div>

  <div className="info-item">
    <span className="info-icon">📍</span>
    <span><strong>Adresse :</strong> Siège Ooredoo, Tunis, Tunisie</span>
  </div>
</div>

      </div>
      <footer>
      <FooterOoredoo />
      </footer>
    </div>
    
  );
};

export default Contact;









