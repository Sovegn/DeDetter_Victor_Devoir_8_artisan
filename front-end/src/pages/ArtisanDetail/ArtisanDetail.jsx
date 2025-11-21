import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { artisanService } from '../../services/api';
import StarRating from '../../components/StarRating/StarRating';
import ContactForm from '../../components/ContactForm/ContactForm';
import './ArtisanDetail.scss';

const ArtisanDetail = () => {
  const { id } = useParams();
  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchArtisan = async () => {
      if (!id || isNaN(id)) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        const response = await artisanService.getArtisan(id);
        setArtisan(response.data);
        document.title = `${response.data.nom} - Trouve ton artisan`;
      } catch (error) {
        console.error('Erreur lors du chargement de l\'artisan:', error);
        if (error.response && error.response.status === 404) {
          setNotFound(true);
        } else {
          setError('Impossible de charger les informations de l\'artisan');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchArtisan();
  }, [id]);

  if (notFound) {
    return <Navigate to="/404" replace />;
  }

  if (loading) {
    return (
      <main id="main-content" className="artisan-detail-page">
        <div className="container-custom">
          <div className="loading-state">
            <p>Chargement des informations de l'artisan...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main id="main-content" className="artisan-detail-page">
        <div className="container-custom">
          <div className="error-state">
            <p>{error}</p>
            <a href="/" className="btn-secondary-custom">
              Retour à l'accueil
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className="artisan-detail-page">
      <div className="container-custom">
        <div className="artisan-header">
          <div className="artisan-image">
            {artisan.image ? (
              <img 
                src={artisan.image} 
                alt={`Photo de ${artisan.nom}`}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div className="image-placeholder" style={{ display: artisan.image ? 'none' : 'flex' }}>
              <svg width="80" height="80" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
              </svg>
            </div>
          </div>
          
          <div className="artisan-info">
            <h1>{artisan.nom}</h1>
            
            <div className="artisan-rating">
              <StarRating rating={artisan.note} size="large" />
            </div>
            
            <div className="artisan-meta">
              <div className="meta-item">
                <strong>Spécialité :</strong> {artisan.specialite?.nom}
              </div>
              <div className="meta-item">
                <strong>Catégorie :</strong> {artisan.specialite?.categorie?.nom}
              </div>
              <div className="meta-item location">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                </svg>
                {artisan.ville}
              </div>
              
              {artisan.site_web && (
                <div className="meta-item website">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"/>
                  </svg>
                  <a 
                    href={artisan.site_web} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="website-link"
                  >
                    Voir le site web
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="artisan-content">
          <div className="artisan-about">
            <h2>À propos</h2>
            <div className="about-content">
              {artisan.apropos ? (
                <p>{artisan.apropos}</p>
              ) : (
                <p className="no-description">
                  Aucune description disponible pour cet artisan.
                </p>
              )}
            </div>
          </div>

          <div className="contact-section">
            <ContactForm artisan={artisan} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ArtisanDetail;