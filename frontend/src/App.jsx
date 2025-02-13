import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from "./pages/Homepage"
import Navbar from './components/Navbar'
import {Login, Register} from './pages/AuthenticationPage'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchCurrentUser } from './slices/authSlice'

function layout(element) {
  return (
    <>
      <Navbar />
      {element}
    </>
  )
}

function App() {

  const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCurrentUser());
    }, []);

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
