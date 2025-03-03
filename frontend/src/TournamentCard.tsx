import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardMedia } from "@mui/material";
import { TournamentDTO } from "./TournamentDTO.ts";


export default function TournamentCard({title, description, imageUrl, link}: TournamentDTO) {
    return (
        <Card sx={{maxWidth: 345}}>
            <CardMedia component="img" alt="" height="140" image={imageUrl}/>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">{title}</Typography>
                <Typography variant="body2" sx={{color: 'text.secondary'}}>{description}</Typography>
            </CardContent>
            <CardActions>
                {link && <Button size="small" href={link}>Me interesa</Button>}
            </CardActions>
        </Card>
    );
}