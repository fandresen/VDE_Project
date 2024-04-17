import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/auth/Login'
import ResetPassword from './components/auth/ResetPassword'
import ForgotPassword from './components/auth/ForgotPassword';
import Home from './components/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/forgot-password' element={<ForgotPassword/>} />
        <Route path='/reset-password/:token' element={<ResetPassword/>} />
        <Route path='/' element={<Home/>} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
