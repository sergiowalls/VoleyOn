import { useLocalStorage } from "./useLocalStorage.ts";
import Grid from '@mui/material/Grid2';
import { Autocomplete, Container, TextField } from "@mui/material";
import { Provinces } from "./Provinces.ts";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";


export default function Home() {
    const navigate = useNavigate();
    const [province, setProvince] = useLocalStorage('province', '');

    const onChangeProvince = ((province: string) => {
        setProvince(province);
        if (province) {
            navigate("/torneos");
        }
    });

    return (
        <>
            <picture style={{overflow: 'hidden', textAlign: 'center', display: 'flex'}}>
                <source media="(max-width: 660px)" srcSet="VoleyOn-mobile.webp"
                        type="image/webp"/>
                <source media="(max-width: 660px)" srcSet="VoleyOn-mobile.jpg"
                        type="image/jpeg"/>
                <img src="VoleyOn.jpg" alt="Imagen promocional"
                     style={{position: 'relative', left: '50%', transform: 'translate(-50%,0)', maxHeight: '30vh'}} />
            </picture>
            <Container>
                <Grid container spacing={2} sx={{padding: 2}} justifyContent="center">
                    <Typography variant="body1" sx={{display: 'block', lineHeight: '2'}}>
                        Buscar torneos en...
                    </Typography>
                    <Autocomplete renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            placeholder="tu provincia"
                            slotProps={{
                                htmlInput: {
                                    ...params.inputProps,
                                },
                            }}
                        />
                    )}
                                  sx={{minWidth: "220px"}}
                                  options={Provinces} value={province}
                                  onChange={(_event, newValue) => onChangeProvince(newValue as string)}/>
                </Grid>
            </Container>
        </>
    );
}