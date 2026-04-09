import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { TutorRegister } from './pages/tutorRegister'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<TutorRegister />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App