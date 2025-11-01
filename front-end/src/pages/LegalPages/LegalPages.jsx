import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './LegalPages.css';

const LegalPages = () => {
  const { page } = useParams();

  const pageContent = {
    'mentions-legales': {
      title: 'Mentions légales',
      description: 'Informations légales concernant le site Trouve ton artisan'
    },
    'donnees-personnelles': {
      title: 'Données personnelles',
      description: 'Politique de protection des données personnelles'
    },
    'accessibilite': {
      title: 'Accessibilité',
      description: 'Déclaration d\'accessibilité du site'
    },
    'cookies': {
      title: 'Cookies',
      description: 'Politique d\'utilisation des cookies'
    }
  };

  const currentPage = pageContent[page] || {
    title: 'Page légale',
    description: 'Information légale'
  };

  useEffect(() => {
    document.title = `${currentPage.title} - Trouve ton artisan`;
  }, [currentPage.title]);

  return (
    <main id="main-content" className="legal-page">
      <div className="container-custom">
        <div className="page-header">
          <h1>{currentPage.title}</h1>
          <p className="page-description">{currentPage.description}</p>
        </div>
        
        <div className="page-content">
          <div className="construction-notice">
            <h2>Page en construction</h2>
            <p>
              Cette page est actuellement en cours de rédaction par nos équipes juridiques spécialisées.
              Le contenu sera disponible prochainement.
            </p>
            <p>
              Pour toute question urgente concernant {currentPage.title.toLowerCase()}, 
              vous pouvez nous contacter :
            </p>
            <div className="contact-info">
              <p>
                <strong>Région Auvergne-Rhône-Alpes</strong><br />
                101 cours Charlemagne<br />
                CS 20033<br />
                69269 LYON CEDEX 02<br />
                France
              </p>
              <p>
                <strong>Téléphone :</strong> 
                <a href="tel:+33426734000">+33 (0)4 26 73 40 00</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LegalPages;