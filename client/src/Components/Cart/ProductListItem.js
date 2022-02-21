import React, { useState, useContext, useEffect } from 'react'
import DropDown from './DropDown';
import PageContext from '../../Context/PageContext';
import UserContext from '../../Context/UserContext';
import {
  updateCart,
} from '../../Functions/liveDBfunctions'
import ConfirmDelete from './ConfirmDelete';


const ProductListItem = (props) => {
  const {
    designs, artDesigns,
    cart, setCart
  } = useContext(PageContext);
  const { user } = useContext(UserContext);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);


  //TODO confirm that artdesigns works!
  //costumers designs from 'mydesigns'
  const designOptions = [
    ...designs.map(design => {
      return { _id: design._id, name: design.name }
    }),
    ...artDesigns.map(design => design.name)
  ];

  //update product in Cart
  const updateProduct = (option, keyString) => {
    updateCart(user, props.product._id, keyString, option, setCart);
  }

  //delete product from Cart
  const handleDelete = (e) => {
    e.preventDefault();
    setConfirmDeleteVisible(true);
  }

  return (
    <li>
      <p>{props.index}</p>

      <div className="listItemDetails">
        <DropDown
          key={`${props.product._id}props.productType`}
          selected={props.product["productType"].name}
          keyString={"productType"}
          options={props.stock.productType || []}
          onChange={updateProduct}
        />
        <DropDown
          key={`${props.product._id}size`}
          selected={props.product["size"]}
          keyString={"size"}
          options={props.stock.size || []}
          onChange={updateProduct}
        />
        
        
        <DropDown
          key={`${props.product._id}design`}
          selected={
            designs.find(des => des._id == props.product["design"])
          }
          keyString={"design"}
          options={designOptions}
          onChange={updateProduct}
        />


        <DropDown
          key={`${props.product._id}garmentType`}
          selected={props.product["garmentType"]}
          keyString={"garmentType"}
          options={props.stock.garmentType || []}
          onChange={updateProduct}
        />
        <DropDown
          key={`${props.product._id}color`}
          selected={props.product["color"]}
          keyString={"color"}
          options={props.stock.color || []}
          onChange={updateProduct}
        />

        <p>{`£${props.product.productType.price.toFixed(2)}`}</p>

        <DropDown
          key={`${props.product._id}qtty`}
          selected={props.product["qtty"]}
          keyString={"qtty"}
          options={Array.from(new Array(50), (val, index) => index + 1)}
          onChange={updateProduct}
        />

        <p>{`£${
          (props.product.productType.price * props.product.qtty).toFixed(2)
          }`}</p>

        <a onClick={(e) => handleDelete(e)}>remove</a>
        {//confirm/cancel button for deletion
          (confirmDeleteVisible) &&
          <ConfirmDelete
            onConfirm={() => props.onDelete()}
            onCancel={() => setConfirmDeleteVisible(false)}
            visibilityToggle={confirmDeleteVisible}
          />
        }
      </div>
    </li>
  )
}

export default ProductListItem
