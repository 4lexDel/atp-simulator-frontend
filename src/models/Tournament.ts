export type Tournament = {
    id: number;
    name: string;
    location: string;
    surface: string;
    category: string;
    atp_point_reward: number;
    nb_participant: number;
    nb_qualification_participant: number;
    begin: Date;
    end: Date;
    createdAt: Date;
    updatedAt: Date;
    color: string | null;
}