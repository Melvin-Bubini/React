import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import router from './routing.tsx'
import 'tailwindcss'
import { AuthProvider } from './context/AuthContext.tsx'
import { ProductProvider } from './context/ProductContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ProductProvider>
        <RouterProvider router={router} />
      </ProductProvider>
    </AuthProvider>
  </StrictMode>,
)
