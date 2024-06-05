import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import MainPage from './components/MainPage'
import LoginRegister from './components/LoginRegister'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/loginregister' element={<LoginRegister></LoginRegister>}></Route>
          <Route path='/' element={<MainPage></MainPage>}></Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
