import { useState } from "react";
import { api } from "../api/axios";
import type { Tournament } from "../models/Tournament";

export function useTournament() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const moduleBaseUrl = 'tournaments';

    const getTournaments = async (): Promise<Tournament[]> => {
        setLoading(true);
        setError(null);

        try {
            const res = await api.get(`/${moduleBaseUrl}`, { withCredentials: true });
            
            return res.data as Tournament[];
        } catch (err: any) {
            const message =
                err.response?.data?.error ||
                err.response?.data ||
                "Failed to fetch tournaments";
            setError(message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        getTournaments,
        loading,
        error,
    };
}