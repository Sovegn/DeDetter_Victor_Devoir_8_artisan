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

// MIDDLEWARE
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Configuration CORS sécurisée
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://trouve-ton-artisan.auvergnerhonealpes.fr']
    : ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(cookieParser());

// En-têtes de sécurité
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'none'; object-src 'none';");
  next();
});

// Limitation du taux de requêtes simplifiée
const requestCounts = new Map();
app.use((req, res, next) => {
  const clientIP = req.ip || req.connection.remoteAddress || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 100;

  if (!requestCounts.has(clientIP)) {
    requestCounts.set(clientIP, []);
  }

  const requests = requestCounts.get(clientIP);
  const recentRequests = requests.filter(time => now - time < windowMs);
  
  if (recentRequests.length >= maxRequests) {
    return res.status(429).json({ 
      error: { 
        status: 429, 
        message: "Trop de requêtes. Veuillez réessayer plus tard." 
      } 
    });
  }

  recentRequests.push(now);
  requestCounts.set(clientIP, recentRequests);
  next();
});

// Route de santé de l'API
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'API Trouve ton artisan fonctionnelle',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Route d'accueil de l'API
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Bienvenue sur l\'API Trouve ton artisan',
    description: 'Plateforme de mise en relation avec les artisans de la région Auvergne-Rhône-Alpes',
    version: '1.0.0',
    endpoints: {
      categories: '/api/categorie/all',
      specialites: '/api/specialite/all',
      artisans: '/api/artisan/all',
      artisans_du_mois: '/api/artisan/top',
      recherche: '/api/artisan/search?query=nom',
      contact: '/api/contact/send'
    },
    contact: {
      region: 'Auvergne-Rhône-Alpes',
      adresse: '101 cours Charlemagne, CS 20033, 69269 LYON CEDEX 02',
      telephone: '+33 (0)4 26 73 40 00'
    }
  });
});

// PRÉFIXES DES ROUTES
app.use('/api/categorie', categorieRouter);
app.use('/api/specialite', specialiteRouter);
app.use('/api/artisan', artisanRouter);
app.use('/api/contact', contactRouter);

// Route 404
app.use('*', (req, res) => {
  res.status(404).json({
    error: {
      status: 404,
      message: "Endpoint non trouvé",
      details: `La route ${req.originalUrl} n'existe pas sur cette API`
    }
  });
});

// MIDDLEWARE DE GESTION D'ERREURS
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Une erreur est survenue.";
  const details = err.details || null;

  if (process.env.NODE_ENV !== 'production') {
    console.error('❌ Erreur serveur:', {
      status,
      message,
      details,
      stack: err.stack,
      url: req.originalUrl,
      method: req.method
    });
  }

  res.status(status).json({
    error: {
      status,
      message,
      ...(details && { details }),
      ...(process.env.NODE_ENV !== 'production' && { timestamp: new Date().toISOString() })
    }
  });
});

// DÉMARRAGE DU SERVEUR
const startServer = async () => {
  try {
    await db.authenticate();
    console.log('✅ Connexion à la base de données confirmée !');

    await db.sync({ force: false });
    console.log('✅ Base de données synchronisée avec succès !');

    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
      console.log(`📖 Documentation API disponible sur http://localhost:${PORT}`);
      console.log(`💚 Santé de l'API : http://localhost:${PORT}/health`);
      console.log('🎯 Endpoints principaux :');
      console.log(`   • Catégories : http://localhost:${PORT}/api/categorie/all`);
      console.log(`   • Artisans : http://localhost:${PORT}/api/artisan/all`);
      console.log(`   • Artisans du mois : http://localhost:${PORT}/api/artisan/top`);
      console.log(`   • Contact : POST http://localhost:${PORT}/api/contact/send`);
    });
  } catch (error) {
    console.error(`❌ Erreur lors du démarrage :`, error.message);
    process.exit(1);
  }
};

// Gestion propre de l'arrêt du serveur
process.on('SIGTERM', async () => {
  console.log('🔄 Arrêt du serveur en cours...');
  try {
    await db.close();
    console.log('✅ Connexion à la base de données fermée.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur lors de la fermeture:', error);
    process.exit(1);
  }
});

process.on('SIGINT', async () => {
  console.log('\n🔄 Arrêt du serveur (Ctrl+C)...');
  try {
    await db.close();
    console.log('✅ Connexion à la base de données fermée.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur lors de la fermeture:', error);
    process.exit(1);
  }
});

startServer();