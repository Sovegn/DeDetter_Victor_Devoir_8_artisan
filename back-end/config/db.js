const { Sequelize } = require('sequelize');
const ENV = require('./index');

console.log('🔌 Initialisation de la connexion MySQL...');

const db = new Sequelize(ENV.DATABASE, ENV.USER, ENV.PASSWORD, {
  host: ENV.HOST,
  dialect: 'mysql',
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
    console.log('🔍 Tentative de connexion MySQL...');
    await db.authenticate();
    console.log('✅ Connexion MySQL réussie.');
  } catch (error) {
    console.error('❌ Erreur connexion MySQL :', error.message);
    process.exit(1);
  }
};

connection();

module.exports = db;
