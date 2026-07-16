-- Création de la base de données
CREATE DATABASE IF NOT EXISTS trouve_ton_artisan
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE trouve_ton_artisan;

-- Table des catégories
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des spécialités
CREATE TABLE specialites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    categorie_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (categorie_id) REFERENCES categories(id) ON DELETE CASCADE,
    UNIQUE KEY unique_specialite_categorie (nom, categorie_id)
);

-- Table des artisans
CREATE TABLE artisans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    specialite_id INT NOT NULL,
    note DECIMAL(2,1) NOT NULL CHECK (note >= 0 AND note <= 5),
    ville VARCHAR(100) NOT NULL,
    apropos TEXT,
    email VARCHAR(255) NOT NULL,
    site_web VARCHAR(255),
    image VARCHAR(255),
    top BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (specialite_id) REFERENCES specialites(id) ON DELETE CASCADE,
    INDEX idx_nom (nom),
    INDEX idx_ville (ville),
    INDEX idx_note (note),
    INDEX idx_top (top)
);

-- Table des messages de contact (pour stocker les demandes)
CREATE TABLE messages_contact (
    id INT AUTO_INCREMENT PRIMARY KEY,
    artisan_id INT NOT NULL,
    nom_expediteur VARCHAR(255) NOT NULL,
    email_expediteur VARCHAR(255) NOT NULL,
    objet VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    date_envoi TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    statut ENUM('nouveau', 'lu', 'traite') DEFAULT 'nouveau',
    FOREIGN KEY (artisan_id) REFERENCES artisans(id) ON DELETE CASCADE,
    INDEX idx_artisan_id (artisan_id),
    INDEX idx_date_envoi (date_envoi),
    INDEX idx_statut (statut)
);

-- Création d'un utilisateur API avec des privilèges limités
CREATE USER IF NOT EXISTS 'api_artisan'@'localhost' IDENTIFIED BY '123456';
GRANT SELECT, INSERT ON trouve_ton_artisan.* TO 'api_artisan'@'localhost';
GRANT UPDATE ON trouve_ton_artisan.messages_contact TO 'api_artisan'@'localhost';
FLUSH PRIVILEGES;

-- Création d'index pour optimiser les performances
CREATE INDEX idx_artisan_specialite ON artisans(specialite_id);
CREATE INDEX idx_artisan_nom_ville ON artisans(nom, ville);
CREATE INDEX idx_specialite_categorie ON specialites(categorie_id);
-- (à voir)

-- Vues utiles pour l'API
CREATE VIEW vue_artisans_complets AS
SELECT 
    a.id,
    a.nom,
    a.note,
    a.ville,
    a.apropos,
    a.email,
    a.site_web,
    a.image,
    a.top,
    s.nom as specialite,
    c.nom as categorie
FROM artisans a
JOIN specialites s ON a.specialite_id = s.id
JOIN categories c ON s.categorie_id = c.id;

CREATE VIEW vue_artisans_du_mois AS
SELECT 
    a.id,
    a.nom,
    a.note,
    a.ville,
    s.nom as specialite,
    c.nom as categorie
FROM artisans a
JOIN specialites s ON a.specialite_id = s.id
JOIN categories c ON s.categorie_id = c.id
WHERE a.top = TRUE
ORDER BY a.note DESC
LIMIT 3;