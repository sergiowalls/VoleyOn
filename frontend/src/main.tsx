import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <StrictMode>
            <CssBaseline />
            <App />
        </StrictMode>
    </BrowserRouter>
)
