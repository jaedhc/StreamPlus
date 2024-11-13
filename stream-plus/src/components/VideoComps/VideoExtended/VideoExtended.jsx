import './VideoExtended.css'
import { useState, useEffect } from 'react';

export function VideoExtended({videoID, video, onSelected}){

    const [username, setUsername] = useState('User')
  const [loaded, setLoaded] = useState(false)
  const [duration, setDuration] = useState('')

  const selectedHandler = () => {
    onSelected(videoID)
  }

  const fetchVideoData = async() => {
    try{

      let sec = video.duration;
      let mins = 0
      if(sec >= 60){
        mins = sec/60;
      }
      
      
      sec = sec - (mins.toFixed(0) * 60);
      let newSec = (sec) > 9 ? `${(sec)}` : `0${(sec)}`;

      setDuration(`${mins.toFixed(0)}:${newSec}`)

      setUsername(video.name)
      setLoaded(true)
    }catch(error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchVideoData()
  }, [])

  return (
        <>
        {loaded ? (
          <>
          <div className='vse-card' onClick={selectedHandler}>
            <div className='vse-card-thumbnail'>
              <img className='vse-card-thumbnail-img' src={video.thumbnail} alt='thumbnail'/>
              <span className='vse-card-thumbnail-duration'>{duration}</span>
            </div>
            <div className='vse-card-info'>
              <img className='vse-card-info-profpic' src={video.profile} alt='profPic'/>
              <div className='vse-card-info-bottom'>
                <h3 className='vse-card-info-title'>{video.title}</h3>
                <p className='vse-card-info-chanel'>{username}</p>
              </div>
            </div>
          </div>
          </>
        ) : (
          <p>Cargando</p>
        )}
        </>
    );

};