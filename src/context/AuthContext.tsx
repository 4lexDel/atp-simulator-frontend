// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/axios";

type User = {
    id: number;
    name: string;
    player_id: number | null;
};

type AuthContextType = {
    user: User | null;
    loading: boolean;
    login: (name: string, password: string) => Promise<void>;
    register: (name: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
};


const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const moduleBaseUrl = 'auth';

    // Vérifie la session au chargement
    useEffect(() => {
        api.get<User>(`/${moduleBaseUrl}/me`)
            .then(res => setUser(res.data))
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);

    const login = async (name: string, password: string) => {
        await api.post(`/${moduleBaseUrl}/login`, { name, password });
        const me = await api.get<User>(`/${moduleBaseUrl}/me`);
        setUser(me.data);
    };

    const logout = async () => {
        await api.post(`/${moduleBaseUrl}/logout`);
        setUser(null);
    };

    const register = async (name: string, password: string) => {
        await api.post(`/${moduleBaseUrl}/register`, { name, password });
        await login(name, password); // auto-login après register
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
