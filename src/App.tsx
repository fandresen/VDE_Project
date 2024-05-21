import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/auth/Login'
import ResetPassword from './components/auth/ResetPassword'
import ForgotPassword from './components/auth/ForgotPassword';
import Home from './components/home/Home'
import { useMediaQuery } from 'react-responsive';
import { useEffect, useState } from 'react';
// import ExtractorWork from './components/extractor/ExtractorWork';

function App() {
  const isSmallScreen = useMediaQuery({maxWidth: 1023})
  const [isOpen, setIsOpen] = useState(!isSmallScreen);

  useEffect(() => {
    setIsOpen(!isSmallScreen);
  }, [isSmallScreen])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/forgot-password' element={<ForgotPassword/>} />
        <Route path='/reset-password/:token' element={<ResetPassword/>} />
        <Route path='/' element={<Home isOpen={isOpen} setIsOpen={setIsOpen}/>}  />
        {/* <PrivateRoute path='/extractor' element={<ExtractorWork/>} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
