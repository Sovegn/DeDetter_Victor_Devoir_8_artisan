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

-- Insertion des catégories
INSERT INTO categories (nom) VALUES 
('Bâtiment'),
('Services'),
('Fabrication'),
('Alimentation');

-- Insertion des spécialités
INSERT INTO specialites (nom, categorie_id) VALUES 
-- Spécialités Bâtiment
('Electricien', (SELECT id FROM categories WHERE nom = 'Bâtiment')),
('Menuisier', (SELECT id FROM categories WHERE nom = 'Bâtiment')),
('Plombier', (SELECT id FROM categories WHERE nom = 'Bâtiment')),
('Bijoutier', (SELECT id FROM categories WHERE nom = 'Bâtiment')),
-- Spécialités Services
('Coiffeur', (SELECT id FROM categories WHERE nom = 'Services')),
('Fleuriste', (SELECT id FROM categories WHERE nom = 'Services')),
('Toiletteur', (SELECT id FROM categories WHERE nom = 'Services')),
('Webdesign', (SELECT id FROM categories WHERE nom = 'Services')),
-- Spécialités Fabrication
('Couturier', (SELECT id FROM categories WHERE nom = 'Fabrication')),
('Ferronnier', (SELECT id FROM categories WHERE nom = 'Fabrication')), 
-- Spécialités Alimentation
('Boucher', (SELECT id FROM categories WHERE nom = 'Alimentation')),
('Boulanger', (SELECT id FROM categories WHERE nom = 'Alimentation')),
('Chocolatier', (SELECT id FROM categories WHERE nom = 'Alimentation')),
('Traiteur', (SELECT id FROM categories WHERE nom = 'Alimentation')),
('Charcutier', (SELECT id FROM categories WHERE nom = 'Alimentation'));

-- Insertion des artisans basée sur les données fournies
INSERT INTO artisans (nom, specialite_id, note, ville, apropos, email, site_web, top) VALUES 
-- Alimentation
('Boucherie Dumont', 
 (SELECT id FROM specialites WHERE nom = 'Boucher'), 
 4.5, 'Lyon', 
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et', 
 'boucherie.dumont@gmail.com', 
 NULL, 
 FALSE),
('Au pain chaud', 
 (SELECT id FROM specialites WHERE nom = 'Boulanger'), 
 4.8, 'Montélimar', 
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et', 
 'au-pain-chaud@gmail.com', 
 NULL, 
 TRUE),
('Chocolaterie Labbé', 
 (SELECT id FROM specialites WHERE nom = 'Chocolatier'), 
 4.9, 'Lyon', 
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et', 
 'chocolaterie-labbe@gmail.com', 
 'https://chocolaterie-labbe.fr', 
 TRUE),
('Traiteur Truchon', 
 (SELECT id FROM specialites WHERE nom = 'Traiteur'), 
 4.1, 'Lyon', 
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et', 
 'contact@truchon-traiteur.fr', 
 'https://truchon-traiteur.fr', 
 FALSE),
('Orville Salmons', 
 (SELECT id FROM specialites WHERE nom = 'Charcutier'), 
 5.0, 'Evian', 
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et', 
 'orville.salmons@gmail.com', 
 NULL, 
 TRUE),
-- Bâtiment
('Mont Blanc Electricité', 
 (SELECT id FROM specialites WHERE nom = 'Electricien'), 
 4.5, 'Chamonix', 
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et', 
 'contact@mont-blanc-electricite.com', 
 'https://mont-blanc-electricite.com', 
 FALSE),
('Boutot & fils', 
 (SELECT id FROM specialites WHERE nom = 'Menuisier'), 
 4.7, 'Bourg-en-bresse', 
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et', 
 'boutot-menuiserie@gmail.com', 
 'https://boutot-menuiserie.com', 
 FALSE),
('Vadis Bellendre', 
 (SELECT id FROM specialites WHERE nom = 'Plombier'), 
 4.0, 'Vienne', 
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et', 
 'v.bellendre@gmail.com', 
 'https://plomberie-bellendre.com', 
 FALSE),
('Claude Quinn', 
 (SELECT id FROM specialites WHERE nom = 'Bijoutier'), 
 4.2, 'Aix-les-bains', 
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et', 
 'claude.quinn@gmail.com', 
 NULL, 
 FALSE),
-- Fabrication
('Amjée Lécuyer', 
 (SELECT id FROM specialites WHERE nom = 'Couturier'), 
 4.5, 'Annecy', 
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et', 
 'a.amjee@hotmail.com', 
 'https://lecuyer-couture.com', 
 FALSE),
('Ernest Carignan', 
 (SELECT id FROM specialites WHERE nom = 'Ferronnier'), 
 5.0, 'Le Puy-en-Velay', 
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et', 
 'e.carignan@hotmail.com', 
 NULL, 
 FALSE),
-- Services
('Royden Charbonneau', 
 (SELECT id FROM specialites WHERE nom = 'Coiffeur'), 
 3.8, 'Saint-Etienne', 
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et', 
 'r.charbonneau@gmail.com', 
 NULL, 
 FALSE),
('Leala Dennis', 
 (SELECT id FROM specialites WHERE nom = 'Coiffeur'), 
 3.8, 'Chambéry', 
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et', 
 'l.dennis@hotmail.fr', 
 'https://coiffure-leala-chambery.fr', 
 FALSE),
('C''est sup''hair', 
 (SELECT id FROM specialites WHERE nom = 'Coiffeur'), 
 4.1, 'Romans-sur-Isère', 
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et', 
 'sup-hair@gmail.com', 
 'https://sup-hair.fr', 
 FALSE),
('Le monde des fleurs', 
 (SELECT id FROM specialites WHERE nom = 'Fleuriste'), 
 4.6, 'Annonay', 
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et', 
 'contact@le-monde-des-fleurs-annonay.fr', 
 'https://le-monde-des-fleurs-annonay.fr', 
 FALSE),
('Valérie Laderoute', 
 (SELECT id FROM specialites WHERE nom = 'Toiletteur'), 
 4.5, 'Valence', 
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et', 
 'v.laderoute@gmail.com', 
 NULL, 
 FALSE),
('CM Graphisme', 
 (SELECT id FROM specialites WHERE nom = 'Webdesign'), 
 4.4, 'Valence', 
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et', 
 'contact@cm-graphisme.com', 
 'https://cm-graphisme.com', 
 FALSE);

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