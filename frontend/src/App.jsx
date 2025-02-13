import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from "./pages/Homepage"
import Navbar from './components/Navbar'
import {Login, Register} from './pages/AuthenticationPage'

function layout(element) {
  return (
    <>
      <Navbar />
      {element}
    </>
  )
}

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={layout(<HomePage />)} />
        <Route path='/auth/register' element={<Register />} />
        <Route path='/auth/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
