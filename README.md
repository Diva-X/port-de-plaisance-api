Port de Plaisance API

Cette API RESTful a été développée avec Node.js, Express et MongoDB Atlas.
Elle permet la gestion des utilisateurs et des réservations de catways dans un port de plaisance.

Fonctionnalités principales
	•	CRUD complet sur les utilisateurs
	•	Authentification sécurisée avec JWT (stockage en cookie HttpOnly)
	•	CRUD complet sur les réservations
	•	Validation avancée : impossibilité de réserver dans le passé et impossibilité de chevauchement sur un même catway
	•	Architecture en couches (routes, services, controllers, middlewares, models)
	•	Tests de performance avec Autocannon et analyse avec Clinic.js
	•	Déploiement sur Render

Prérequis
	•	Node.js version 18 ou supérieure
	•	Un cluster MongoDB Atlas

Installation
Cloner le projet et installer les dépendances :

git clone https://github.com/Diva-X/port-de-plaisance-api.git
cd port-de-plaisance-api
npm install

Configuration
Créer un fichier .env à la racine du projet en vous basant sur le fichier fourni .env.example.
Exemple de configuration :

NODE_ENV=development
DEBUG=app:*
MONGODB_URI=votre_url_mongodb
SESSION_SECRET=une_chaine_secrete_pour_les_sessions
JWT_SECRET=une_chaine_secrete_pour_les_jwt

Lancement

Mode développement :
npm run dev

Mode production :
npm start

L’API est alors accessible sur http://localhost:3000.

Endpoints principaux

Utilisateurs
	•	PUT /users/add : créer un utilisateur
	•	POST /users/authenticate : authentifier un utilisateur
	•	GET /users/:id : récupérer un utilisateur par ID (authentification requise)
	•	PATCH /users/:id : mettre à jour un utilisateur (authentification requise)
	•	DELETE /users/:id : supprimer un utilisateur (authentification requise)

Réservations
	•	POST /reservations : créer une réservation
	•	GET /reservations : lister toutes les réservations
	•	GET /reservations/:id : récupérer une réservation par ID
	•	PATCH /reservations/:id : mettre à jour une réservation
	•	DELETE /reservations/:id : supprimer une réservation

Déploiement

L’API est déployée sur Render.
Un endpoint de santé est disponible à l’adresse /health pour vérifier l’état du service.

# Création d’un utilisateur
curl -i -X PUT http://localhost:3000/users/add \
  -H "Content-Type: application/json" \
  -d '{"email":"bob@example.com","password":"Bob12345!","name":"Bob"}'

# Authentification
curl -i -c cookies.txt -X POST http://localhost:3000/users/authenticate \
  -H "Content-Type: application/json" \
  -d '{"email":"bob@example.com","password":"Bob12345!"}'

# Récupération d’un utilisateur (auth requise)
curl -i -b cookies.txt http://localhost:3000/users/<ID>

# Création d’une réservation
curl -i -X POST http://localhost:3000/reservations \
  -H "Content-Type: application/json" \
  -d '{"catwayNumber":3,"clientName":"Alice","boatName":"Boat","startDate":"2025-09-12","endDate":"2025-09-20"}'
