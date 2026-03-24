// models/articleModel.js

const db = require('../database/db');

const articleModel = {

  // ─────────────────────────────────────────────
  // CRÉER un article
  // ─────────────────────────────────────────────
  creer(articleData) {
    const { titre, contenu, auteur, date, categorie, tags } = articleData;

    const stmt = db.prepare(`
      INSERT INTO articles (titre, contenu, auteur, date, categorie, tags)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    // Les '?' sont des paramètres sécurisés (évite les injections SQL)
    const resultat = stmt.run(
      titre.trim(),
      contenu.trim(),
      auteur.trim(),
      date || new Date().toISOString().split('T')[0], // date du jour si non fournie
      categorie ? categorie.trim() : '',
      tags ? tags.trim() : ''
    );

    // Retourne l'article créé avec son nouvel ID
    return this.trouverParId(resultat.lastInsertRowid);
  },

  // ─────────────────────────────────────────────
  // LIRE tous les articles (avec filtres optionnels)
  // ─────────────────────────────────────────────
  trouverTous(filtres = {}) {
    let query = 'SELECT * FROM articles WHERE 1=1';
    const params = [];

    // Filtre par catégorie
    if (filtres.categorie) {
      query += ' AND categorie = ?';
      params.push(filtres.categorie);
    }

    // Filtre par auteur
    if (filtres.auteur) {
      query += ' AND auteur = ?';
      params.push(filtres.auteur);
    }

    // Filtre par date
    if (filtres.date) {
      query += ' AND date = ?';
      params.push(filtres.date);
    }

    query += ' ORDER BY id DESC'; // Les plus récents en premier

    return db.prepare(query).all(...params);
  },

  // ─────────────────────────────────────────────
  // LIRE un article par son ID
  // ─────────────────────────────────────────────
  trouverParId(id) {
    return db.prepare('SELECT * FROM articles WHERE id = ?').get(id);
  },

  // ─────────────────────────────────────────────
  // MODIFIER un article
  // ─────────────────────────────────────────────
  modifier(id, modifications) {
    const { titre, contenu, auteur, categorie, tags } = modifications;

    const stmt = db.prepare(`
      UPDATE articles
      SET titre = ?, contenu = ?, auteur = ?, categorie = ?, tags = ?
      WHERE id = ?
    `);

    const resultat = stmt.run(
      titre.trim(),
      contenu.trim(),
      auteur.trim(),
      categorie ? categorie.trim() : '',
      tags ? tags.trim() : '',
      id
    );

    // changes = nombre de lignes modifiées (0 si article non trouvé)
    if (resultat.changes === 0) return null;

    return this.trouverParId(id);
  },

  // ─────────────────────────────────────────────
  // SUPPRIMER un article
  // ─────────────────────────────────────────────
  supprimer(id) {
    // Vérifie d'abord que l'article existe
    const article = this.trouverParId(id);
    if (!article) return null;

    db.prepare('DELETE FROM articles WHERE id = ?').run(id);
    return article; // Retourne l'article supprimé (pour confirmation)
  },

  // ─────────────────────────────────────────────
  // RECHERCHER dans titre et contenu
  // ─────────────────────────────────────────────
  rechercher(query) {
    // LIKE '%texte%' = contient "texte" n'importe où
    const stmt = db.prepare(`
      SELECT * FROM articles
      WHERE titre LIKE ? OR contenu LIKE ?
      ORDER BY id DESC
    `);

    // Le '%' autour du query = "contient"
    const terme = `%${query}%`;
    return stmt.all(terme, terme);
  }

};

module.exports = articleModel;