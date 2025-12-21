// src/components/LogoutButton.tsx
import { useAuth } from "../context/AuthContext";

export default function LogoutButton() {
  const { logout } = useAuth();
  return <button onClick={logout}>Déconnexion</button>;
}
