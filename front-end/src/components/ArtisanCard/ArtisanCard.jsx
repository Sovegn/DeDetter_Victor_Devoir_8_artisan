import React from 'react';
import { Link } from 'react-router-dom';
import StarRating from '../StarRating/StarRating';
import './ArtisanCard.css';

const ArtisanCard = ({ artisan, className = "" }) => {
  if (!artisan) return null;

  const {
    id,
    nom,
    note,
    ville,
    specialite,
    image
  } = artisan;

  return (
    <div className={`artisan-card card-custom ${className}`}>
      <Link to={`/artisan/${id}`} className="artisan-card-link" aria-label={`Voir la fiche de ${nom}`}>
        <div className="artisan-card-image">
          {image ? (
            <img 
              src={image} 
              alt={`Photo de ${nom}`}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          ) : (
            <div className="image-placeholder">
              <svg width="40" height="40" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
              </svg>
            </div>
          )}
        </div>
        
        <div className="artisan-card-body">
          <h3 className="artisan-name">{nom}</h3>
          
          <div className="artisan-rating">
            <StarRating rating={note} size="small" showValue={false} />
            <span className="rating-text">{note}/5</span>
          </div>
          
          <div className="artisan-specialite">
            {specialite?.nom}
          </div>
          
          <div className="artisan-location">
            <svg width="12" height="12" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
            </svg>
            {ville}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ArtisanCard;