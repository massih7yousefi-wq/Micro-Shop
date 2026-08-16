import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom"
import "./index.css";
//styles------------------------------
import "./styles/variables.css";
import "./styles/reset.css";
import "./styles/typography.css";
import "./styles/animations.css";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
  </StrictMode>,
)
