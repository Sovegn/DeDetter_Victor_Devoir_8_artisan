import axios from 'axios';

// Configuration de base de l'API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour les erreurs
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erreur API:', error);
    return Promise.reject(error);
  }
);

// Services API
export const categorieService = {
  // Récupérer toutes les catégories
  getAllCategories: () => apiClient.get('/categorie/all'),
  
  // Récupérer une catégorie par ID
  getCategorie: (id) => apiClient.get(`/categorie/get/${id}`),
};

export const specialiteService = {
  // Récupérer toutes les spécialités
  getAllSpecialites: () => apiClient.get('/specialite/all'),
  
  // Récupérer les spécialités d'une catégorie
  getSpecialitesByCategorie: (categorieId) => apiClient.get(`/specialite/categorie/${categorieId}`),
  
  // Récupérer une spécialité par ID
  getSpecialite: (id) => apiClient.get(`/specialite/get/${id}`),
};

export const artisanService = {
  // Récupérer tous les artisans
  getAllArtisans: () => apiClient.get('/artisan/all'),
  
  // Récupérer un artisan par ID
  getArtisan: (id) => apiClient.get(`/artisan/get/${id}`),
  
  // Récupérer les artisans par catégorie
  getArtisansByCategorie: (categorieId) => apiClient.get(`/artisan/categorie/${categorieId}`),
  
  // Récupérer les artisans du mois
  getArtisansDuMois: () => apiClient.get('/artisan/top'),
  
  // Rechercher des artisans
  searchArtisans: (query) => apiClient.get(`/artisan/search?query=${encodeURIComponent(query)}`),
};

export const contactService = {
  // Envoyer un message de contact
  sendContact: (contactData) => apiClient.post('/contact/send', contactData),
};

export default apiClient;