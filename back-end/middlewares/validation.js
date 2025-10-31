const createError = require('./error');

// Validation des IDs numériques
const validateId = (req, res, next) => {
  const id = parseInt(req.params.id || req.params.categorieId || req.params.artisanId);
  
  if (isNaN(id) || id <= 0) {
    return next(createError(400, "ID invalide. L'ID doit être un nombre entier positif."));
  }
  
  req.params.id = id;
  next();
};

// Validation des paramètres de recherche
const validateSearch = (req, res, next) => {
  const { query } = req.query;
  
  if (!query || typeof query !== 'string') {
    return next(createError(400, "Le paramètre 'query' est requis et doit être une chaîne de caractères."));
  }
  
  if (query.trim().length < 2) {
    return next(createError(400, "Le paramètre de recherche doit contenir au moins 2 caractères."));
  }
  
  if (query.length > 100) {
    return next(createError(400, "Le paramètre de recherche ne peut pas dépasser 100 caractères."));
  }
  
  req.query.query = query.trim();
  next();
};

// Validation du formulaire de contact
const validateContactForm = (req, res, next) => {
  const { artisan_id, nom_expediteur, email_expediteur, objet, message } = req.body;
  
 
  if (!artisan_id || isNaN(parseInt(artisan_id)) || parseInt(artisan_id) <= 0) {
    return next(createError(400, "ID de l'artisan invalide."));
  }
  
  
  if (!nom_expediteur || typeof nom_expediteur !== 'string' || nom_expediteur.trim().length < 2) {
    return next(createError(400, "Le nom est requis et doit contenir au moins 2 caractères."));
  }
  
  if (nom_expediteur.length > 255) {
    return next(createError(400, "Le nom ne peut pas dépasser 255 caractères."));
  }
  
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email_expediteur || !emailRegex.test(email_expediteur)) {
    return next(createError(400, "Email invalide."));
  }
  
  if (email_expediteur.length > 255) {
    return next(createError(400, "L'email ne peut pas dépasser 255 caractères."));
  }
  
  
  if (!objet || typeof objet !== 'string' || objet.trim().length < 5) {
    return next(createError(400, "L'objet est requis et doit contenir au moins 5 caractères."));
  }
  
  if (objet.length > 255) {
    return next(createError(400, "L'objet ne peut pas dépasser 255 caractères."));
  }
  
  
  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    return next(createError(400, "Le message est requis et doit contenir au moins 10 caractères."));
  }
  
  if (message.length > 2000) {
    return next(createError(400, "Le message ne peut pas dépasser 2000 caractères."));
  }
  
  
  req.body.artisan_id = parseInt(artisan_id);
  req.body.nom_expediteur = nom_expediteur.trim();
  req.body.email_expediteur = email_expediteur.trim().toLowerCase();
  req.body.objet = objet.trim();
  req.body.message = message.trim();
  
  next();
};

module.exports = {
  validateId,
  validateSearch,
  validateContactForm
};