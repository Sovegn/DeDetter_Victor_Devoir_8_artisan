const { DataTypes } = require('sequelize');
const db = require('../config/db');


const MessageContact = db.define('MessageContact', {
  artisan_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'artisans',
      key: 'id'
    }
  },
  nom_expediteur: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email_expediteur: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  objet: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  date_envoi: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  statut: {
    type: DataTypes.ENUM('nouveau', 'lu', 'traite'),
    allowNull: false,
    defaultValue: 'nouveau'
  }
}, {
  tableName: 'messages_contact',
  timestamps: false, 
  underscored: true,
  indexes: [
    { fields: ['artisan_id'] },
    { fields: ['date_envoi'] },
    { fields: ['statut'] }
  ]
});

module.exports = MessageContact;