import React from 'react';
import '../assets/css/FooterOoredoo.css';

const FooterOoredoo: React.FC = () => {
  return (
    <footer className="footer-ooredoo">
      <div className="footer-container">
        {/* ===== Brand Section with Icon ===== */}
        <div className="footer-brand">
          <div className="brand-icon-logo">
            <img
              src="/brand-icon.png" // Ton image téléchargée
              alt="Icône Ooredoo"
              className="brand-icon"
            />
            <img
              src="/logoOoredoo.png"
              alt="Ooredoo Logo"
              className="footer-logo"
            />
          </div>
          <p>La meilleure expérience mobile & internet en Tunisie.</p>
        </div>

        {/* ===== Quick Links ===== */}
        <div className="footer-links">
          <h4>Liens rapides</h4>
          <ul>
            <li><a href="/">Accueil</a></li>
            <li><a href="/about">À propos</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* ===== Contact Info ===== */}
        <div className="footer-contact">
          <h4>Contactez-nous</h4>

          <p className="contact-item">
            <img src="/location.png" alt="Adresse" className="contact-icon" />
            <span><strong>Adresse :</strong> 123 Avenue Habib Bourguiba, Tunis</span>
          </p>

          <p className="contact-item">
            <img src="/service client.png" alt="Téléphone" className="contact-icon" />
            <span><strong>Téléphone :</strong> +216 71 123 456</span>
          </p>

          <p className="contact-item">
            <img src="/boutique.png" alt="Email" className="contact-icon" />
            <span><strong>Email :</strong> support@ooredoo.tn</span>
          </p>
        </div>
      </div>

      {/* ===== Footer Bottom ===== */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Ooredoo Tunisie. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default FooterOoredoo;










