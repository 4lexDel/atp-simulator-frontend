import { Navigate } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  
  if (user && !user.player_id) return <Navigate to="/players/new" replace />;

  return (
    <>
      <h1>Page privée</h1>
      <LogoutButton />
    </>
  );
}