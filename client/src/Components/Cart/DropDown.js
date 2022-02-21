import React, { useEffect, useState, useRef } from 'react'

const DropDown = (props) => {
  const node = useRef();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  //hide dropdown if clicked outside of dropdown container
  const handleClickOutside = e => {
    if (node.current.contains(e.target)) {
      return;
    }
    setDropdownOpen(false);
  };

  //any time dropdown opens/closes attach/clear click-eventlistener
  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  //pre render dropdown list
  const dropdown = (options) => {
    return (options) ?
      options.map(option => {
        return (
          <li
            key={option._id || option}
            onClick={() => {
              props.onChange(option._id || option, props.keyString);
              setDropdownOpen(false);
            }
            }>{option.name || option}</li>
        )
      })
      : null
  };

  return (
    <div className={`${props.className} DropDown`} ref={node}>
      {
          (props.options.length > 1) ?
          <a onClick={(e) => setDropdownOpen(!dropdownOpen)}>
            {(props.selected) ? props.selected.name || props.selected : null}
          </a>
          :
          <p>{(props.selected) ? props.selected.name || props.selected : null}</p>
      }
      <ul style={(dropdownOpen) ? { display: "block" } : null}>
        {dropdown(props.options)}
      </ul>
    </div>
  )
}

export default DropDown
