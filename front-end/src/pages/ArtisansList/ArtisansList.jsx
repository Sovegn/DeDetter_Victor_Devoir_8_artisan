import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { artisanService, categorieService } from '../../services/api';
import ArtisanCard from '../../components/ArtisanCard/ArtisanCard';
import './ArtisansList.css';

const ArtisansList = () => {
  const [searchParams] = useSearchParams();
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageTitle, setPageTitle] = useState('Artisans');
  
  const categorieId = searchParams.get('categorie');
  const searchQuery = searchParams.get('search');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let response;
        let title = 'Tous les artisans';
        
        if (searchQuery) {
          // Recherche par nom
          response = await artisanService.searchArtisans(searchQuery);
          title = `Résultats pour "${searchQuery}"`;
        } else if (categorieId) {
          // Filtrage par catégorie
          response = await artisanService.getArtisansByCategorie(categorieId);
          
          // Récupérer le nom de la catégorie
          try {
            const categorieResponse = await categorieService.getCategorie(categorieId);
            title = `Artisans - ${categorieResponse.data.nom}`;
          } catch (categorieError) {
            console.error('Erreur lors du chargement de la catégorie:', categorieError);
            title = 'Artisans par catégorie';
          }
        } else {
          // Tous les artisans
          response = await artisanService.getAllArtisans();
          title = 'Tous les artisans';
        }
        
        setArtisans(response.data);
        setPageTitle(title);
        document.title = `${title} - Trouve ton artisan`;
        
      } catch (error) {
        console.error('Erreur lors du chargement des artisans:', error);
        setError('Impossible de charger les artisans');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categorieId, searchQuery]);

  return (
    <main id="main-content" className="artisans-list-page">
      <div className="container-custom">
        <div className="page-header">
          <h1>{pageTitle}</h1>
          {artisans.length > 0 && (
            <p className="results-count">
              {artisans.length} artisan{artisans.length > 1 ? 's' : ''} trouvé{artisans.length > 1 ? 's' : ''}
            </p>
          )}
        </div>

        {loading && (
          <div className="loading-state">
            <p>Chargement des artisans...</p>
          </div>
        )}

        {error && (
          <div className="error-state">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && artisans.length === 0 && (
          <div className="empty-state">
            <h2>Aucun artisan trouvé</h2>
            {searchQuery ? (
              <p>Aucun artisan ne correspond à votre recherche "{searchQuery}".</p>
            ) : (
              <p>Aucun artisan disponible dans cette catégorie pour le moment.</p>
            )}
            <p>
              <a href="/" className="btn-secondary-custom">
                Retour à l'accueil
              </a>
            </p>
          </div>
        )}

        {!loading && !error && artisans.length > 0 && (
          <div className="artisans-grid">
            {artisans.map((artisan) => (
              <ArtisanCard key={artisan.id} artisan={artisan} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default ArtisansList;