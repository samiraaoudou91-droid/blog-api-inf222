const Database = require('better-sqlite3');
const path = require('path');

// Chemin absolu vers le fichier de base de données
// __dirname = dossier actuel (database/)
// On remonte d'un niveau (..) pour aller à la racine du projet
const dbPath = path.join(__dirname, '..', 'blog.db');

// Ouvre (ou crée) la base de données
// Le fichier blog.db sera créé automatiquement s'il n'existe pas
const db = new Database(dbPath);

// Active le mode WAL pour de meilleures performances
db.pragma('journal_mode = WAL');

// Crée la table articles si elle n'existe pas encore
// "IF NOT EXISTS" → ne plante pas si la table existe déjà
db.exec(`
  CREATE TABLE IF NOT EXISTS articles (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    titre     TEXT    NOT NULL,
    contenu   TEXT    NOT NULL,
    auteur    TEXT    NOT NULL,
    date      TEXT    DEFAULT (datetime('now', 'localtime')),
    categorie TEXT    DEFAULT '',
    tags      TEXT    DEFAULT ''
  )
`);

console.log('✅ Base de données SQLite initialisée');

// Exporte l'objet db pour l'utiliser dans les autres fichiers
module.exports = db;