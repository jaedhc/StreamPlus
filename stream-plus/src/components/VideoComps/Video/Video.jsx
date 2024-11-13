import './Video.css';
import React from 'react';
import { useState, useEffect } from 'react';


const Video = ({videoID, video, onSelected}) => {

  const [username, setUsername] = useState('User')
  const [loaded, setLoaded] = useState(false)
  const [duration, setDuration] = useState('')

  const selectedHandler = () => {
    onSelected(videoID)
  }

  const fetchVideoData = async() => {
    try{
      //const querySnapshot = await getDoc(doc(firestore, `Users/${video.uploaded_by}`)) 
      
      let sec = video.duration;
      let mins = 0
      if(sec >= 60){
        mins = sec/60;
      }

      sec = sec - (mins.toFixed(0) * 60);
      let newSec = (sec) > 9 ? `${(sec)}` : `0${(sec)}`;
      //let newSec = sec;

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
          <div className='vs-card' onClick={selectedHandler}>
            <div className='vs-card-thumbnail'>
              <img className='vs-card-thumbnail-img' src={video.thumbnail} alt='thumbnail'/>
              <span className='vs-card-thumbnail-duration'>{duration}</span>
            </div>
            <div className='vs-card-info'>
              <img className='vs-card-info-profpic' src={video.profile} alt='profPic'/>
              <div className='vs-card-info-bottom'>
                <h3 className='vs-card-info-title'>{video.title}</h3>
                <p className='vs-card-info-chanel'>{username}</p>
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

export default Video;