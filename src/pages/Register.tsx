// src/pages/Register.tsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user, register } = useAuth();
  const navigate = useNavigate();

  if (user) return <Navigate to="/" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(name, password);
      navigate("/");
    } catch (err) {
      setError("Utilisateur déjà existant");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Nouveau joueur</h1>

      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Nom"
        required
      />

      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Mot de passe"
        required
      />

      <button type="submit">Créer un compte</button>

      <p>
        Déjà un joueur ?{" "}
        <Link to="/login">Se connecter</Link>
      </p>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
