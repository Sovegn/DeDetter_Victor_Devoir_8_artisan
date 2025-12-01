const dotenv = require('dotenv');
dotenv.config();

const ENV = {
  // SERVER
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',

  // MySQL (Railway OR Local)
  DATABASE: process.env.MYSQLDATABASE || process.env.DATABASE,
  USER: process.env.MYSQLUSER || process.env.DB_USER,
  PASSWORD: process.env.MYSQLPASSWORD || process.env.PASSWORD,
  HOST: process.env.MYSQLHOST || process.env.HOST || 'localhost',
  PORT_DATABASE: process.env.MYSQLPORT || process.env.PORT_DATABASE || 3306,
  DIALECT: 'mysql',

  // Security token
  TOKEN: process.env.TOKEN,

  // EMAIL SMTP
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: process.env.EMAIL_PORT,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
  EMAIL_FROM: process.env.EMAIL_FROM
};

module.exports = ENV;
