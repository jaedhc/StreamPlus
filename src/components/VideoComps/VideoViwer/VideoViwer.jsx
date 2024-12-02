import './VideoViwer.css'
import { storage } from '../../../firebaseconfig';
import { firestore } from '../../../firebaseconfig';
import { doc, collection, getDoc } from 'firebase/firestore';
import { ref, getDownloadURL, listAll } from 'firebase/storage';
import { useState, useEffect } from 'react';
import { UserDesc } from '../../User/UserDesc/UserDesc';
import { Comment } from '../Comment/Comment';

import { useParams } from 'react-router-dom';
import axios from 'axios';


export function VideoViwer({}){

    const { videoID } = useParams();

    const [vidURL, setVidURL] = useState('')
    const [vidTitle, setVidTitle] = useState('')
    const [vidDesc, setVidDesc] = useState('')
    const [vidUser, setVidUser] = useState('')
    const [vidUserPic, setVidUserPic] = useState('')
    
    const [loggedIn, setLoggedIn] = useState(false)


    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    const API_URL = import.meta.env.VITE_API_URL;

    const getVid = async () => {
        try{
            const response = await axios.get(`${API_URL}/video/${videoID}`);
            //console.log(response.data);

            setVidTitle(response.data.video.title);
            setVidDesc(response.data.video.description);
            const user = response.data.user
            //console.log(user)
            setVidUser(user);
            setVidUserPic(response.data.userPic[0])
            setVidURL(response.data.videoContent[0].url)
        }catch(error){
            console.error(error)
        }
    }

    const fetchComments = async() => {
        const response = await axios.get(`${API_URL}/comments/${videoID}`);
        setComments(response.data.comments)
    }

    const uploadComment = async() => {
        const token = localStorage.getItem('authToken');
        await axios.post(`${API_URL}/comment`,
            {
                'video_id': videoID,
                'content': comment
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        fetchComments();
    }

    const handleSubmit = async(evento) => {
        evento.preventDefault();
        await uploadComment();
    };

    useEffect(() => {
        getVid();
        fetchComments();
         
        const token = localStorage.getItem('authToken');
        token ? setLoggedIn(true) : setLoggedIn(false) 
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
                            <UserDesc user={vidUser} userPic={vidUserPic}/>
                        </div>
                        <div className='vp-description-container'>
                            <p className='vp-description-text'>{vidDesc}</p>
                        </div>
                        <div className='vp-comments-container'>
                        {loggedIn ? (
                            <>
                                    <form className='vp-comment-section' onSubmit={handleSubmit}>
                                        <input	
                                            className='vp-comment-input'
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)} 
                                        />
                                        <button className='vp-comment-btn' type='submit'>Comentar</button>
                                    </form>
                            </>
                        ) : (
                            <>
                            </>
                        )}
                        {comments.map((doc) => (
                        <>
                            <Comment name={doc.name} comment={doc.content} url={doc.url} />
                        </>
                        ))}
                        </div>
                    </>
                ) : (
                    <p>Cargando</p>
                ) }
            </div>
        </>
    )
}