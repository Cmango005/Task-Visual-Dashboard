import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Login></Login>
      },
      {
        path: "/registration",
        element: <Registration></Registration>
      }
    ]
  },
]);
import './index.css'
import Root from './assets/components/Root/Root';
import Login from './assets/components/Login/Login';
import Registration from './assets/components/Registration/Registration';
import AuthProvider from './Providers/AuthProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className='max-w-screen-xl bg-white mx-auto'>
      <AuthProvider>

        <RouterProvider router={router} />

      </AuthProvider>
    </div>

  </React.StrictMode>,
)
