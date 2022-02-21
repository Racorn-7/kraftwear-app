import React, { useState, useContext } from 'react'
import NewDesignContext from '../../Context/NewDesignContext';
import PageContext from '../../Context/PageContext';

const GarmentColorPicker = (props) => {
  const { garmentColorID, setGarmentColorID } = useContext(NewDesignContext);

  const precomposeColors = (colors) => {
    let colorButtons = [];
    for (let i = 0; i < colors.length; i++) {
      colorButtons.push(
        <li key={colors[i].id} id={colors[i].id}
          onClick={e=>{
            e.preventDefault();
            setGarmentColorID(colors[i].color);            
            setGarmentColorID(colors[i].color);            
          }}
          style={{
            transform: (colors[i].color === garmentColorID) ? "scale(1.5,1.5)" : "none",
            backgroundColor: colors[i].color,
            border: ( colors[i].stroke ) ? `1px solid ${colors[i].stroke}` : "none",
            cursor: "pointer"
          }}>
        </li>
      )
    }
    return colorButtons;
  }

  return (
    <div className={props.className}>
      <label>Garment color</label>

      <ul className="colorList">
        {precomposeColors(props.colors)}
      </ul>

    </div>
  )
}

export default GarmentColorPicker
