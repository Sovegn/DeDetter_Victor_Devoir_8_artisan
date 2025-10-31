const { DataTypes } = require('sequelize');
const db = require('../config/db');


const Categorie = db.define('Categorie', {
  nom: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'categories',
  timestamps: true,
  underscored: true,
});

module.exports = Categorie;