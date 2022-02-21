import React, { useContext, useState } from 'react'

const ProductLines = (props) => {

  //precompose list of productLines
  const preCompose = props.productLines.map((product, i) =>
    <li key={`productLine_${product._id}`}>
      <div className="ListItemLeft">{i+1}</div>
      <div className="ListItemMid">{product.productLineID}</div>
      <div className="ListItemRight">

        <div className="plDesignName">
          <button onClick={()=>{
            if (product.design){
              props.fetchDesign(product.design);
            }
          }}>Design Files</button>
        </div>

        <div className="plType"><p>{(product.produtType) ? product.produtType.name : ""}</p></div>
        <div className="plColor"><p>{`Color: ${product.color}`}</p></div>
        <div className="plSize"><p>{`Size: ${product.size}`}</p></div>
        <div className="plMaterial"><p>{`Garment: ${product.garmentType}`}</p></div>
        <div className="plUnitPrice"><p>£ {product.productType.price} each</p></div>
        <div className="plQuantity"><p>x {product.qtty}</p></div>
      </div>
    </li>)



  return (
    <ul className="ProductLines" style={(props.open) ? null :  {display: "none"}}>
      {preCompose}
    </ul>
  )
}

export default ProductLines
