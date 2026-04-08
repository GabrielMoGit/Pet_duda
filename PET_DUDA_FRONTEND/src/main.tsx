import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TutorRegister } from "./pages/tutorRegister"
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TutorRegister/>
  </StrictMode>,
)
