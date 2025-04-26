import { Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link';

export default function About() {
    return (
        <Container maxWidth="xl" sx={{py: 3}}>
            <Typography variant="h6">Acerca de</Typography>
            <Typography variant="body1">
                Esta aplicación ha sido desarrollada como parte de un Trabajo Final del Máster en Desarrollo de Sitios y
                Aplicaciones Web en la Universitat Oberta de Catalunya. El código fuente está alojado en <Link
                href="https://github.com/sergiowalls/VoleyOn" target="_blank"
                rel="noopener">github.com/sergiowalls/VoleyOn</Link> .
            </Typography>
        </Container>
    );
}