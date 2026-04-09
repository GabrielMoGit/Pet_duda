import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/panels/mainPanel'
import { Home } from './pages/Home'
import { TutorRegister } from './pages/tutorRegister'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />      
          <Route path="home" element={<Home />} />
          <Route path="register" element={<TutorRegister />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App