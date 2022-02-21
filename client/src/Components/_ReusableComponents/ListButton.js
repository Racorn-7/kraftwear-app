import React, { useReducer } from 'react'
import DeleteIcon from '../../img/icons/DeleteIcon'
import DuplicateIcon from '../../img/icons/DuplicateIcon'
import EditIcon from '../../img/icons/EditIcon'
import UsedesignIcon from '../../img/icons/UsedesignIcon'

function selectIcon(iconName) {
  switch(iconName){
    case "delete":
      return <DeleteIcon />
    case "duplicate":
      return <DuplicateIcon />
    case "edit":
      return <EditIcon />
    case "use":
      return <UsedesignIcon />
    default:
      return
  }
}

const ListButton = (props) => {
  //const [count, dispatch] = useReducer(reducer, 0);

  return (
    <button onClick={props.onClick}>
      <p>{props.text}</p>
      {selectIcon(props.icon)}
    </button>

  )
}

export default ListButton
