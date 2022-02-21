import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import '../../css/ListItem.css'
import ListButton from '../_ReusableComponents/ListButton'
import PageContext from '../../Context/PageContext';
import UserContext from '../../Context/UserContext';
import { deleteDesign, duplicateDesign } from '../../Functions/liveDBfunctions';
//TODO: import icon images (svg ==> jsx)

const DesignListItem = (props) => {
  const {
    designs, setDesigns,
    activeDesignID, setActiveDesignID } = useContext(PageContext);
  const { user } = useContext(UserContext);
  const [showConfirmation, setShowConfirmation] = useState(null);
  const [duplicateName, setDuplicateName] = useState(props.design.name + " copy");
  const [message, setMessage] = useState(null);
  let history = useHistory();

  //TODO: implement functions for buttons

  const handleDeleteClick = () => {
    deleteDesign(user, props.design._id, setDesigns, setMessage)
  }

  const handleDuplicateClick = () => {
    duplicateDesign(
      user,
      props.design._id,
      duplicateName,
      setDesigns,
      setShowConfirmation,
      setMessage
    )
  }
  //open design editor (designer) to edit design with given id
  const editDesign = (e, designID) => {
    e.preventDefault();
    setActiveDesignID(designID);
    history.push('/designer');
  }

  const clickUseDesign = () => {
    console.log("TODO clicked use");
    console.log("preparing the following object to be sent for cart..");
    const productLineDetails = {
      product: props.design.garmentTypeName,//get product from DB with this name
      material: "TODO",//select from list of options
      designID: props.design._id,
      price: 10.00,//get price from database?
      quantity: 1
    }
    console.log(productLineDetails);
    console.log("ask user to select material and set quantity (default 1)");
  }

  const preCompose = (showConfirmation) => {
    switch (showConfirmation) {
      case "delete":
        return (
          <>
            <p className="listItemMessage"> {message || "Careful! Once a design is deleted, it cannot be recovered."}</p>
            <button
              className="confirmActionBtn"
              onClick={() => handleDeleteClick()}
            >Delete Permanently
            </button>
            <button
              className="cancelActionBtn"
              onClick={() => {
                setShowConfirmation(false);
              }}
            >Cancel
            </button>
          </>
        )
      case "duplicate":
        return (
          <>
            <p>Name: </p>
            <input
              className="duplicateName"
              type="text"
              defaultValue={`${props.design.name} copy`}
              onChange={e => setDuplicateName(e.target.value)}
            />
            <button
              className="confirmActionBtn"
              onClick={() => handleDuplicateClick()}
            >Create Duplicate
            </button>
            <button
              className="cancelActionBtn"
              onClick={() => {
                setShowConfirmation(null);
              }}
            >Cancel
            </button>
          </>
        )
      default:
        return (
          <>
            <p>{(props.design.created).slice(0, 10)}</p>
            <ListButton
              text="edit"
              icon="edit"
              onClick={e => editDesign(e, props.design._id)} />
            <ListButton
              text="duplicate"
              icon="duplicate"
              onClick={() => setShowConfirmation("duplicate")} />
            <ListButton
              text="delete"
              icon="delete"
              onClick={() => setShowConfirmation("delete")} />
            {/*
            <ListButton
              text="use"
              icon="use"
              onClick={() => clickUseDesign()} />
            */}
          </>
        )
    }
  }

  return (
    <li className="ListItem">
      <div className="ListItemLeft">
        <img src="" alt="." />
      </div>

      <div className="ListItemMid">
        <p>{props.design.name || "Design"}</p>
      </div>

      <div className="ListItemRight">
        {preCompose(showConfirmation)}
      </div>
    </li>
  )
}

export default DesignListItem
