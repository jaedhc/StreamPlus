import './TopBar.css'
import pic from '../../../assets/default.png'
import icSearch from '../../../assets/search.svg'
import { useState, useEffect } from 'react';
import { Login } from '../../Screens/Login/Login.jsx';
import { SignUp } from '../../Screens/SignUp/SignUp.jsx';
import { useNavigate } from "react-router-dom";

import axios from 'axios';

export function TopBar({handlerContent}){

    const [showPopUp, setShowPopUp] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [showUid, setUid] = useState('');
    const [userName, setUsername] = useState('User')
    const [search, setSearch] = useState('')
    const [photoURl, setPhotoURL] = useState(pic)

    const navigate = useNavigate();

    const handleShowLogin = () => {
      if(userName != 'User'){ 
        handlerContent('user');
      } else {
        setShowPopUp(!showPopUp)
      }
    }

    const handleUidChange = (value) => {
      setUid(value);
      getUserInfo(value)
    }

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');

        if(storedUsername){
          setUsername(storedUsername);
        }
        
        const storedPhotoURL = localStorage.getItem('photoURL');

        if(storedPhotoURL && setPhotoURL != pic){
          setPhotoURL(storedPhotoURL);
        }
    })

    const getUserInfo = async(id) => {
        try{
          const API_URL = import.meta.env.VITE_API_URL;
          const token = localStorage.getItem('authToken');
          console.log(token)
          const response = await axios.get(`${API_URL}/user`,{
              headers: {
                'Authorization': `Bearer ${token}`
              }
          });
          setPhotoURL(response.data.contents[0].url);
          setUsername(response.data.userData.name);

          localStorage.setItem('username', response.data.userData.name);
          localStorage.setItem('photoURL', response.data.contents[0].url);
          localStorage.setItem('coverURL', response.data.contents[1].url);

          setShowPopUp(false);
          setShowSignUp(false);
          window.location.reload();
          //console.log(response.data.contents[0].url);
        } catch(error){
          console.error("Error al iniciar sesión: ", error);
        }
        
    }

    const handleShowSignUp = () => {
        setShowPopUp(false);
        setShowSignUp(!showSignUp);
    }

    const handleHideSignUp = () => {
      setShowSignUp(false);
      setShowPopUp(true);
    }

    const handleSubmit = (evento) => {
      evento.preventDefault();
      navigate(`/search/${search}`);
    } 

    return(
        <>
          {showSignUp && <SignUp onClose={handleShowSignUp} setUid={handleUidChange} onLogin={handleHideSignUp}/>}
          {showPopUp && <Login onClose={handleShowLogin} setUid={handleUidChange} onSignUp={handleShowSignUp}/>}
          <div className='tp-container'>
            <a href="/home" className='tp-logo'>STREAMING PLUS</a>
            <form className="tp-sb-form" onSubmit={handleSubmit}>
              <input
                className="tp-sb-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="search"
                name="query"
                placeholder="Buscar..."
              />
              <button className="tp-sb-button" type="submit">
                <img className="tp-sb-button-icon" src={icSearch} alt="search" />
              </button>
            </form>
            <div className='tp-user' onClick={handleShowLogin}>
                <p className='tp-user-username'>{userName}</p>
                <img className='tp-user-img' src={photoURl} alt='profpic'/>
            </div>
          </div>
        </>
    )
}