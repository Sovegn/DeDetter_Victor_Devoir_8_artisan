import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NotFound.scss';

const NotFound = () => {
  useEffect(() => {
    document.title = "Page non trouvée - Trouve ton artisan";
  }, []);

  return (
    <main id="main-content" className="not-found-page">
      <div className="container-custom">
        <div className="not-found-content">
          <div className="not-found-image">
            <svg 
              width="200" 
              height="200" 
              fill="currentColor" 
              viewBox="0 0 16 16" 
              aria-hidden="true"
              className="error-icon"
            >
              <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
              <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A1.5 1.5 0 0 1 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9a.5.5 0 0 1-.5-.5h-13z"/>
            </svg>
          </div>
          
          <div className="not-found-text">
            <h1>Page non trouvée</h1>
            <p>
              La page que vous avez demandée n'existe pas ou a été déplacée. 
              Elle a peut-être été supprimée, renommée ou vous avez saisi une adresse incorrecte.
            </p>
            <div className="not-found-actions">
              <Link to="/" className="btn-primary-custom">
                Retour à l'accueil
              </Link>
              <Link to="/artisans" className="btn-secondary-custom">
                Voir tous les artisans
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;