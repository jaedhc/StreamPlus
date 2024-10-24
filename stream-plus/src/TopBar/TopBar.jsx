import './TopBar.css'
import pic from '../assets/KingCriko2.jpg'

export function TopBar(){
    return(
        <>
          <div className='tp-container'>
            <h1 className='tp-logo'>StreamPlus</h1>
            <div className='tp-searchbar'></div>
            <div className='tp-user'>
                <p className='tp-user-username'>ElJairo</p>
                <img className='tp-user-img' src={pic} alt='profpic'/>
            </div>
          </div>
        </>
    )
}