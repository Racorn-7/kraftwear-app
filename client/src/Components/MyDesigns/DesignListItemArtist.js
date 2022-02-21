import React from 'react'
import '../../css/ListItem.css'
import ListButton from '../_ReusableComponents/ListButton'
import Logo from '../_ReusableComponents/Logo'
//TODO: import icon images (svg ==> jsx)

const DesignListItemArtist = (props) => {
  //TODO: implement functions for buttons

  return (
    <li className="ListItem">
      <div className="ListItemLeft">
        <img src="" alt="." />
      </div>

      <div className="ListItemMid">
        <p>{props.design.name || "Design"}</p>
      </div>

      <div className="ListItemRight">
        <p>{props.design.created}</p>
        <ListButton
          text="remove"
          icon={<Logo />/* replace */}
          onClick={() => console.log("clicked remove")} />
        <ListButton
          text="use"
          icon={<Logo />/* replace */}
          onClick={() => console.log("clicked use")} />
      </div>
    </li>
  )
}

export default DesignListItemArtist