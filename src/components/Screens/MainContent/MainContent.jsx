import './MainContent.css'
import { Home } from '../Home/Home'
import { Menu } from '../../MenuComps/Menu/Menu.jsx'
import { TopBar } from '../../MenuComps/TopBar/TopBar.jsx'
import { useState, useEffect } from 'react';
import { UserPage } from '../../User/UserPage/UserPage.jsx'
import { VideoViwer } from '../../VideoComps/VideoViwer/VideoViwer.jsx'
import { Upload } from '../Upload/Upload.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute.jsx';
import { Search } from '../Serch/Search.jsx';

export function MainContent(){
    
    const navigate = useNavigate();
    const [vidId, setVidId] = useState('')


    const handleContent = (value) => {
        navigate(`/${value}`)
    }

    const handleVideoSelected = (value) => {
        console.log(value)
        setVidId(value)
        navigate(`/videos/${value}`) 
    }

    return(
        <>
            <TopBar handlerContent={handleContent}/>
            <div className='main-content'>
            <Menu handlerContent={handleContent}/>
            <Routes>
                <Route path='/home' element={<Home onChange={handleVideoSelected}/>}/>
                <Route path='/search/:searchQuery' element={<Search/>}/>
                <Route 
                    path='/user' 
                    element={
                        <ProtectedRoute>
                            <UserPage handlerContent={handleContent} onChange={handleVideoSelected}/>
                        </ProtectedRoute>
                    }
                />
                <Route 
                    path='/videos/:videoID' 
                    element={
                        <VideoViwer idVideo={vidId}/>
                    }
                />
                <Route 
                    path='/upload' 
                    element={
                        <ProtectedRoute>
                            <Upload />
                        </ProtectedRoute>
                    }
                />
            </Routes>
            </div>
        </>
    )
}