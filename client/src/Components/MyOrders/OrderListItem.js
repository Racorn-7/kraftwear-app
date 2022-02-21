import React, { useState } from 'react'
import '../../css/ListItem.css'
import ListButton from '../_ReusableComponents/ListButton'
import Logo from '../_ReusableComponents/Logo'
import ProductLines from '../_ReusableComponents/ProductLines'
//TODO: import icon images (svg ==> jsx)

const OrderListItem = (props) => {
  //TODO: implement functions for buttons
  const [productLinesVisible, setProductLinesVisible] = useState(false);
  const [messageBtnClicked, setMessageBtnClicked] = useState(false);

  //format time to 2 digits
  const addZero = (time) => {
    return (time < 10) ? "0" + time : time;
  }

  //get a displayable date format
  const formatDate = (date) => {
    var d = new Date(date);
    return (
      addZero(d.getHours()) +
      ":" +
      addZero(d.getMinutes()) +
      " " +
      d.getDate() +
      "/" +
      d.getMonth() +
      "/" +
      d.getFullYear()
    )
  }

  const clickMessageBtn = () => {
    setMessageBtnClicked(true);
    setTimeout(() => {
      setMessageBtnClicked(false);
    }, 2000);
  }

  return (
    <>
      <li className="ListItem">
        <div className="ListItemLeft">
          <img src="" alt="." />
        </div>

        <div className="ListItemMid"
          onClick={() => {
            setProductLinesVisible(!productLinesVisible)
          }}
        >
          <p>{props.order.name || "Design"}</p>
        </div>

        <div className="ListItemRight">
          <p className="itemCount">
            {`${props.order.productLines.length} item ${(props.order.productLines.length > 1) ? "s" : ""}`}
          </p>
          <p className="costDetails">
            {`Paid £${props.order.productTotal + props.order.deliveryCost} 
            in total, including £${props.order.deliveryCost} for delivery`}
          </p>

          <p className="dateDetail">{formatDate(props.order.placed)}</p>

          {//render on condition
            (false) ?
              <>
                <ListButton
                  text="edit"
                  icon={<Logo />/* replace */}
                  onClick={() => console.log("clicked edit")} />
              </> :
              null
          }
          {(!messageBtnClicked) ?
            <ListButton
              text={(props.order.status === "Completed") ? "Leave feedback" : "Message about order"}
              icon={<Logo />/* replace */}
              onClick={() => clickMessageBtn()} />
            : <p>Feature coming soon</p>
          }
          <p className="orderStatus">{props.order.status}</p>
        </div>
      </li>
      {/* TODO rename to OrderProductLines */}
      <ProductLines productLines={props.order.productLines} open={productLinesVisible} />
    </>
  )
}

export default OrderListItem
