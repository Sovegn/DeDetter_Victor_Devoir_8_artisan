const dotenv = require('dotenv');

dotenv.config();

const ENV = {
    PORT: process.env.PORT,
    HOST: process.env.HOST,
    USER: process.env.DB_USER, 
    PASSWORD: process.env.PASSWORD, 
    DATABASE: process.env.DATABASE, 
    DIALECT: process.env.DIALECT, 
    PORT_DATABASE: process.env.PORT_DATABASE,
    TOKEN: process.env.TOKEN,
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_PORT: process.env.EMAIL_PORT,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
    EMAIL_FROM: process.env.EMAIL_FROM
}

module.exports = ENV;