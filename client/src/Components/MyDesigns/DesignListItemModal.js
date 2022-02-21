import React from 'react'
import '../../css/ListItem.css'
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const DesignListItemModal = (props) => {

  return (
    <li className="ListItem">
      <div className="ListItemLeft">
        <img src="" alt="." />
      </div>

      <div className="ListItemMid">
        <p>{props.design.name || "Design"}</p>
      </div>

      <div className="ListItemRight">
        <FormControlLabel
          control={<Radio color="primary" />}
          value={props.keyVal}
          labelPlacement="start"
      />
      </div>
    </li>
  )
}

export default DesignListItemModal
