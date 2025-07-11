import TournamentCard from "./TournamentCard.tsx";
import Grid from '@mui/material/Grid2';
import {
    Autocomplete,
    Box,
    Button,
    Container,
    Divider,
    Drawer,
    FormControl,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ChangeEvent, useEffect, useState } from "react";
import { TournamentDTO } from "./TournamentDTO.ts";
import Typography from "@mui/material/Typography";
import dayjs, { Dayjs } from 'dayjs';
import { Provinces } from "./Provinces.ts";
import { Tune } from "@mui/icons-material";
import { useLocalStorage } from "./useLocalStorage.ts";

const API_URL = import.meta.env.VITE_VOLEYON_API_URL;

const Tournaments = () => {
    const [tournaments, setTournaments] = useState<TournamentDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [open, setOpen] = useState(false);

    const [province, setProvince] = useLocalStorage('province', '');
    const [field, setField] = useLocalStorage('field', '');
    const [gender, setGender] = useLocalStorage('gender', '');
    const [playersOnField, setPlayersOnField] = useLocalStorage('playersOnField', '');
    const [startDate, setStartDate] = useLocalStorage<Dayjs | null>('startDate', dayjs());
    const [endDate, setEndDate] = useLocalStorage<Dayjs | null>('endDate', null);
    const [maximumPrice, setMaximumPrice] = useLocalStorage('maximumPrice', '');
    const [minimumAge, setMinimumAge] = useLocalStorage('minimumAge', '');

    const [ordering, setOrdering] = useLocalStorage('ordering', 'date');

    useEffect(() => {
        let query = '?';
        if (ordering) {
            query += `&ordering=${ordering}`;
        }
        if (province) {
            query += `&location__province=${province}`;
        }
        if (field) {
            query += `&field=${field}`;
        }
        if (gender) {
            query += `&gender=${gender}`;
        }
        if (playersOnField) {
            query += `&players_on_field=${playersOnField}`;
        }
        if (startDate) {
            query += `&date__gte=${startDate.format('YYYY-MM-DD')}`;
        }
        if (endDate) {
            query += `&date__lte=${endDate.format('YYYY-MM-DD')}`;
        }
        if (maximumPrice) {
            query += `&price__lte=${maximumPrice}`;
        }
        if (minimumAge) {
            query += `&minimum_age__lte=${minimumAge}`;
        }

        fetch(`${API_URL}/tournaments/${query}`)
            .then((response) => response.json())
            .finally(() => setLoading(false))
            .then((tournaments: TournamentDTO[]) => setTournaments(tournaments));
    }, [ordering, province, field, gender, playersOnField, startDate, endDate, maximumPrice, minimumAge]);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const filters = <Grid container spacing={1}>
        <Grid size={{xs: 6, md: 3, xl: 2}}>
            <Autocomplete renderInput={(params) => (
                <TextField
                    {...params}
                    label="Provincia"
                    slotProps={{
                        htmlInput: {
                            ...params.inputProps,
                        },
                    }}
                />
            )} options={Provinces} value={province}
                          onChange={(_event, newValue) => setProvince(newValue as string)}/>
        </Grid>
        <Grid size={{xs: 6, md: 3, xl: 1}}>
            <FormControl fullWidth>
                <InputLabel id="field-label">Terreno</InputLabel>
                <Select
                    labelId="field-label"
                    id="field-select"
                    value={field}
                    label="Terreno"
                    onChange={(event: SelectChangeEvent) => setField(event.target.value as string)}
                >
                    <MenuItem value={''}>Todos</MenuItem>
                    <MenuItem value={'Court'}>Pista</MenuItem>
                    <MenuItem value={'Beach'}>Playa</MenuItem>
                    <MenuItem value={'Snow'}>Nieve</MenuItem>
                </Select>
            </FormControl>
        </Grid>
        <Grid size={{xs: 6, md: 3, xl: 2}}>
            <FormControl fullWidth>
                <InputLabel id="gender-label">Género</InputLabel>
                <Select
                    labelId="gender-label"
                    id="gender-select"
                    value={gender}
                    label="Género"
                    autoWidth
                    onChange={(event: SelectChangeEvent) => setGender(event.target.value as string)}
                >
                    <MenuItem value={''}>Todos</MenuItem>
                    <MenuItem value={'Male'}>Masculino</MenuItem>
                    <MenuItem value={'Female'}>Femenino</MenuItem>
                    <MenuItem value={'Mixed'}>Mixto</MenuItem>
                </Select>
            </FormControl>
        </Grid>
        <Grid size={{xs: 6, md: 3, xl: 2}}>
            <TextField id="number-of-players-input" label="Número de jugadores" variant="outlined" fullWidth
                       type="number"
                       onChange={(event: ChangeEvent<HTMLInputElement>) => setPlayersOnField(event.target.value as string)}/>
        </Grid>
        <Grid size={{xs: 12, sm: 6, lg: 3, xl: 2}}>
            <DatePicker
                label="Desde"
                value={startDate}
                slotProps={{textField: {fullWidth: true}, field: {clearable: true}}}
                onChange={(newStartDate) => setStartDate(newStartDate?.isValid() ? dayjs(newStartDate) : null)}
            />
        </Grid>
        <Grid size={{xs: 12, sm: 6, lg: 3, xl: 2}}>
            <DatePicker
                label="Hasta"
                value={endDate}
                slotProps={{textField: {fullWidth: true}, field: {clearable: true}}}
                onChange={(newEndDate) => setEndDate(newEndDate?.isValid() ? dayjs(newEndDate) : null)}
            />
        </Grid>
        <Grid size={{xs: 12, sm: 6, lg: 3, xl: 2}}>
            <TextField id="maximum-price-input" label="Precio máximo" variant="outlined" fullWidth type="number"
                       onChange={(event: ChangeEvent<HTMLInputElement>) => setMaximumPrice(event.target.value as string)}
                       slotProps={{
                           input: {
                               endAdornment: <InputAdornment position="end">€/persona</InputAdornment>,
                           },
                       }}
            />
        </Grid>
        <Grid size={{xs: 12, sm: 6, lg: 3, xl: 2}}>
            <TextField id="minimum-age-input" label="Mayores de" variant="outlined" fullWidth type="number"
                       onChange={(event: ChangeEvent<HTMLInputElement>) => setMinimumAge(event.target.value as string)}
                       slotProps={{
                           input: {
                               endAdornment: <InputAdornment position="end">años</InputAdornment>,
                           },
                       }}
            />
        </Grid>
    </Grid>;

    const sorting = <FormControl fullWidth sx={{mt: 1}}>
        <InputLabel id="ordering-label">Orden</InputLabel>
        <Select
            labelId="ordering-label"
            id="ordering-select"
            value={ordering}
            label="Género"
            autoWidth
            onChange={(event: SelectChangeEvent) => setOrdering(event.target.value as string)}
        >
            <MenuItem value={'date'}>Más antiguos primero</MenuItem>
            <MenuItem value={'-date'}>Más lejanos primero</MenuItem>
        </Select>
    </FormControl>;

    return (
        <Container maxWidth="xl" sx={{py: 3}}>
            <Drawer
                anchor="top"
                open={open}
                onClose={() => setOpen(false)}
                slotProps={{
                    root: {
                        keepMounted: true,
                    },
                }}
            >
                <Box sx={{px: 1, py: 1}}>
                    <Typography align="center" gutterBottom>
                        Filtros
                    </Typography>
                    {filters}
                    {sorting}
                    <Box sx={{textAlign: 'end'}}>
                        <Button onClick={toggleDrawer(false)} variant="contained" sx={{mt: 1}}>
                            {tournaments.length === 0 ? 'No hay torneos' : `Mostrar ${tournaments.length} torneo${tournaments.length > 1 ? 's' : ''}`}
                        </Button>
                    </Box>
                </Box>
            </Drawer>

            <Box sx={{display: {xs: 'none', md: 'block'},}}>
                {filters}
                <Divider sx={{my: 3}}/>
            </Box>


            <Grid container spacing={1} sx={{mb: 1, alignItems: "center", justifyContent: {xs: "center"}}}>
                <Grid size={{xs: 12, sm: 'grow'}}>
                    {
                        loading &&
                        <Typography variant="h6">
                            Buscando torneos...
                        </Typography>
                    }
                    {
                        !loading && tournaments.length === 0 &&
                        <Typography variant="h6">
                            No se han encontrado torneos
                        </Typography>
                    }
                    {
                        !loading && tournaments.length !== 0 &&
                        <Typography variant="h6">
                            {tournaments.length} {tournaments.length > 1 ? 'torneos encontrados' : 'torneo encontrado'}
                        </Typography>
                    }
                </Grid>
                <Grid size={{xs: "auto"}} sx={{display: {md: 'none'}}}>
                    {
                        !loading && <Button onClick={toggleDrawer(true)} variant="outlined" size="large"
                                            startIcon={<Tune/>}>Filtrar</Button>
                    }
                </Grid>
                <Grid size={{md: 'auto'}} sx={{display: {xs: 'none', md: "block"}}}>
                    {sorting}
                </Grid>
            </Grid>

            <Grid container spacing={1}>
                {tournaments.map((tournament) => (
                    <Grid size={{xs: 12, sm: 6, md: 4, lg: 3}} key={tournament.id}>
                        <TournamentCard {...tournament}></TournamentCard>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default Tournaments;