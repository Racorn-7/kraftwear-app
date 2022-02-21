import React from 'react'

const DesignerImageLayer = (props) => {
  return (
    <div className="imageLayer">
      <div className="card imgLayerDeets">
        <button className="imgVisibilityToggle"
          onClick={(e) => {
            e.preventDefault();
            console.log("visibility toggled");
          }}
        ></button>
        {/*
        <input
          type="text"
          name="imgLayerName"
          defaultValue={props.fileName}
          onChange={console.log("TODO: store this in state")}
          className="imgLayerName"
        />
        */}
        <p>{props.fileName}</p>
        <ul className="imgTransformButtons">
          <li>o</li>
          <li>o</li>
          <li>o</li>
          <li>o</li>
        </ul>
      </div>
      <button className="card layerMoveBtn"
        onClick={(e) => {
          e.preventDefault();
          console.log("move layer up");
        }}
      >^</button>
      <button className="card layerMoveBtn"
        onClick={(e) => {
          e.preventDefault();
          console.log("move layer up");
        }}
      ><span>^</span></button>
    </div>
  )
}

export default DesignerImageLayer
