import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import './App.css'
import Tournaments from "./Tournaments.tsx";

function App() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Tournaments></Tournaments>
        </LocalizationProvider>
    )
}

export default App
