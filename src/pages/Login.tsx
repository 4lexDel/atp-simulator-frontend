// src/pages/Login.tsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { user, loading, login } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (loading) return <p>Loading...</p>;
  if (user) return <Navigate to="/" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(name, password);
      navigate("/");
    } catch {
      setError("Identifiants incorrects");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Connexion</h1>

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

      <button type="submit">Se connecter</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p>
        Pas encore de compte ?{" "}
        <Link to="/register">Créer un compte</Link>
      </p>
    </form>
  );
}