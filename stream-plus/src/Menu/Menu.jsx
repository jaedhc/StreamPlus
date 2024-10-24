import './Menu.css'
import { MenuItem } from '../MenuItem/MenuItem'

export function Menu(){
    return(
        <>
            <div className='mh-container'>
                <MenuItem itemname="Inicio"/>
                <MenuItem itemname="Suscripciones"/>
                <MenuItem itemname="Subir video"/>
            </div>
        </>
    )
}
