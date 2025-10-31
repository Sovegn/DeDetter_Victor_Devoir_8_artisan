const db = require('../config/db');


const Categorie = require('./Categorie.model');
const Specialite = require('./Specialite.model');
const Artisan = require('./Artisan.model');
const MessageContact = require('./MessageContact.model');




Categorie.hasMany(Specialite, { foreignKey: 'categorie_id', as: 'specialites' });
Specialite.belongsTo(Categorie, { foreignKey: 'categorie_id', as: 'categorie' });


Specialite.hasMany(Artisan, { foreignKey: 'specialite_id', as: 'artisans' });
Artisan.belongsTo(Specialite, { foreignKey: 'specialite_id', as: 'specialite' });


Artisan.hasMany(MessageContact, { foreignKey: 'artisan_id', as: 'messages' });
MessageContact.belongsTo(Artisan, { foreignKey: 'artisan_id', as: 'artisan' });


module.exports = {
  db,
  Categorie,
  Specialite,
  Artisan,
  MessageContact
};