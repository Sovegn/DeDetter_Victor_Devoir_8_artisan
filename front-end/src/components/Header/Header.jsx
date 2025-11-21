import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { categorieService } from '../../services/api';
import SearchBar from '../SearchBar/SearchBar';
import './Header.scss';

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categorieService.getAllCategories();
        setCategories(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des catégories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Fermer le menu mobile lors du changement de route
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="main-header" role="banner">
      <div className="container-custom">
        <nav className="navbar" role="navigation" aria-label="Navigation principale">
          {/* Logo à gauche */}
          <div className="navbar-brand">
            <Link 
              to="/" 
              className="brand-link" 
              aria-label="Retour à l'accueil"
              tabIndex="0"
            >
              <img 
                src="/logo.png" 
                alt="Trouve ton artisan - Région Auvergne-Rhône-Alpes" 
                className="brand-logo"
                width="280"
                height="90"
              />
            </Link>
          </div>

          {/* SearchBar et navigation desktop */}
          <div className="navbar-right">
            <div className="header-search-container">
              <SearchBar className="header-search" />
            </div>
            
            <div className="navbar-nav desktop-nav">
              {!loading && categories.map((categorie) => (
                <Link
                  key={categorie.id}
                  to={`/artisans?categorie=${categorie.id}`}
                  className="nav-link"
                  tabIndex="0"
                >
                  {categorie.nom}
                </Link>
              ))}
            </div>
          </div>

          {/* Bouton menu mobile */}
          <button
            className="navbar-toggle mobile-only"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu de navigation"}
            tabIndex="0"
          >
            <span className={`navbar-toggle-icon ${isMenuOpen ? 'active' : ''}`}></span>
            <span className={`navbar-toggle-icon ${isMenuOpen ? 'active' : ''}`}></span>
            <span className={`navbar-toggle-icon ${isMenuOpen ? 'active' : ''}`}></span>
          </button>
        </nav>

        
        <div className="mobile-search-bar">
          <SearchBar placeholder="Rechercher un artisan..." />
        </div>

        
        <div 
          className={`mobile-nav ${isMenuOpen ? 'mobile-nav-open' : ''}`}
          id="mobile-navigation"
        >
          <div className="mobile-nav-links">
            {!loading && categories.map((categorie) => (
              <Link
                key={categorie.id}
                to={`/artisans?categorie=${categorie.id}`}
                className="mobile-nav-link"
                onClick={() => setIsMenuOpen(false)}
                tabIndex="0"
              >
                {categorie.nom}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;