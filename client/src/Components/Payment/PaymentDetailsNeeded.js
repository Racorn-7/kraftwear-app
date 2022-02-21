import React from 'react'
import NeedDetails from '../../img/icons/NeedDetails'

const PaymentDetailsNeeded = (props) => {
  return (
    <div className="PaymentPageMessage">
      <NeedDetails />
      <p>Looks like you don't have any {props.detailNeeded} stored yet.</p>
      <button onClick={props.goToProfile}>Add it in your profile settings</button>
      <button onClick={props.closePayment}>Back to Cart</button>
    </div>
  )
}

export default PaymentDetailsNeeded
