// middleware/validateArticle.js

function validateArticle(req, res, next) {
  const { titre, contenu, auteur } = req.body;
  const errors = [];

  // Vérification titre
  if (!titre || typeof titre !== 'string' || titre.trim().length === 0) {
    errors.push('Le titre est obligatoire et ne peut pas être vide');
  } else if (titre.trim().length < 3) {
    errors.push('Le titre doit contenir au moins 3 caractères');
  } else if (titre.trim().length > 255) {
    errors.push('Le titre ne peut pas dépasser 255 caractères');
  }

  // Vérification contenu
  if (!contenu || typeof contenu !== 'string' || contenu.trim().length === 0) {
    errors.push('Le contenu est obligatoire et ne peut pas être vide');
  } else if (contenu.trim().length < 10) {
    errors.push('Le contenu doit contenir au moins 10 caractères');
  }

  // Vérification auteur
  if (!auteur || typeof auteur !== 'string' || auteur.trim().length === 0) {
    errors.push('L\'auteur est obligatoire et ne peut pas être vide');
  } else if (auteur.trim().length < 2) {
    errors.push('Le nom de l\'auteur doit contenir au moins 2 caractères');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Données de l\'article invalides',
      errors: errors
    });
  }

  next();
}

module.exports = validateArticle;