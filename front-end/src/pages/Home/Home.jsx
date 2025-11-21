import React, { useState, useEffect } from 'react';
import { artisanService } from '../../services/api';
import ArtisanCard from '../../components/ArtisanCard/ArtisanCard';
import './Home.scss';

const Home = () => {
  const [artisansDuMois, setArtisansDuMois] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Mettre le titre de la page
    document.title = "Trouve ton artisan - Région Auvergne-Rhône-Alpes";
    
    const fetchArtisansDuMois = async () => {
      try {
        const response = await artisanService.getArtisansDuMois();
        setArtisansDuMois(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des artisans du mois:', error);
        setError('Impossible de charger les artisans du mois');
      } finally {
        setLoading(false);
      }
    };

    fetchArtisansDuMois();
  }, []);

  return (
    <main id="main-content" className="home-page">
      
      <section className="hero-section">
        <div className="container-custom">
          <div className="hero-content">
            <h1>Trouve ton artisan !</h1>
            <p className="hero-subtitle">Avec la région Auvergne-Rhône-Alpes</p>
            <p className="hero-description">
              Découvrez et contactez facilement les artisans qualifiés de votre région. 
              Une plateforme officielle pour tous vos besoins artisanaux.
            </p>
          </div>
        </div>
      </section>

      {/* Section Comment trouver mon artisan */}
      <section className="how-to-section section-bg">
        <div className="container-custom">
          <h2>Comment trouver mon artisan ?</h2>
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Choisir la catégorie d'artisanat dans le menu</h3>
                <p>Sélectionnez le domaine qui correspond à vos besoins parmi nos quatre catégories principales.</p>
              </div>
            </div>
            
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Choisir un artisan</h3>
                <p>Parcourez la liste des professionnels qualifiés et consultez leurs profils détaillés.</p>
              </div>
            </div>
            
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Le contacter via le formulaire de contact</h3>
                <p>Remplissez le formulaire de contact pour exposer votre projet ou demander un devis.</p>
              </div>
            </div>
            
            <div className="step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Une réponse sera apportée sous 48h</h3>
                <p>L'artisan vous contactera rapidement pour discuter de votre projet et vous fournir les informations demandées.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Artisans du mois */}
      <section className="featured-artisans">
        <div className="container-custom">
          <h2>Les artisans du mois</h2>
          
          {loading && (
            <div className="loading-state">
              <p>Chargement des artisans du mois...</p>
            </div>
          )}
          
          {error && (
            <div className="error-state">
              <p>{error}</p>
            </div>
          )}
          
          {!loading && !error && artisansDuMois.length > 0 && (
            <div className="artisans-grid">
              {artisansDuMois.map((artisan) => (
                <ArtisanCard 
                  key={artisan.id} 
                  artisan={artisan} 
                  className="compact"
                />
              ))}
            </div>
          )}
          
          {!loading && !error && artisansDuMois.length === 0 && (
            <div className="empty-state">
              <p>Aucun artisan du mois disponible pour le moment.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Home;