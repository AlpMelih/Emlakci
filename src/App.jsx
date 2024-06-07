import { useState } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import MainPage from './components/MainPage'
import LoginRegister from './components/LoginRegister'
import CreateEstate from './components/CreateEstate'
import WelcomePage from './components/WelcomePage'
import Estates from './components/Estates'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Default route redirects to /home/welcome */}
          <Route path="/" element={<Navigate to="/home/welcome" />} />

          <Route path='/loginregister' element={<LoginRegister />} />

          <Route path='/home' element={<MainPage />}>
            <Route path='welcome' element={<WelcomePage />} />
            <Route path='emlakekle' element={<CreateEstate />} />
            <Route path='estatelist' element={<Estates />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
