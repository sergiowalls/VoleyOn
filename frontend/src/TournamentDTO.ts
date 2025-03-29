export type TournamentDTO = {
    id: number;
    name: string;
    field?: string;
    gender?: string;
    playersOnField?: number;
    date?: string;
    price?: number;
    minimumAge?: number;
    link?: string;
    poster?: string;
}