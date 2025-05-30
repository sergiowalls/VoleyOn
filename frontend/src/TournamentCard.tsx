import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Alert, CardMedia, Chip, Grid2 as Grid, Skeleton } from "@mui/material";
import { TournamentDTO } from "./TournamentDTO.ts";
import { Cake, Event, Group, Sell, SportsVolleyball, Wc } from "@mui/icons-material";
import { Link } from "react-router";
import { useState } from "react";
import dayjs from "dayjs";

const FIELDS: { [key: string]: string } = {
    Court: 'Pista',
    Beach: 'Playa',
    Snow: 'Nieve'
}

const GENDERS: { [key: string]: string } = {
    Male: 'Masculino',
    Female: 'Femenino',
    Mixed: 'Mixto'
}

export default function TournamentCard({
                                           name,
                                           field,
                                           gender,
                                           players_on_field,
                                           date,
                                           price,
                                           minimum_age,
                                           poster,
                                           link,
                                           location
                                       }: TournamentDTO) {
    const [imageLoaded, setImageLoaded] = useState(false);

    const parsedLocation = `${location.name}, ${location.address}, ${location.postal_code} ${location.city}, ${location.province}`;
    const translatedField = field && FIELDS[field];
    const translatedGender = gender && GENDERS[gender];
    const isPastTournament = dayjs(date).isBefore(dayjs(), 'day');
    const localeDate = new Date(Date.parse((date)!)).toLocaleDateString();

    return (
        <>
            <Card sx={imageLoaded ? {} : {display: "none"}}>
                {isPastTournament &&
                    <Alert variant="filled" severity="warning" sx={{borderRadius: 0, backgroundColor: "darkred"}}>
                        Este torneo ya ha ocurrido.
                    </Alert>
                }
                <CardMedia component="img" alt="" image={poster} onLoad={() => setImageLoaded(true)}
                           onError={() => setImageLoaded(true)}/>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">{name}</Typography>
                    <Typography gutterBottom variant="body2"
                                sx={{color: 'text.secondary'}}>{parsedLocation}</Typography>
                    <Grid container spacing={1}>
                        {field && <Chip icon={<SportsVolleyball/>} label={translatedField} variant="outlined"/>}
                        {gender && <Chip icon={<Wc/>} label={translatedGender} variant="outlined"/>}
                        {players_on_field &&
                            <Chip icon={<Group/>} label={`${players_on_field}x${players_on_field}`}
                                  variant="outlined"/>}
                        {date && <Chip icon={<Event/>} label={localeDate} variant="outlined"/>}
                        <Chip icon={<Sell/>} label={`${price}€/persona`} variant="outlined"/>
                        {minimum_age &&
                            <Chip icon={<Cake/>} label={`Mayores de ${minimum_age} años`} variant="outlined"/>}
                    </Grid>
                </CardContent>
                <CardActions>
                    {link && <Button size="small" component={Link} to={link} target="_blank" rel="noopener noreferrer">Me
                        interesa</Button>
                    }
                </CardActions>
            </Card>
            {!imageLoaded && <Skeleton variant="rectangular" width="100%" height="50vh"/>}
        </>
    );
}