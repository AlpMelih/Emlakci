import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import MainPage from './components/MainPage'
import LoginRegister from './components/LoginRegister'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CreateEstate from './components/CreateEstate'
import WelcomePage from './components/WelcomePage'
import Estates from './components/Estates'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/loginregister' element={<LoginRegister></LoginRegister>}></Route>
          <Route path='/home' element={<MainPage></MainPage>}>
            <Route path='welcome' element={<WelcomePage></WelcomePage>}></Route>
            <Route path="emlakekle" element={<CreateEstate></CreateEstate>}></Route>
            <Route path='estatelist' element={<Estates></Estates>}></Route>
          </Route>

        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
