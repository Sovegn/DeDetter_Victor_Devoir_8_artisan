const { DataTypes } = require('sequelize');
const db = require('../config/db');


const Specialite = db.define('Specialite', {
  nom: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  categorie_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'categories',
      key: 'id'
    }
  }
}, {
  tableName: 'specialites',
  timestamps: true,
  underscored: true,
  indexes: [
    {
      unique: true,
      fields: ['nom', 'categorie_id']
    }
  ]
});

module.exports = Specialite;