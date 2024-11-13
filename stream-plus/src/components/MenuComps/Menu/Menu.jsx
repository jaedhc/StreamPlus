import './Menu.css'
import { MenuItem } from '../MenuItem/MenuItem'
import icHome from '../../../assets/home.svg'
import icSusc from '../../../assets/susc.svg'
import icUpload from '../../../assets/upload.svg'
import { storage } from '../../../firebaseconfig'
import { firestore } from '../../../firebaseconfig'
import { useState, useEffect } from 'react';

export function Menu({handlerContent}){
    
    const [selected, setSelected] = useState('Inicio');
    const [loggedIn, setLoggedIn] = useState(false);

    const handleSelected = (value) => {
        setSelected(value);
        switch(value){
            case "Inicio":
                handlerContent('home');
                break;
            case "Subir video":
                handlerContent('upload');
                break;
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if(token){
            setLoggedIn(true);
        }
    });

    return(
        <>
            <div className='mh-container'>
                <MenuItem itemname="Inicio" icono={icHome} selected={selected} handlerSelect={handleSelected}/>
                {loggedIn ? (
                    <>
                        <MenuItem itemname="Suscripciones" icono={icSusc} selected={selected} handlerSelect={handleSelected}/>
                        <MenuItem itemname="Subir video" icono={icUpload} selected={selected} handlerSelect={handleSelected}/>
                    </>
                ) : (
                    <></>   
                )}
                </div>
        </>
    )
}
