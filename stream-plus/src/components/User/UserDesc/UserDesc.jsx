import './UserDesc.css'
import img from '../../../assets/default.png'
import { storage } from '../../../firebaseconfig';
import { firestore } from '../../../firebaseconfig';
import { doc, collection, getDoc } from 'firebase/firestore';
import { ref, getDownloadURL, listAll } from 'firebase/storage';
import { useState, useEffect } from 'react';


export function UserDesc({user}){
    
    const [usrename, setUsername] = useState('User')
    const [photoURL, setPhotoURL] = useState(img)
    const [susc, setSusc] = useState(0)

    const getUserInfo = async () => {
        setUsername(user.name);
        setSusc(user.subs);
    }

    useEffect(() => {
        console.log(user)
        getUserInfo()
    })
    
    return(
        <>
        <div className='ud-container'>
            <img className='ud-img' src={photoURL} alt='chanelIMG'/>
            <div className='ud-info'>
                <p className='ud-username'>{usrename}</p>
                <p className='ud-suscriptors'>{susc} subs</p>
            </div>
            <button className='ud-suscribe'>Suscribirse</button>
        </div>
        </>
    )
}