const { Categorie, Specialite } = require('../models');
const createError = require('../middlewares/error');

// Récupérer toutes les catégories
exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Categorie.findAll({
      include: [{
        model: Specialite,
        as: 'specialites',
        attributes: ['id', 'nom']
      }],
      order: [['nom', 'ASC']]
    });
    res.status(200).json(categories);
  } catch (error) {
    next(createError(500, "Erreur lors de la récupération des catégories", error.message));
  }
};

// Récupérer une catégorie par ID
exports.getCategorie = async (req, res, next) => {
  try {
    const categorie = await Categorie.findByPk(req.params.id, {
      include: [{
        model: Specialite,
        as: 'specialites',
        attributes: ['id', 'nom']
      }]
    });

    if (!categorie) {
      return next(createError(404, "Catégorie non trouvée"));
    }

    res.status(200).json(categorie);
  } catch (error) {
    next(createError(500, "Erreur lors de la récupération de la catégorie", error.message));
  }
};
