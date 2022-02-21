import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import PageContext from '../../Context/PageContext';
/**
* MENUITEM component
* used in Menu component
*/
const MenuItem = (props) => {
  const { 
    setMenuOpen,
    setActiveDesignID,
  } = useContext(PageContext)

  // TOGGLE ACTIVE MENUITEM 
  const activateMenuItem = () => {
    if (window.location.pathname !== props.to) {
      setActiveDesignID(null);
      setMenuOpen(false);
    }
  }

  return (
    <li className={(window.location.pathname === props.to) ? "activeMenuItem":null}>
      <Link to={props.to} onClick={activateMenuItem}>
        {props.text}
      </Link>
    </li>
  )
}

export default MenuItem
