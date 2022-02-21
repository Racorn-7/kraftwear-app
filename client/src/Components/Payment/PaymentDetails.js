import React, { useState, useRef, useContext } from 'react'
import './Payment.css'
import MastercardIcon from '../../img/icons/MastercardIcon'
import VisaIcon from '../../img/icons/VisaIcon'
import DropDown from '../Cart/DropDown';
import {
  takePayment,
} from '../../Functions/liveDBfunctions'
import UserContext from '../../Context/UserContext';
import Loader from '../_ReusableComponents/Loader';
import { useHistory } from 'react-router-dom';

import Declined from '../../img/icons/Declined'
import Accepted from '../../img/icons/Accepted'

const PaymentDetails = (props) => {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const DELIVERY_COST_FLATRATE = 20;
  const secCode = useRef(null);
  const [showPayBtn, setShowPayBtn] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(
    {
      productLines: props.cart.items,
      productTotal: props.total,
      deliveryCost: DELIVERY_COST_FLATRATE,
      paidWith: props.paymentMethods[0].payMethodName,
      billingAddress: props.addressArray[0].addName,
      deliverTo: props.addressArray[0].addName,
      //TODO add secCode? securely? encrypted?
      secCode: null
    }
  );
  const [transactionState, setTransactionState] = useState(null);

  const selectedPM = props.paymentMethods.find(pm => pm.payMethodName === paymentDetails.paidWith);
  const availablePaymentMethods = props.paymentMethods.map(pm => pm.payMethodName);
  const availableDeliveryAddresses = props.addressArray.filter(ad => ad.deliver==true).map(address => address.addName);
  const availableBillingAddresses = props.addressArray.filter(ad => ad.billing==true).map(ad => ad.addName);

  //TODO
  //update payment details
  const updatePMdetails = (newValue, keyString) => {
    const { [keyString]: oldValue, ...rest } = paymentDetails;
    setPaymentDetails({ [keyString]: newValue, ...rest });
  }

  const payBtnClick = () => {
    console.log("Payment btn clicked");
    setTransactionState("In Progress");
    //timeout to mock delay in receiving payment confirmation
    setTimeout(() => {
      takePayment(user, paymentDetails, setTransactionState);
    }, 3000);
  }

  //redirect to different page
  const redirect = (slashTo) => {
    setTransactionState(null);//reset
    history.push(slashTo);
  }

  //logic to decide what payment subpage to show
  const preRender = () => {
    switch (transactionState) {
      case "In Progress":
        return (
          <div className="PaymentPageMessage">
            <Loader scale={2} stroke={"black"} />
            <p>Transaction in progress</p>
            <p>Do not leave or refresh this page!</p>
          </div>
        )

      case "Success":
        return (
          <div className="PaymentPageMessage">
            <Accepted />
            <h2>Order placed and payment recieved!</h2>
            <p>You can access your orders from the side menu or click on  the button below</p>
            <button onClick={() => redirect('/myorders')}>Go to orders</button>
          </div>
        )
      case "Failed":
        return (
          <div className="PaymentPageMessage">
            <Declined />
            <h2>Payment Failed!</h2>
            <p>There was a problem with the transaction.</p>
            <p>No payment was taken.</p>
            <div>
              <button onClick={() => { setTransactionState(null) }}>Try again</button>
              <button onClick={() => { console.log("TODO Display contact us page") }}>Contact Us</button>
            </div>
            <button onClick={() => redirect('/')}>Try again later</button>
          </div>
        )
      case "Declined":
        return (
          <div className="PaymentPageMessage">
            <Declined />
            <h2>Payment Declined!</h2>
            <p>Your payment was declined by the payment authority.</p>
            <p>No payment was taken. Please check the payment details or try a different method.</p>
            <div>
              <button onClick={() => { setTransactionState(null) }}>Try again</button>
              <button onClick={() => { console.log("TODO Display contact us page") }}>Contact Us</button>
            </div>
            <button onClick={() => redirect('/')}>Try again later</button>
          </div>
        )
      default:
        return (
          <div className="PaymentPage">
            <div className="PaymentTop">
              <div className="BankCard card">
                <div>
                  {
                    (selectedPM.cardType == "visa")?
                    <VisaIcon className="BankCardIcon"/>
                    :
                    < MastercardIcon className="BankCardIcon" />
                  }
                </div>
                <div className="BCnameLine">
                  <p>{selectedPM.payMethodName}</p>
                  <p>***</p>
                </div>
                <div>
                  <p>{selectedPM.nameOnCard}</p>
                </div>
                <div>
                  <p>**** **** **** {selectedPM.cardNo.slice(-4)}</p>
                </div>
              </div>
            </div>
            <div className="PaymentBottom">
              <div className="PaymentBotLeft">
                <div className="PaymentInput">
                  <p>Payment Method</p>
                  <DropDown
                    className="card"
                    key={"paymentMethodDropDown"}
                    selected={paymentDetails.paidWith}
                    keyString={"paidWith"}
                    options={availablePaymentMethods}
                    onChange={updatePMdetails}
                  />
                </div>
                <div className="PaymentInput">
                  <p>Security Code</p>
                  <input
                    ref={secCode}
                    className="card secCodeInput"
                    type="text"
                    name="secCode"
                    maxLength={3}
                    placeholder="000"
                    onChange={(e) => {
                      if (e.target.value.length == 3) {
                        setShowPayBtn(true);
                        updatePMdetails(e.target.value, "secCode");
                      }
                      else {
                        setShowPayBtn(false);
                        updatePMdetails(null, "secCode");
                      }
                    }}
                  />
                </div>
                <div className="PaymentInput">
                  <p>Deliver To</p>
                  <DropDown
                    className="card"
                    key={"deliveryAddressDropDown"}
                    selected={paymentDetails.deliverTo}
                    keyString={"deliverTo"}
                    options={availableDeliveryAddresses}
                    onChange={updatePMdetails}
                  />
                </div>
                <div className="PaymentInput">
                  <p>Billing Address</p>
                  <DropDown
                    className="card"
                    key={"billingAddressDropDown"}
                    selected={paymentDetails.billingAddress}
                    keyString={"billingAddress"}
                    options={availableBillingAddresses}
                    onChange={updatePMdetails}
                  />
                </div>
              </div>
              <div className="PaymentBotRight">
                <div className="PaymentSummary">
                  <div>
                    <p>Product cost</p>
                    <p>{`£${paymentDetails.productTotal.toFixed(2)}`}</p>
                  </div>
                  <div>
                    <p>Delivery cost</p>
                    <p>{paymentDetails.deliveryCost.toFixed(2)}</p>
                  </div>
                  <div>
                    <p>Total</p>
                    <p>{`£${(paymentDetails.productTotal + paymentDetails.deliveryCost).toFixed(2)}`}</p>
                  </div>
                </div>
                <div className="PaymentButtons">

                  {//only render if all fields are filled in
                    (showPayBtn) ?
                      <button
                        className="PayNowBtn"
                        onClick={() => payBtnClick()}
                      >Pay Now</button>
                      : <p>Please input card security code</p>
                  }
                  <button
                    className="PaymentBackBtn"
                    onClick={props.closePayment}
                  >Back</button>
                </div>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    preRender()
  )
}

export default PaymentDetails
