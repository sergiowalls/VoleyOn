type LocationDTO = {
    id: number;
    name: string;
    address: string;
    postal_code: number;
    city: number;
    province: number;
}

export type TournamentDTO = {
    id: number;
    name: string;
    field?: string;
    gender?: string;
    players_on_field?: number;
    date?: string;
    price?: number;
    minimum_age?: number;
    link?: string;
    poster?: string;
    location: LocationDTO;
}