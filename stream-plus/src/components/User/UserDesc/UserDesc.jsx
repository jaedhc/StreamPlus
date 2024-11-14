import './UserDesc.css'
import img from '../../../assets/default.png'
import { storage } from '../../../firebaseconfig';
import { firestore } from '../../../firebaseconfig';
import { doc, collection, getDoc } from 'firebase/firestore';
import { ref, getDownloadURL, listAll } from 'firebase/storage';
import { useState, useEffect } from 'react';
import axios from 'axios';


export function UserDesc({user, userPic}){
    
    const [usrename, setUsername] = useState('User')
    const [photoURL, setPhotoURL] = useState(img)
    const [susc, setSusc] = useState(0)
    const [suscribed, setSuscribed] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)

    const getUserInfo = async () => {
        const API_URL = import.meta.env.VITE_API_URL;
        const token = localStorage.getItem('authToken');
        console.log(localStorage.getItem('id'))
        if(user.id == localStorage.getItem('id')){
            setLoggedIn(false)
            setUsername(user.name);
            setSusc(user.subs);
            setPhotoURL(userPic.url);
        } else if(token){
            setLoggedIn(true)
            const response = await axios.post(
                `${API_URL}/subscribedTo`,
                {
                  'id_subscribed': user.id
                },
                {
                  headers: {
                    'Authorization': `Bearer ${token}`
                  }
                });
            
            console.log(typeof response.data.subscribed);
            setSuscribed(response.data.subscribed);
            console.log(suscribed)
            setUsername(response.data.user[0].name);
            setSusc(response.data.user[0].subs);
            setPhotoURL(response.data.user[0].url);
        } else {
            console.log(user)
            setUsername(user.name);
            setSusc(user.subs);
            setPhotoURL(userPic.url);
        }
    }

    const handleDeSusc = async() => {
        try{
            const API_URL = import.meta.env.VITE_API_URL;
            const token = localStorage.getItem('authToken');
            const response = await axios.post(
                `${API_URL}/removeSubscription`,
                {
                    'id_subscribed': user.id
                },
                {
                    headers: {
                    'Authorization': `Bearer ${token}`
                    }
                });
            setSuscribed(false)
            getUserInfo()
        }catch(error){
            console.log(error)
        }
    }

    const handleSusc = async() => {
        try{
            const API_URL = import.meta.env.VITE_API_URL;
            const token = localStorage.getItem('authToken');
            const response = await axios.post(
                `${API_URL}/subscribeTo`,
                {
                    'id_subscribed': user.id
                },
                {
                    headers: {
                    'Authorization': `Bearer ${token}`
                    }
                });
            setSuscribed(true)
            getUserInfo()
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        getUserInfo()
    }, [])
    
    return(
        <>
        <div className='ud-container'>
            <img className='ud-img' src={photoURL} alt='chanelIMG'/>
            <div className='ud-info'>
                <p className='ud-username'>{usrename}</p>
                <p className='ud-suscriptors'>{susc} subs</p>
            </div>
            {loggedIn ? (
                <>
                {suscribed ? (
                    <button className='ud-desuscribe' onClick={handleDeSusc}>Suscrito</button>
                ):(
                    <button className='ud-suscribe' onClick={handleSusc}>Suscribirse</button>
                )}
                </>
            ):(
                <></>
            )}
        </div>
        </>
    )
}