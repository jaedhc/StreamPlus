import './Video.css'
import thumbnail from '../assets/reaction.jpg'
import profPic from '../assets/pic.jpg'

export function Video(){
    return (
        <>
          <div className='vs-card'>
            <div className='vs-card-thumbnail'>
              <img className='vs-card-thumbnail-img' src={thumbnail} alt='thumbnail'/>
              <span className='vs-card-thumbnail-duration'>25:23</span>
            </div>
            <div className='vs-card-info'>
              <img className='vs-card-info-profpic' src={profPic} alt='profPic'/>
              <div className='vs-card-info-bottom'>
                <h3 className='vs-card-info-title'>Knedrick Fornite</h3>
                <p className='vs-card-info-chanel'>The reactor</p>
              </div>
            </div>
          </div>
        </>
    )
}