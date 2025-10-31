const { Specialite, Categorie, Artisan } = require('../models');
const createError = require('../middlewares/error');

// Récupérer toutes les spécialités
exports.getAllSpecialites = async (req, res, next) => {
  try {
    const specialites = await Specialite.findAll({
      include: [{
        model: Categorie,
        as: 'categorie',
        attributes: ['id', 'nom']
      }],
      order: [['nom', 'ASC']]
    });
    res.status(200).json(specialites);
  } catch (error) {
    next(createError(500, "Erreur lors de la récupération des spécialités", error.message));
  }
};

// Récupérer les spécialités d'une catégorie
exports.getSpecialitesByCategorie = async (req, res, next) => {
  try {
    const specialites = await Specialite.findAll({
      where: { categorie_id: req.params.categorieId },
      include: [{
        model: Categorie,
        as: 'categorie',
        attributes: ['id', 'nom']
      }],
      order: [['nom', 'ASC']]
    });

    res.status(200).json(specialites);
  } catch (error) {
    next(createError(500, "Erreur lors de la récupération des spécialités", error.message));
  }
};

// Récupérer une spécialité par ID
exports.getSpecialite = async (req, res, next) => {
  try {
    const specialite = await Specialite.findByPk(req.params.id, {
      include: [{
        model: Categorie,
        as: 'categorie',
        attributes: ['id', 'nom']
      }]
    });

    if (!specialite) {
      return next(createError(404, "Spécialité non trouvée"));
    }

    res.status(200).json(specialite);
  } catch (error) {
    next(createError(500, "Erreur lors de la récupération de la spécialité", error.message));
  }
};
