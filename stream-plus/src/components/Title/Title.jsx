import './Title.css'

export function Title({title, icon}){
    return(
        <div className='tl-container'>
            <h2 className='tl-container-title'>{title}</h2>
            <img className='tl-container-img' src={icon} alt={title}/>
        </div>
    )
}