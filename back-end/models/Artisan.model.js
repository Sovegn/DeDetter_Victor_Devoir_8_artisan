const { DataTypes } = require('sequelize');
const db = require('../config/db');


const Artisan = db.define('Artisan', {
  nom: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  specialite_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'specialites',
      key: 'id'
    }
  },
  note: {
    type: DataTypes.DECIMAL(2, 1),
    allowNull: false,
  },
  ville: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  apropos: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  site_web: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  top: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  tableName: 'artisans',
  timestamps: true,
  underscored: true,
  indexes: [
    { fields: ['nom'] },
    { fields: ['ville'] },
    { fields: ['note'] },
    { fields: ['top'] },
    { fields: ['specialite_id'] }
  ]
});

module.exports = Artisan;