import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="main-footer" role="contentinfo">
      <div className="container-custom">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Pages légales</h3>
            <nav aria-label="Navigation pages légales">
              <ul className="footer-links">
                <li>
                  <Link to="/mentions-legales" className="footer-link">
                    Mentions légales
                  </Link>
                </li>
                <li>
                  <Link to="/donnees-personnelles" className="footer-link">
                    Données personnelles
                  </Link>
                </li>
                <li>
                  <Link to="/accessibilite" className="footer-link">
                    Accessibilité
                  </Link>
                </li>
                <li>
                  <Link to="/cookies" className="footer-link">
                    Cookies
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Contact</h3>
            <address className="footer-address">
              <p>
                <strong>Région Auvergne-Rhône-Alpes</strong><br />
                Antenne de Lyon
              </p>
              <p>
                101 cours Charlemagne<br />
                CS 20033<br />
                69269 LYON CEDEX 02<br />
                France
              </p>
              <p>
                <a href="tel:+33426734000" className="footer-link">
                  +33 (0)4 26 73 40 00
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            © {new Date().getFullYear()} Région Auvergne-Rhône-Alpes. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;