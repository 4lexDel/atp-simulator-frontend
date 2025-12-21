import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import './createPlayer.css';
import { usePlayer } from "../hooks/usePlayer";

export default function CreatePlayer() {
    const { user, loading } = useAuth();
    const { createPlayer, error } = usePlayer();

    if (loading) return <p>Loading...</p>;
    if (!user || user.player_id) return <Navigate to="/" replace />;

    const [name, setName] = useState(user.name);
    const [age, setAge] = useState(20);
    const [country, setCountry] = useState("France");
    
    const [countries, setCountries] = useState<Array<{ cca2: string; name: { common: string } }>>([]);

    const surfaceSkillsMax = 20;

    const [claySkill, setClaySkill] = useState(5);
    const [grassSkill, setGrassSkill] = useState(5);
    const [hardSkill, setHardSkill] = useState(5);

    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all?fields=name,cca2")
            .then(res => res.json())
            .then(data => {
                data.sort((a: any, b: any) => a.name.common.localeCompare(b.name.common));
                setCountries(data);
            }
        );
    }, []);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createPlayer({
                name,
                age,
                country,
                clay_skill_point: claySkill,
                grass_skill_point: grassSkill,
                hard_skill_point: hardSkill
            });

            // refresh page to get updated user info
            window.location.reload();
        } catch {
            console.log("Player creation failed");
        }
    };

    const setSurfaceSkill = (surface: 'clay' | 'grass' | 'hard', value: number) => {
        const totalSkill = claySkill + grassSkill + hardSkill;
        if (totalSkill - (surface === 'clay' ? claySkill : surface === 'grass' ? grassSkill : hardSkill) + value > surfaceSkillsMax) {
            return; // Do not allow setting if it exceeds total of surfaceSkillsMax
        }
        if (surface === 'clay') setClaySkill(value);
        else if (surface === 'grass') setGrassSkill(value);
        else if (surface === 'hard') setHardSkill(value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Nouveau joueur</h1>

            <label htmlFor="name">Nom</label>
            <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Nom"
                required
            />

            <label htmlFor="age">Age</label>
            <input
                type="number"
                value={age}
                onChange={e => setAge(parseInt(e.target.value))}
                placeholder="Age"
                required
            />

            <label htmlFor="country">Pays</label>
            <select
                id="country"
                value={country}
                onChange={e => setCountry(e.target.value)}
                required
            >
                <option value="">Sélectionner un pays</option>
                {countries.map(c => (
                    <option key={c.cca2} value={c.name.common}>
                        {c.name.common}
                    </option>
                ))}
            </select>

            <label htmlFor="surface">Surface skills ({surfaceSkillsMax-(claySkill+grassSkill+hardSkill)} point(s) restant(s))</label>
            <div className="surfaces-skill">
                
                <div>
                    Terre
                    <input
                        type="number"
                        min={0}
                        max={10}
                        value={claySkill}
                        onChange={e => setSurfaceSkill('clay', parseInt(e.target.value))}
                        required
                    />
                </div>

                <div>
                    Gazon
                    <input
                        type="number"
                        min={0}
                        max={10}
                        value={grassSkill}
                        onChange={e => setSurfaceSkill('grass', parseInt(e.target.value))}
                        required
                    />
                </div>

                <div>
                    Dure
                    <input
                        type="number"
                        min={0}
                        max={10}
                        value={hardSkill}
                        onChange={e => setSurfaceSkill('hard', parseInt(e.target.value))}
                        required
                    />
                </div>
            </div>

            <button type="submit" disabled={surfaceSkillsMax - (claySkill + grassSkill + hardSkill) !== 0 || !name || !age || !country}>Créer le joueur</button>

            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
    );
}