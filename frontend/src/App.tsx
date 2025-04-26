import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import 'dayjs/locale/es';

import './App.css'
import Tournaments from "./Tournaments.tsx";

function App() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
            <Tournaments></Tournaments>
        </LocalizationProvider>
    )
}

export default App
