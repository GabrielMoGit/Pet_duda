import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/mainPanel'
import { Home } from './pages/Home'
import { TutorRegister } from './pages/tutorRegister'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout é o pai das rotas */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />           {/* rota inicial */}
          <Route path="home" element={<Home />} />    {/* rota /home */}
          <Route path="register" element={<TutorRegister />} /> {/* rota /register */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App