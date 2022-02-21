import React from 'react'
import './AnimMenuIcon.css'

const AnimMenuIcon = (props) => {
  return (
    <div
      className={(props.isMenuOpen) ? "MenuIcon open" : "MenuIcon"}
      onClick={props.onClick}
      style={
        (props.scale) ? { fontSize: `${props.scale}em` }
          : null
      }
          >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
    </div >
  )
}

export default AnimMenuIcon
