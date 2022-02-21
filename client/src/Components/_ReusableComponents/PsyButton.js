import React, { useContext } from 'react'
import Loader from './Loader'
import LoginContext from '../../Context/LoginContext'
import '../../css/PsyButton.css'

/**
* Magic Psyhic Trance button
*/
const PsyButton = (props) => {
  //deconstructing context variables
  const { isLoading } = useContext(LoginContext);

  return (
    <button
      className={`${props.className || ""} PsyButton`}
      onClick={props.onClick}
      disabled={props.disabled || isLoading}
    >
      {
        (isLoading) ?
          <Loader scale={3} duration="2"/> :
          props.text || "Go"
      }
    </button>
  )
}

export default PsyButton