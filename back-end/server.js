console.log('🚀 Démarrage du serveur Trouve ton artisan...');

const express = require('express');
const ENV = require('./config');
const { db } = require('./models');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

// IMPORTATIONS DES ROUTES
const categorieRouter = require('./router/categorie.router');
const specialiteRouter = require('./router/specialite.router');
const artisanRouter = require('./router/artisan.router');
const contactRouter = require('./router/contact.router');

// PORT
const PORT = ENV.PORT || 8000;

// CONFIG CORS (LOCAL + RAILWAY)
const allowedOrigins = ENV.NODE_ENV === 'production'
  ? [
      'https://ton-front-production.up.railway.app' // ← 🔥 change dès que ton front a une URL Railway !
    ]
  : ['http://localhost:3000', 'http://localhost:3001'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  optionsSuccessStatus: 200
}));

// MIDDLEWARES
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Sécurité
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Route de santé
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'API opérationnelle',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Routes API
app.use('/api/categorie', categorieRouter);
app.use('/api/specialite', specialiteRouter);
app.use('/api/artisan', artisanRouter);
app.use('/api/contact', contactRouter);

// 404
app.use('*', (req, res) => {
  res.status(404).json({
    error: {
      status: 404,
      message: `Route ${req.originalUrl} introuvable`
    }
  });
});

// LANCEMENT DU SERVEUR
const startServer = async () => {
  try {
    await db.authenticate();
    console.log('🔗 MySQL connecté !');

    await db.sync({ force: false });
    console.log('🗂 Base synchronisée.');

    app.listen(PORT, () => {
      console.log(`⚡ Serveur actif sur : http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Erreur démarrage :', error.message);
    process.exit(1);
  }
};

startServer();
