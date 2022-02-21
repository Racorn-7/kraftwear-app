import React, { useState, useRef, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import './Payment.css'
import PaymentDetails from './PaymentDetails';
import PaymentDetailsNeeded from './PaymentDetailsNeeded';
import UserContext from '../../Context/UserContext';

const Payment = (props) => {
  const history = useHistory();
  const { address, payMethods } = useContext(UserContext);

  console.log(payMethods);
  
  //TODO 
  //get this from user DB
  const paymentMethods = [
    {
      ref: "Main card",
      name: "John Doe",
      type: "master-card",
      sortCode: "12-34-56",
      accLastfour: 1234
    },
    {
      ref: "Secondary card",
      name: "Jane Doe",
      type: "visa",
      sortCode: "12-34-56",
      accLastfour: 3333
    },
  ];

  const goToProfile = () => {
    console.log("go to profile ..");
    props.closePayment()
    history.push('/settings');
  }

  return (

    //check if user has at least one payment method stored
    (paymentMethods.length < 1) ?
      <PaymentDetailsNeeded
        goToProfile={goToProfile}
        closePayment={props.closePayment}
        detailNeeded={"payment methods"}
      />
      :
      //check if user has at least one delivery address added
      (address.length < 1) ?
        <PaymentDetailsNeeded
          goToProfile={goToProfile}
          closePayment={props.closePayment}
          detailNeeded={"delivery address"}
        />
        :
        <PaymentDetails
          cart={props.cart} total={props.total} closePayment={props.closePayment}
          paymentMethods={payMethods} addressArray={address || []}
        />
  )
}

export default Payment
