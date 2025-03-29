import TournamentCard from "./TournamentCard.tsx";
import Grid from '@mui/material/Grid2';
import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { TournamentDTO } from "./TournamentDTO.ts";
import Typography from "@mui/material/Typography";

const API_URL = import.meta.env.VITE_VOLEYON_API_URL;

const Tournaments = () => {
    const [tournaments, setTournaments] = useState<TournamentDTO[]>([]);

    useEffect(() => {
        fetch(`${API_URL}/tournaments/`)
            .then((response) => response.json())
            .then((tournaments: TournamentDTO[]) => setTournaments(tournaments));
    }, []);

    return (
        <Container maxWidth="lg" sx={{py: 3}}>
            {tournaments.length === 0 &&
                <Typography variant="overline" gutterBottom>
                    Actualmente no hay torneos
                </Typography>
            }
            <Grid container spacing={2}>
                {tournaments.map((tournament) => (
                    <Grid size={{xs: 12, sm: 6, md: 4, lg: 3}} key={tournament.id}>
                        <TournamentCard id={tournament.id} name={tournament.name} poster={tournament.poster}
                                        link={tournament.link}></TournamentCard>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default Tournaments;