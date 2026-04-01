# blog-api-inf222

## 📝 Blog API Backend - TAF1 INF222
## Projet de Développement Backend (Programmation Web) 
### Réalisé par Samira Aoudou, 
### Étudiante en Licence 2 Informatique Fondamentale à l'Université de Yaoundé 1.

 ## Description
 
Cette API REST complète permet la gestion d'un système de blog. Elle offre des fonctionnalités CRUD (Create, Read, Update, Delete) pour manipuler des articles comprenant : titre, contenu, auteur, catégorie, tags et métadonnées temporelles.
Le projet a été conçu avec une architecture modulaire pour garantir la maintenabilité et la sécurité des données.

 ## Technologies Utilisées
 
| Technologie        | Version    | Rôle                    |
| ------------------ | ---------- | ----------------------- |
| Node.js            | v[version] | Runtime JavaScript      |
| Express.js         | v4    | Framework web           |
| better-sqlite3     | v9      | Base de données SQLite  |
| swagger-jsdoc      | v6       | Génération spec OpenAPI |
| swagger-ui-express | v5 | Interface Swagger       |

## Installation et Lancement

1. Prérequis
   
Assurez-vous d'avoir installé Node.js et npm sur votre machine.

3. Configuration
   
## Cloner le dépôt

```bash
git clone https://github.com/samiraaoudou91-droid/blog-api-inf222
cd blog-api-inf222
```

## Installer les dépendances
```bash
npm install
```

3. Exécution
   
-Mode Production :
```bash
npm start
```
-Mode Développement (nodemon) :
```bash
npm run dev
```
Le serveur sera accessible sur : http://localhost:3000

## Structure du Projet

L'architecture suit le modèle MVC (Modèle-Vue-Contrôleur) pour une séparation claire des responsabilités :

```
blog-api/
├── server.js              (Point d'entrée)
├── package.json           (Dépendances)
├── README.md              (Documentation)
├── database/db.js         (Connexion SQLite)
├── models/articleModel.js (Requêtes SQL)
├── controllers/articleController.js (Logique métier)
├── middleware/validateArticle.js (Validation)
├── routes/articleRoutes.js (Endpoints)
└── swagger/swagger.js     (Configuration Swagger)
```

 Documentation de l'API
Une interface interactive Swagger est disponible pour tester les routes en temps réel :

-Interface UI :
**http://localhost:3000/api-docs**

-Spécification JSON :
**http://localhost:3000/swagger.json**



 ## Endpoints Principaux

| Méthode | Endpoint             | Description          | Code réponse |
| ------- | -------------------- | -------------------- | ------------ |
| POST    | /api/articles        | Créer un article     | 201 / 400    |
| GET     | /api/articles        | Liste (avec filtres) | 200          |
| GET     | /api/articles/:id    | Un article par ID    | 200 / 404    |
| PUT     | /api/articles/:id    | Modifier un article  | 200 / 404    |
| DELETE  | /api/articles/:id    | Supprimer un article | 200 / 404    |
| GET     | /api/articles/search | Recherche full-text  | 200 / 400    | 

## Exemple de corps de requête (POST/PUT)
```bash
JSON
{
  "titre": "Développement Backend au Cameroun",
  "contenu": "Exploration des technologies utilisées à l'UY1...",
  "auteur": "Samira Aoudou",
  "categorie": "Technologie",
  "tags": ["node", "sqlite", "informatique"]
}
```

 ## Documentation Swagger
La documentation interactive est disponible à l'adresse suivante une fois le serveur lancé :
**http://localhost:3000/api-docs**


 ## Validation & Codes HTTP
 
L'API implémente des règles strictes pour garantir l'intégrité des données :
```
-200 OK / 210 Created : Succès de l'opération.
-400 Bad Request : Données invalides (ex: Titre < 3 caractères).
-404 Not Found : Article inexistant.
-500 Internal Error : Problème serveur ou base de données.
```

## Contexte Académique

Ce travail est soumis dans le cadre de l'unité d'enseignement INF222 (Développement Backend).

   ### Encadreur : Charles Njiosseu, PhD Student
   ### Institution : Université de Yaoundé 1 (UY1)
	 

 ## Licence
Ce projet est sous licence MIT.

  ### Auteur : Samira Aoudou - Matricule_24G2715 - Licence 2 Informatique Fondamentale.



