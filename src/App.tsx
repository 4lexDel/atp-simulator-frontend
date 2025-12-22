// src/App.tsx
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Register from "./pages/Register";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import CreatePlayer from "./pages/CreatePlayer";
import AtpCalendar from "./components/AtpCalendar";

export default function App() {
  return (
    <AuthProvider>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/players/new"
            element={
              <ProtectedRoute>
                <CreatePlayer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AtpCalendar />
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