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

 Documentation et pages dynamiques
	•	Documentation OpenAPI : l’API est documentée avec Swagger-UI et disponible à l’adresse :
 /docs
 	•	Pages dynamiques avec EJS :
	•	/ → page d’accueil simple avec titre.
	•	/reservations/view → page dynamique listant toutes les réservations sous forme de tableau.

Déploiement
L’API est déployée sur Render :
https://port-de-plaisance-api-s6k5.onrender.com

Un endpoint de santé est disponible à l’adresse /health pour vérifier l’état du service.

Compte de démonstration
Un compte est déjà créé afin de faciliter les tests de l’API :
	•	Email : prof@test.com
	•	Mot de passe : ProfTest123!

Après authentification via l’endpoint POST /users/authenticate, le serveur retournera un cookie jwt (HttpOnly, Secure, SameSite=Strict) permettant d’accéder aux routes protégées comme :
	•	GET /users/:id
	•	PATCH /users/:id
	•	DELETE /users/:id
 
Note
Je n’ai pas utilisé method-override car mon API REST fonctionne avec des clients capables d’envoyer directement PUT, PATCH et DELETE (ex. Postman, curl). Cet outil est surtout utile pour les formulaires HTML, donc inutile dans ce projet.
