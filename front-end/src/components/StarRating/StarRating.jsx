import React from 'react';
import './StarRating.scss';

const StarRating = ({ rating, maxRating = 5, showValue = true, size = 'medium' }) => {
  const stars = [];
  const roundedRating = Math.round(rating * 2) / 2; // Arrondi au demi
  
  for (let i = 1; i <= maxRating; i++) {
    let starType = 'empty';
    if (roundedRating >= i) {
      starType = 'full';
    } else if (roundedRating >= i - 0.5) {
      starType = 'half';
    }
    
    stars.push(
      <span key={i} className={`star star-${starType} star-${size}`} aria-hidden="true">
        {starType === 'full' && '★'}
        {starType === 'half' && '☆'}
        {starType === 'empty' && '☆'}
      </span>
    );
  }

  return (
    <div className="star-rating" role="img" aria-label={`Note: ${rating} sur ${maxRating}`}>
      <div className="stars-container">
        {stars}
      </div>
      {showValue && (
        <span className="rating-value" aria-hidden="true">
          {rating}/5
        </span>
      )}
      <span className="sr-only">
        Note: {rating} étoiles sur {maxRating}
      </span>
    </div>
  );
};

export default StarRating;