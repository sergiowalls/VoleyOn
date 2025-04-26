import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { esES } from "@mui/x-date-pickers/locales";
import 'dayjs/locale/es';

import './App.css'
import Menu from "./Menu.tsx";
import Tournaments from "./Tournaments.tsx";

function App() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es"
                              localeText={esES.components.MuiLocalizationProvider.defaultProps.localeText}>
            <Menu/>
            <Tournaments/>
        </LocalizationProvider>
    )
}

export default App
