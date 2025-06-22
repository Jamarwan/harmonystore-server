const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const session = require("express-session");

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, "paniers.json");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public")); // Pour servir HTML/CSS/JS

// 🧠 Sessions pour login admin
app.use(session({
  secret: "harmonySecret123", // change-moi en prod
  resave: false,
  saveUninitialized: true
}));

// 🔐 Middleware de protection
function checkAuth(req, res, next) {
  if (req.session && req.session.authenticated) return next();
  res.redirect("/login.html");
}

// 🌱 Initialise le fichier paniers
if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]");

// ➕ Enregistrement panier
app.post("/api/panier", (req, res) => {
  const { pseudo, panier } = req.body;
  if (!pseudo || !Array.isArray(panier)) return res.status(400).json({ message: "Données invalides" });

  const newEntry = { pseudo, panier, date: new Date().toISOString() };
  const data = JSON.parse(fs.readFileSync(DATA_FILE));
  data.push(newEntry);
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  res.status(201).json({ message: "Panier enregistré avec succès" });
});

// 🔐 Page admin protégée
app.get("/admin.html", checkAuth, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin.html"));
});

// 🔑 Page login
app.get("/login.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// 🧾 API des paniers protégée
app.get("/api/paniers", checkAuth, (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE));
    res.json(data);
  } catch {
    res.status(500).json({ message: "Erreur lecture panier" });
  }
});

// 🧠 Traitement connexion admin
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "admin123") {
    req.session.authenticated = true;
    res.redirect("/admin.html");
  } else {
    res.send("<h3>❌ Identifiants invalides</h3><a href='/login.html'>↩️ Revenir</a>");
  }
});

// 🚪 Déconnexion
app.get("/logout", (req, res) => {
  req.session.destroy(() => res.redirect("/login.html"));
});

// 🚀 Lancement
app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
