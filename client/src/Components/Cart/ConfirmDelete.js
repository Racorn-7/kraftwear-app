import React, { useRef, useEffect } from 'react'

const ConfirmDelete = (props) => {
  const node = useRef();

  const handleClickOutside = e => {
    if (node.current.contains(e.target)) {
      return;
    }
    props.onCancel()
  };

  //any time dropdown opens/closes attach/clear click-eventlistener
  useEffect(() => {
    if (props.visibilityToggle) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [props.visibilityToggle]);


  return (
    <div className="confirmDelete" ref={node}>
      <button onClick={props.onConfirm}>del</button>
      <button onClick={props.onCancel}>x</button>
    </div>
  )
}

export default ConfirmDelete
