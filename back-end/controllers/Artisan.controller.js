const { Artisan, Specialite, Categorie } = require('../models');
const { Op } = require('sequelize');
const createError = require('../middlewares/error');

// Récupérer tous les artisans
exports.getAllArtisans = async (req, res, next) => {
  try {
    const artisans = await Artisan.findAll({
      include: [{
        model: Specialite,
        as: 'specialite',
        attributes: ['id', 'nom'],
        include: [{
          model: Categorie,
          as: 'categorie',
          attributes: ['id', 'nom']
        }]
      }],
      order: [['nom', 'ASC']]
    });
    res.status(200).json(artisans);
  } catch (error) {
    next(createError(500, "Erreur lors de la récupération des artisans", error.message));
  }
};

// Récupérer un artisan par ID
exports.getArtisan = async (req, res, next) => {
  try {
    const artisan = await Artisan.findByPk(req.params.id, {
      include: [{
        model: Specialite,
        as: 'specialite',
        attributes: ['id', 'nom'],
        include: [{
          model: Categorie,
          as: 'categorie',
          attributes: ['id', 'nom']
        }]
      }]
    });

    if (!artisan) {
      return next(createError(404, "Artisan non trouvé"));
    }

    res.status(200).json(artisan);
  } catch (error) {
    next(createError(500, "Erreur lors de la récupération de l'artisan", error.message));
  }
};

// Récupérer les artisans par catégorie
exports.getArtisansByCategorie = async (req, res, next) => {
  try {
    const artisans = await Artisan.findAll({
      include: [{
        model: Specialite,
        as: 'specialite',
        attributes: ['id', 'nom'],
        where: {
          categorie_id: req.params.categorieId
        },
        include: [{
          model: Categorie,
          as: 'categorie',
          attributes: ['id', 'nom']
        }]
      }],
      order: [['note', 'DESC'], ['nom', 'ASC']]
    });

    res.status(200).json(artisans);
  } catch (error) {
    next(createError(500, "Erreur lors de la récupération des artisans", error.message));
  }
};

// Récupérer les artisans du mois (top = true)
exports.getArtisansDuMois = async (req, res, next) => {
  try {
    const artisans = await Artisan.findAll({
      where: { top: true },
      include: [{
        model: Specialite,
        as: 'specialite',
        attributes: ['id', 'nom'],
        include: [{
          model: Categorie,
          as: 'categorie',
          attributes: ['id', 'nom']
        }]
      }],
      order: [['note', 'DESC']],
      limit: 3
    });

    res.status(200).json(artisans);
  } catch (error) {
    next(createError(500, "Erreur lors de la récupération des artisans du mois", error.message));
  }
};

// Rechercher des artisans par nom
exports.searchArtisans = async (req, res, next) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return next(createError(400, "Le paramètre de recherche est requis"));
    }

    const artisans = await Artisan.findAll({
      where: {
        nom: {
          [Op.like]: `%${query}%`
        }
      },
      include: [{
        model: Specialite,
        as: 'specialite',
        attributes: ['id', 'nom'],
        include: [{
          model: Categorie,
          as: 'categorie',
          attributes: ['id', 'nom']
        }]
      }],
      order: [['note', 'DESC'], ['nom', 'ASC']]
    });

    res.status(200).json(artisans);
  } catch (error) {
    next(createError(500, "Erreur lors de la recherche d'artisans", error.message));
  }
};
