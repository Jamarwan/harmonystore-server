# 🛍️ HarmonyStore Server

Serveur **Node.js/Express** pour l'application admin de gestion e-commerce *HarmonyStore*.  
Ce projet inclut une interface statique responsive, une authentification sécurisée via JWT, une installation PWA, des dashboards interactifs et un export CSV.

---

## 📦 Installation locale

```bash
git clone https://github.com/harmonystore-server/harmonystore-server.git
cd harmonystore-server
npm install


Lancer l'application
npm start

En mode développement (avec redémarrage automatique)
npm run dev
Par défaut, l’application est disponible sur : 👉 http://localhost:3000

Authentification
Le système utilise JSON Web Tokens (JWT) :

L’utilisateur se connecte via login.html

Le serveur génère un token signé avec JWT_SECRET

Le token est stocké côté client et nécessaire pour accéder à admin.html et aux routes sécurisées

Fonctionnalités
🔒 Authentification sécurisée via JWT

📊 Dashboard avec graphiques (Chart.js)

📦 Export des données CSV

🌘 Dark mode et interface responsive

📱 Application PWA installable

🚀 Déploiement Render prêt à l’emploi

🔧 Configuration (.env)
Crée un fichier .env à la racine du projet, basé sur .env.example :
JWT_SECRET=ta-cle-ultra-secrete-ici
PORT=3000

> ⚠️ Ne publie jamais ce fichier — il est ignoré grâce à .gitignore.

📁 Arborescence du projet
harmonystore-server/
├── public/
│   ├── login.html
│   ├── admin.html
│   ├── css/
│   ├── assets/icons/
│   ├── manifest.json
│   └── service-worker.js
├── server.js
├── package.json
├── .gitignore
├── .env.example
├── render.yaml
└── README.md

🚀 Déploiement sur Render
Déploie ton projet en un clic sur Render :


Le fichier render.yaml préconfigure :

Environnement : Node.js

Script build : npm install

Script de démarrage : npm start

Clé JWT_SECRET injectée automatiquement

🧪 Scripts disponibles
npm start       # Lancer l'application en mode production
npm run dev     # Lancer avec nodemon (redémarrage automatique)

🙌 Contribuer
Les contributions sont les bienvenues ! Forke le repo, crée une branche, propose une PR 💡

📄 Licence
Ce projet est sous licence MIT.

---

Et voilà ! Si tu veux, je peux aussi te générer une version anglaise, ou une page de documentation dédiée aux routes backend. Dis-moi ce que tu veux améliorer ou ajouter ✨💼