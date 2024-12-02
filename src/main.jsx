import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
//import { Video } from './Video/Video.jsx'
//import Fort from './Fortite/Fortite.jsx'
import { MainContent } from './components/Screens/MainContent/MainContent.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <MainContent/>
    </StrictMode>
  </BrowserRouter>
)
