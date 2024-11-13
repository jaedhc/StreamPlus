import './VideoViwer.css'
import { storage } from '../../../firebaseconfig';
import { firestore } from '../../../firebaseconfig';
import { doc, collection, getDoc } from 'firebase/firestore';
import { ref, getDownloadURL, listAll } from 'firebase/storage';
import { useState, useEffect } from 'react';
import { UserDesc } from '../../User/UserDesc/UserDesc';

import { useParams } from 'react-router-dom';
import axios from 'axios';


export function VideoViwer({}){

    const { videoID } = useParams();

    const [vidURL, setVidURL] = useState('')
    const [vidTitle, setVidTitle] = useState('')
    const [vidDesc, setVidDesc] = useState('')
    const [vidUser, setVidUser] = useState('')

    const getVid = async () => {
        try{
            const API_URL = import.meta.env.VITE_API_URL;
            const response = await axios.get(`${API_URL}/video/${videoID}`);
            console.log(response.data);

            setVidTitle(response.data.video.title);
            setVidDesc(response.data.video.description);
            const user = response.data.user
            setVidUser(user);
            setVidURL(response.data.videoContent[0].url)
        }catch(error){
            console.error(error)
        }
    }

    useEffect(() => {
        getVid()
    }, [])

    return(
        <>  
            <div className='vp-container'>
                {vidURL ? (
                    <>
                        <video controls className='vp-video'>
                            <source src={vidURL} type="video/mp4"/>
                            tu navegador no soporta el video
                        </video>
                        <h1 className='vp-title'>{vidTitle}</h1>
                        <div className='vp-userdesc'>
                            <UserDesc user={vidUser}/>
                        </div>
                        <div className='vp-description-container'>
                            <p className='vp-description-text'>{vidDesc}</p>
                        </div>
                    </>
                ) : (
                    <p>Cargando</p>
                ) }
            </div>
        </>
    )
}