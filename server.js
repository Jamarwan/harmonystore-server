// server.js
require("dotenv").config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const SECRET = 'ma_super_cle_secrete'; // À stocker dans une variable d'environnement en production

app.use(cors());
app.use(bodyParser.json());

// Exemple de données privées
let paniers = [
  { pseudo: 'Alice', date: '2025-06-22T15:00:00', panier: [{ name: 'Bol', price: 12, quantity: 2, category: 'Céramique' }] },
  { pseudo: 'Bob', date: '2025-06-22T16:45:00', panier: [{ name: 'Vase', price: 25, quantity: 1, category: 'Verre' }] },
];

// Middleware de vérification de token
function authMiddleware(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token manquant' });

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Token invalide' });
    req.user = decoded;
    next();
  });
}

// Route d’authentification
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  // À remplacer par une vraie base de données
  if (username === 'admin' && password === 'admin123') {
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });
    jwt.verify(token, process.env.JWT_SECRET);
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Identifiants invalides' });
  }
});

// Routes protégées
app.get('/api/paniers', authMiddleware, (req, res) => {
  res.json(paniers);
});

app.delete('/api/panier/:index', authMiddleware, (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < paniers.length) {
    paniers.splice(index, 1);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Panier introuvable' });
  }
});

app.delete('/api/paniers-reset', authMiddleware, (req, res) => {
  paniers = [];
  res.json({ message: 'Base vidée' });
});

app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
