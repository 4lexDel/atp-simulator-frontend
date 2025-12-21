import { useState } from "react";
import { api } from "../api/axios";

export type CreatePlayerPayload = {
    name: string;
    age: number;
    country: string;
    clay_skill_point: number;
    grass_skill_point: number;
    hard_skill_point: number;
};

export function usePlayer() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const moduleBaseUrl = 'players';

    const createPlayer = async (payload: CreatePlayerPayload) => {
        setLoading(true);
        setError(null);

        try {
            const res = await api.post(
                `/${moduleBaseUrl}`,
                payload,
                { withCredentials: true }
            );
            return res.data;
        } catch (err: any) {
            const message =
                err.response?.data?.error ||
                err.response?.data ||
                "Player creation failed";
            setError(message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        createPlayer,
        loading,
        error,
    };
}