import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/Routes';
import { ThemeProvider } from "@material-tailwind/react";
import { HelmetProvider } from 'react-helmet-async';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import AuthProvider from './Pages/Providers/AuthProvider';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <HelmetProvider>
            <div className=''>
              <RouterProvider router={router} />
            </div>
          </HelmetProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
)
