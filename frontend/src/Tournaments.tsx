import TournamentCard from "./TournamentCard.tsx";
import Grid from '@mui/material/Grid2';
import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { TournamentDTO } from "./TournamentDTO.ts";
import Typography from "@mui/material/Typography";

const mockTournaments: TournamentDTO[] = [
    {
        title: 'Torneo de verano',
        description: 'El torneo de verano se juega en la playa',
        imageUrl: 'https://picsum.photos/seed/other/200/300',
        link: 'https://example.com/torneo-verano'
    },
    {
        title: 'Torneo de invierno',
        description: 'El torneo de invierno se juega en la montaña',
        imageUrl: 'https://picsum.photos/seed/picsum/200/300',
        link: 'https://example.com/torneo-invierno'
    }
];

const Tournaments = () => {
    const [tournaments, setTournaments] = useState<TournamentDTO[]>([]);

    useEffect(() => {
        setTournaments(mockTournaments);
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
                    <Grid size={{xs: 12, sm: 6, md: 4, lg: 3}} key={tournament.title}>
                        <TournamentCard title={tournament.title} description={tournament.description}
                                        imageUrl={tournament.imageUrl} link={tournament.link}></TournamentCard>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default Tournaments;