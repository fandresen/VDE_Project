import {  createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/auth/Login'
// import ResetPassword from './components/auth/ResetPassword'
// import ForgotPassword from './components/auth/ForgotPassword';
import Home from './components/home/Home'
import { RootState } from './redux/store';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import AddNewUser from './components/Admin/AddNewUser/AddNewUser';
import Admin from './components/Admin/Admin';



// import ExtractorWork from './components/extractor/ExtractorWork';

function App() {
  const isDarkMode = useSelector((state: RootState) => state.mode.state);
  const body = document.querySelector('body');

  useEffect(() => {
    if (isDarkMode) {
      body?.classList.add('dark');
    } else {
      body?.classList.remove('dark');
    }
  }, [isDarkMode, body]);
  

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      children: [
        {
          path: '/home',
          element: <Admin />
        },
        {
          path: '/add',
          element: <AddNewUser />
        }
      ]
    },
    {
      path: '/login',
      element: <Login />,
    }

  ])

  return (
   <RouterProvider router={router} />
  )
}

export default App
