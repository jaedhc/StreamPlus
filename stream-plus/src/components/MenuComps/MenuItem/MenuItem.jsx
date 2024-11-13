import './MenuItem.css'

export function MenuItem({itemname, icono, selected, handlerSelect}){
    
  const isSelected = () => {
    if(selected===itemname){
        return "mi-container-selected"
    } else {
      return "mi-container"
    }
  }

  const onSelect = () => {
    handlerSelect(itemname);
  }

  return(
        <>
          <div class={isSelected()} onClick={onSelect}>
            <img className='mi-icon' src={icono} alt={itemname}/>
            <h2 className='mi-itemname'>{itemname}</h2>
          </div>
        </>
    )
}
