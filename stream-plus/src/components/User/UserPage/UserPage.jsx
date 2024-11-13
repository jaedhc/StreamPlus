import './UserPage.css'
import background from '../../../assets/background.jpg'
import pic from '../../../assets/KingCriko2.jpg'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { VideoExtended } from '../../VideoComps/VideoExtended/VideoExtended';
import { firestore } from '../../../firebaseconfig';
import { storage } from '../../../firebaseconfig';
import { ref, uploadBytesResumable, getDownloadURL, listAll } from 'firebase/storage';
import axios from 'axios';

export function UserPage({handlerContent, onChange}){
    
    const [username, setUsername] = useState('User')
    const [photoURL, setPhotoURL] = useState(pic)
    const [coverURL, setCoverURL] = useState(background)
    
    const [photoFile, setPhotoFile] = useState(null)
    const [videos, setVideos] = useState([]);
    
    const navigate = useNavigate();

    const getLocalResources = () => {
        setUsername(localStorage.getItem('username'));
        setPhotoURL(localStorage.getItem('photoURL'));
        setCoverURL(localStorage.getItem('coverURL'));
    }

    const handleFileChangeProfile = (e) => {
      const file = e.target.files[0];
      handleUploadProfile(file);
    };

    const handleFileChangeCover = (e) => {
      const file = e.target.files[0];
      handleUploadCover(file);
    };

    const handleUploadProfile = async (file) => {
      try{
        const id = localStorage.getItem('id');
        const storageRef = ref(storage, `Users/${id}/profile/${id}`);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Progreso de la carga
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Progreso de carga: ${progress}%`);
          },
          (error) => {
            console.error("Error al subir la imagen:", error);
          },
          () => {
            // Obtén el enlace de descarga
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              updateUser(downloadURL, 1);
              setPhotoURL(downloadURL);
              window.location.reload();
              localStorage.setItem('photoURL', downloadURL);
              console.log("Enlace de descarga:", downloadURL);
            });
          }
        )
      }catch(e){
          console.log(e)
      }
    }

    const handleUploadCover = async (file) => {
      try{
        const id = localStorage.getItem('id');
        const storageRef = ref(storage, `Users/${id}/cover/${id}`);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Progreso de la carga
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Progreso de carga: ${progress}%`);
          },
          (error) => {
            console.error("Error al subir la imagen:", error);
          },
          () => {
            // Obtén el enlace de descarga
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              updateUser(downloadURL, 2);
              setCoverURL(downloadURL);
              localStorage.setItem('coverURL', downloadURL);
              window.location.reload();
            });
          }
        )
      }catch(e){
          console.log(e)
      }
    }

    const updateUser = async(downloadURL, type_file) => {
      const API_URL = import.meta.env.VITE_API_URL;          
      const token = localStorage.getItem('authToken');
      await axios.post(
        `${API_URL}/userPhoto`,
        {
          'url': downloadURL,
          'file_type_id': type_file
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
    }

    const getSelectedVid = (value) => {
        onChange(value)
    }
  
    const fetchVideos = async () => {
      try{
        const API_URL = import.meta.env.VITE_API_URL;
        const response = await axios.get(`${API_URL}/users/${localStorage.getItem('id')}`);
        console.log(response.data.videos);
        setVideos(response.data.videos)
      }catch(error){
        console.error(error)
      }
    }

    useEffect(() => {
        getLocalResources();
        fetchVideos();
    }, [])

    const clearLocalStorage = () => {
        localStorage.clear();
        handlerContent('home');
        location.reload();
    }

    const handleOnClick = () => {
      navigate(`/upload`)
    }

    return(
        <>
        <div className='up-container'>
            <div className='up-background'>
                <img className='up-background-img' 
                  src={coverURL} 
                  alt='background'
                  onClick={() => document.getElementById('cover-upload-input').click()}
                  ></img>
                  <input 
                      type="file" 
                      id="cover-upload-input"
                      accept='image/*'
                      onChange={handleFileChangeCover}
                      style={{ display: 'none' }}
                    />
                <div className='up-prof'>
                    <img className='up-prof-pic' 
                      src={photoURL}            
                      onClick={() => document.getElementById('photo-upload-input').click()}
                    />
                    <p className='up-prof-username'>{username}</p>
                    <input 
                      type="file" 
                      id="photo-upload-input"
                      accept='image/*'
                      onChange={handleFileChangeProfile}
                      style={{ display: 'none' }}
                    />
                </div>
            </div>

            <div className='up-menu-container'>
                <div className='up-menu-videos'>
                    <p>Mis videos</p>
                </div>
                <div className='up-menu-subir' onClick={handleOnClick}>
                    <p>Subir video</p>
                </div>
            </div>
            <div className='vse-videos'>
            {videos.map((doc) => (
              <>
                <VideoExtended videoID={doc.id} video={doc} onSelected={getSelectedVid}/>
              </>
            ))}
            </div>

            <button className='up-button-logout' onClick={clearLocalStorage}>Cerrar Sesión</button>
        </div>
        </>
    )
}