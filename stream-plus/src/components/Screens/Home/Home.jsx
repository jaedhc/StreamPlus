import './Home.css'
import Video from '../../VideoComps/Video/Video.jsx'
import React from 'react'
import icSparkle from '../../../assets/sparkle.svg'
import icInfo from '../../../assets/info.svg'
import { Title } from '../../Title/Title.jsx';
import { useState, useEffect } from 'react';

import axios from 'axios';

export function Home({onChange}){

    const [videos, setVideos] = useState([]);

    const getSelectedVid = (value) => {
      onChange(value)
    }

    const fetchVideos = async () => {
      try{
        const API_URL = import.meta.env.VITE_API_URL;
        const response = await axios.get(`${API_URL}/videos`);
        console.log(response.data[0].title);
        setVideos(response.data)
      }catch(error){
        console.error(error)
      }
    }

    useEffect(() => {
        fetchVideos()
    }, []);

    return (
        <>
          <div className='ft-todo'>
            <Title title="Explicación de la pagina" icon={icInfo}/>
            <Title title="Recomendados" icon={icSparkle}/>
            <div className='ft-videos'>
            {videos.map((doc) => (
              <>
                <Video videoID={doc.id} video={doc} onSelected={getSelectedVid}/>
              </>
            ))}
            </div>
          </div>
          
        </>
    )
}