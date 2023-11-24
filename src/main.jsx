import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/Routes';
import { ThemeProvider } from "@material-tailwind/react";
import { HelmetProvider } from 'react-helmet-async';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <HelmetProvider>
        <div className=''>
          <RouterProvider router={router} />
        </div>
      </HelmetProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
