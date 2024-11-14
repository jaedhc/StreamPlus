import './Comment.css'

import { useState, useEffect } from 'react';

export function Comment({name, comment, url}){
    return(
        <>
            <div className='cm-container'>
                <div className='cm-user-photo-cont'>
                <img className="cm-user-photo" src={url}/>
                </div>
                <div className='cm-container-com'>
                    <p className='cm-user-name'>{name}</p>
                    <p className='cm-user-comment'>{comment}</p>
                </div>
            </div>
        </>
    )
}
