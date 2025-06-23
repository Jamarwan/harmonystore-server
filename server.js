// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET = process.env.JWT_SECRET || "dev-secret";

app.use(cors());
app.use(express.json());

// 💾 Données temporaires (à remplacer plus tard par MongoDB)
let paniers = [
  {
    pseudo: "Alice",
    date: "2025-06-22T15:00:00",
    panier: [{ name: "Bol", price: 12, quantity: 2, category: "Céramique" }]
  },
  {
    pseudo: "Bob",
    date: "2025-06-22T16:45:00",
    panier: [{ name: "Vase", price: 25, quantity: 1, category: "Verre" }]
  }
];

// 🔐 Middleware pour sécuriser les routes
function authMiddleware(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token manquant" });

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Token invalide" });
    req.user = decoded;
    next();
  });
}

// 🔑 Route de connexion
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "admin123") {
    const payload = { username }; // ✅ Défini ici
    const token = jwt.sign(payload, SECRET, { expiresIn: "2h" });
    res.json({ token });
  } else {
    res.status(401).json({ error: "Identifiants invalides" });
  }
});

// 📦 Récupérer tous les paniers
app.get("/api/paniers", authMiddleware, (req, res) => {
  res.json(paniers);
});

// 🗑 Supprimer un panier par index
app.delete("/api/panier/:index", authMiddleware, (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < paniers.length) {
    paniers.splice(index, 1);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: "Panier introuvable" });
  }
});

// ♻️ Réinitialiser les paniers
app.delete("/api/paniers-reset", authMiddleware, (req, res) => {
  paniers = [];
  res.json({ message: "Base vidée" });
});

// 🔗 Fichiers statiques (frontend)
app.use(express.static("public"));

// 🔁 Rediriger la racine vers login.html
app.get("/", (req, res) => {
  res.redirect("/login.html");
});

// 🧱 404 personnalisée
app.use((req, res) => {
  res.status(404).sendFile(__dirname + "/public/404.html");
});

// 🚀 Lancement serveur
app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
