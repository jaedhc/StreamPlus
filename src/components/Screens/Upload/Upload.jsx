import './Upload.css'
import loading_img from '../../../assets/loading.gif'
import placeholder from '../../../assets/img_placeholder.jpg'
import { storage } from '../../../firebaseconfig';
import { ref, uploadBytesResumable, getDownloadURL, listAll } from 'firebase/storage';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function Upload(){

    const navigate = useNavigate();

    const [videoFile, setVideoFile] = useState(null);
    const [coverFile, setCoverFile] = useState(null);
    const [dragActive, setDragActive] = useState(false);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [userURL, setUserURL] = useState("")
    const [coverURL, setCoverURL] = useState(placeholder)

    const [downloadVideoURL, setDownloadVideoURL] = useState("");
    const [downloadCoverURL, setDownloadCoverURL] = useState("");
    const [videoDuration, setVideoDuration] = useState(null);
    
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setVideoFile(file);

        const videoElement = document.createElement('video');
        videoElement.src = URL.createObjectURL(file);

        videoElement.onloadedmetadata = () => {
            setVideoDuration(videoElement.duration); 
            console.log(videoElement.duration);// Duración en segundos
            URL.revokeObjectURL(videoElement.src); // Liberar memoria
        };
    };

    const handleFileChangeCover = (e) => {
        const file = e.target.files[0];
        setCoverFile(file);
        if(file){
            const url = URL.createObjectURL(file);
            setCoverURL(url);
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragActive(true); // Activa el estilo de arrastrar
    };

    const handleDragLeave = () => {
        setDragActive(false); // Quita el estilo de arrastrar
    };

    const handleDrop = async(e) => {
        e.preventDefault();
        setDragActive(false);
        const file = e.dataTransfer.files[0];
        validateAndSetFile(file);
    };

    const uploadVideo = (id) => {
        return new Promise((resolve, reject) => {
            const storageRef = ref(storage, `Videos/${id}/video/${id}`);
            const uploadTask = uploadBytesResumable(storageRef, videoFile);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                // Progreso de la carga
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Progreso de carga video: ${progress}%`);
                },
                (error) => {
                    console.error("Error al subir el video:", error);
                    reject(error);
                },
                async () => {
                    // Obtén el enlace de descarga cuando finalice la carga
                    try {
                      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                      setDownloadVideoURL(downloadURL); // Guarda el URL si es necesario
                      resolve(downloadURL); // Resuelve la promesa con el URL de descarga
                    } catch (error) {
                      reject(error); // Rechaza la promesa si ocurre un error al obtener el URL
                    }
                  }
            )
            return null;
        })
    }

    const uploadCover = async(id) => {
        return new Promise((resolve, reject) => {
            const storageRef = ref(storage, `Videos/${id}/cover/${id}`);
            const uploadTask = uploadBytesResumable(storageRef, coverFile);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                // Progreso de la carga
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Progreso de carga video: ${progress}%`);
                },
                (error) => {
                    console.error("Error al subir el video:", error);
                    reject(error);
                },
                async () => {
                    // Obtén el enlace de descarga cuando finalice la carga
                    try {
                      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                      setDownloadVideoURL(downloadURL); // Guarda el URL si es necesario
                      resolve(downloadURL); // Resuelve la promesa con el URL de descarga
                    } catch (error) {
                      reject(error); // Rechaza la promesa si ocurre un error al obtener el URL
                    }
                  }
            )
            return null;
        })
    }

    const createVideo = async (vid_url, cover_url) => {
        const API_URL = import.meta.env.VITE_API_URL;          
        const token = localStorage.getItem('authToken');
        const response = await axios.post(
            `${API_URL}/video`,
            {
              'title': title,
              'description': description,
              'url_video':vid_url,
              'url_thumbnail': cover_url,
              'duration': videoDuration
            },
            {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
        return response.data.video.id
    }

    const handleOnUpload = async() => {
        const id = uuidv4();
        try{
            const vid_url = await uploadVideo(id);
            const cover_url = await uploadCover(id);
            if(vid_url && cover_url && videoDuration && title && description){
                const video_id = await createVideo(vid_url, cover_url);
                navigate(`/videos/${video_id}`);
            }
        }catch(error){
            console.error("Error al subir el video:", error);
        }

    }

    const handleSubmit = async (evento) => {
        evento.preventDefault();
        setLoading(true);
        if(videoFile && coverFile && title != "" && description != ""){
            await handleOnUpload();
            setLoading(false);
            console.log(loading)
        } else {
            alert("Completa todos los campos");
            setLoading(false);
        }
    }

    useEffect(() => {
        setUserURL(localStorage.getItem('photoURL'));
    }, []);

    return(
        <>
            <div className='upl-container'>
                {videoFile ? (
                    <>
                    <div className='upv-container'>
                        <div className='upv-preview' onClick={() => document.getElementById('cover-upload-input').click()}>
                            <img className='upv-preview-img' src={coverURL}/>
                            <input 
                                type="file" 
                                id="cover-upload-input"
                                accept='image/*'
                                onChange={handleFileChangeCover}
                                style={{ display: 'none' }}
                                />
                        </div>
                        <div className='upv-info-prev'>
                            <p className='upv-title'>{title}</p>
                            <div className='upv-info-user'>
                                <img className='upv-info-user-profile' src={userURL}/>
                                <p></p>
                            </div>
                        </div>
                    </div>
                    <form className='upv-form' onSubmit={handleSubmit}>
                        <p className='upv-title'>Title</p>
                        <input
                            className='upv-input-title'
                            maxLength="40"
                            type='text'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} 
                            placeholder='Title'/>
                        <p className='upv-title'>Descripción</p>
                        <textarea
                            className='upv-input-description'
                            maxLength="140"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)} 
                            placeholder='Description'
                            rows="5"
                            />
                        <div className='upv-menu'>
                            {loading ? (
                                    <>
                                    <img className='upv-loading' src={loading_img}/>
                                    </>
                                ) : (<></>)}
                            <button disabled={loading} className='upv-button-cancel'>Cancel</button>
                            <button disabled={loading} className='upv-button-upload' type='submit'>Subir video</button>
                        </div>
                    </form>
                    </>
                ) : (
                    <>
                    <div
                        className={`upload-area ${dragActive ? 'drag-active' : ''}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => document.getElementById('video-upload-input').click()}
                    >   
                        <div className='upv-info-title'>
                            <p className='upv-title'>Subir Video</p>
                        </div>
                        <div className='upv-info'>
                            <p className='upv-msg'>Arrastra y suelta un video aquí, o haz clic para seleccionar uno</p>
                        </div>
                    </div>
                    <input 
                        type="file" 
                        id="video-upload-input"
                        accept='video/*'
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    </>
                )}

                
            </div>
        </>
    )
}