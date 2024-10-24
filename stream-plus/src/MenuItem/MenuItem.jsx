import './MenuItem.css'

export function MenuItem({itemname}){
    return(
        <>
          <div class="mi-container">
            <h3 className='mi-itemname'>{itemname}</h3>
          </div>
        </>
    )
}
