import './Search.css'
import { VideoExtended } from '../../VideoComps/VideoExtended/VideoExtended';
import { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import axios from 'axios';

export function Search({handlerContent, onChange}){

    const { searchQuery } = useParams();
    const [videos, setVideos] = useState([]);

    const fetchVideos = async() => {
        try{
            const API_URL = import.meta.env.VITE_API_URL;
            const response = await axios.post(`${API_URL}/search`,{
                query: searchQuery
            });
            console.log(response.data.videos);
            setVideos(response.data.videos)
          }catch(error){
            console.error(error)
          }
    }

    const getSelectedVid = (value) => {
        onChange(value)
      }

    useEffect(() => {
        fetchVideos()
    })

    return(
        <>
            <div className='sc-videos'>
                <p className='sc-title'>Search: "{searchQuery}"</p>
                {videos.map((doc) => (
                <>
                    <VideoExtended videoID={doc.id} video={doc} onSelected={getSelectedVid}/>
                </>
                ))}
            </div>
        </>
    )
}