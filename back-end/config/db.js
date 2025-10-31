const { Sequelize } = require('sequelize');
const ENV = require('./index');

console.log(' Initialisation de la connexion à MySQL...');

const db = new Sequelize(ENV.DATABASE, ENV.USER, ENV.PASSWORD, {
  host: ENV.HOST,
  dialect: ENV.DIALECT,
  port: ENV.PORT_DATABASE,
  logging: false,
  timezone: '+01:00',
  define: {
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const connection = async () => {
  try {
    console.log('Tentative de connexion à la base de données...');
    await db.authenticate();
    console.log(' Connexion réussie à MySQL.');
  } catch (error) {
    console.error(`Erreur de connexion : `, error.message);
    process.exit(1);
  }
};

connection();

module.exports = db;