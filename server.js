const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// 🔐 Login (auth simplifiée)
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  // Ex : admin/admin123 (à remplacer plus tard par une vraie BDD)
  if (username === "admin" && password === "admin123") {
    const payload = { username }; // ✅ corrigé ici
    const secret = process.env.JWT_SECRET || "dev-secret";
    const token = jwt.sign(payload, secret, { expiresIn: "1h" });
    res.json({ token });
  } else {
    res.status(401).json({ error: "Identifiants invalides." });
  }
});

// ✅ Route protégée : paniers
app.get("/api/paniers", (req, res) => {
  const auth = req.headers.authorization;
  const token = auth && auth.split(" ")[1];
  const secret = process.env.JWT_SECRET || "dev-secret";

  if (!token) {
    return res.status(401).json({ error: "Token manquant" });
  }

  try {
    const decoded = jwt.verify(token, secret);

    // Exemples de paniers fictifs (à remplacer par données BDD plus tard)
    const fakePaniers = [
      {
        pseudo: "alice",
        date: new Date(),
        panier: [
          { name: "T-shirt", quantity: 2, price: 15 },
          { name: "Casquette", quantity: 1, price: 10 },
        ],
      },
      {
        pseudo: "bob",
        date: new Date(),
        panier: [
          { name: "Sweat", quantity: 1, price: 35 },
        ],
      },
    ];

    res.json(fakePaniers);
  } catch (err) {
    res.status(403).json({ error: "Token invalide" });
  }
});

// 🚫 Fallback 404 vers ta page personnalisée
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

// 🚀 Démarrage
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});
