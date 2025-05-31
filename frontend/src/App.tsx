import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { esES } from "@mui/x-date-pickers/locales";
import 'dayjs/locale/es';

import './App.css'
import Menu from "./Menu.tsx";
import Tournaments from "./Tournaments.tsx";
import About from "./About.tsx";
import Home from "./Home.tsx";
import { Route, Routes } from "react-router";

function App() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es"
                              localeText={esES.components.MuiLocalizationProvider.defaultProps.localeText}>
            <Menu/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/torneos" element={<Tournaments/>}/>
                <Route path="/acerca-de" element={<About/>}/>
            </Routes>
        </LocalizationProvider>
    )
}

export default App
