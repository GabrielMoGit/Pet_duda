import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout'
import { Home } from './pages/Home'
import { TutorRegister } from './pages/tutorRegister'
import { PetRegister } from './pages/petsRegister'
import { PackageRegister } from './pages/packageRegister'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />      
          <Route path="home" element={<Home />} />
          <Route path="register" element={<TutorRegister />} />
          <Route path="petRegister" element={<PetRegister/>} />
          <Route path="packageRegister" element={<PackageRegister/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App