import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardMedia, Chip, Grid2 as Grid } from "@mui/material";
import { TournamentDTO } from "./TournamentDTO.ts";
import { Cake, Event, Group, Sell, SportsVolleyball, Wc } from "@mui/icons-material";
import { Link } from "react-router";

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

    const parsedLocation = `${location.name}, ${location.address}, ${location.postal_code} ${location.city}, ${location.province}`;
    const translatedField = field && FIELDS[field];
    const translatedGender = gender && GENDERS[gender];
    const localeDate = new Date(Date.parse((date)!)).toLocaleDateString();

    return (
        <Card>
            <CardMedia component="img" alt="" image={poster}/>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">{name}</Typography>
                <Typography gutterBottom variant="body2" sx={{color: 'text.secondary'}}>{parsedLocation}</Typography>
                <Grid container spacing={1}>
                    {field && <Chip icon={<SportsVolleyball/>} label={translatedField} variant="outlined"/>}
                    {gender && <Chip icon={<Wc/>} label={translatedGender} variant="outlined"/>}
                    {players_on_field &&
                        <Chip icon={<Group/>} label={`${players_on_field}x${players_on_field}`} variant="outlined"/>}
                    {date && <Chip icon={<Event/>} label={localeDate} variant="outlined"/>}
                    <Chip icon={<Sell/>} label={`${price}€/persona`} variant="outlined"/>
                    {minimum_age && <Chip icon={<Cake/>} label={`Mayores de ${minimum_age} años`} variant="outlined"/>}
                </Grid>
            </CardContent>
            <CardActions>
                {link && <Button size="small" component={Link} to={link} target="_blank" rel="noopener noreferrer">Me
                    interesa</Button>}
            </CardActions>
        </Card>
    );
}