import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
//import { Video } from './Video/Video.jsx'
//import Fort from './Fortite/Fortite.jsx'
import { Fort } from './Fortite/Fortite.jsx'
import { Menu } from './Menu/Menu.jsx'
import { TopBar } from './TopBar/TopBar.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TopBar/>
    <div className='main-content'>  
      <Menu/>
      <Fort/>
    </div>
  </StrictMode>
)
