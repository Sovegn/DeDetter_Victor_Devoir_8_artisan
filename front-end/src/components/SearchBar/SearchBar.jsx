import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = ({ placeholder = "Rechercher un artisan...", className = "" }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/artisans?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className={`search-bar ${className}`}>
      <form onSubmit={handleSubmit} role="search">
        <div className="search-input-group">
          <label htmlFor="search-input" className="sr-only">
            Rechercher un artisan
          </label>
          <input
            id="search-input"
            type="text"
            className="search-input"
            placeholder={placeholder}
            value={searchQuery}
            onChange={handleInputChange}
            aria-label="Rechercher un artisan par nom"
          />
          <button
            type="submit"
            className="search-button"
            aria-label="Lancer la recherche"
            disabled={!searchQuery.trim()}
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;