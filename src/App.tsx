// src/App.tsx
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Register from "./pages/Register";
import LogoutButton from "./components/LogoutButton";
import { AuthProvider } from "./context/AuthContext";

function Home() {
  return (
    <>
      <h1>Page privée</h1>
      <LogoutButton />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/*"
            element={
              <Navigate to="/" replace />
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}