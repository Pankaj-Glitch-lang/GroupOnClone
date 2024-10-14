import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { CartProvider } from './component/contextApi/CartContext.jsx'
import { AuthProvider } from './component/contextApi/AuthConetxt.jsx'

createRoot(document.getElementById('root')).render(

  <AuthProvider> 
     <CartProvider>
    <BrowserRouter>
      <ChakraProvider>

        <App />

      </ChakraProvider>
    </BrowserRouter>
  </CartProvider>
  </AuthProvider>

)
