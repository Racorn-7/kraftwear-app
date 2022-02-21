/**
 * Functions for the live DB
 */
const SERVER_URL = 'http://localhost:5000/';

/**
 * DESIGNS
 */
//get designs from database for user
export function fetchOwnDesigns(userToken, setDesigns) {
  console.log("fetching designs..");

  fetch(`${SERVER_URL}api/designs/own`, {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'auth-token': userToken
    },
    body: JSON.stringify({
    })
  }).then(res => res.json())
    .then(res => {
      console.log("authorised access to designs");
      //TODO
      //console.log(res);
      setDesigns(res);
    })
    .catch(err =>
      console.log(err)
    )
}
//get art-designs from database for user
export function fetchArtDesigns(userToken, setArtDesigns) {
  console.log("fetching art designs..");

  fetch(`${SERVER_URL}api/designs/art`, {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'auth-token': userToken
    },
    body: JSON.stringify({
    })
  }).then(res => res.json())
    .then(res => {
      console.log("authorised access to art designs");
      //console.log(res);
      setArtDesigns(res);
    })
    .catch(err =>
      console.log(err)
    )
}
//delete design with given id
export function deleteDesign(userToken, designID, setDesigns, setMessage) {
  //start the com with server
  fetch(`${SERVER_URL}api/designs/delete`, {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'auth-token': userToken
    },
    body: JSON.stringify({ designID: designID })
  }).then(res => res.json())
    .then(res => {
      if (res.error) setMessage(res.error);
      else setDesigns(res);
    })
    .catch(err =>
      console.log(err)
    )
}
//duplicate design with given id
export function duplicateDesign(userToken, designID, duplicateName, setDesigns, setShowConfirmation, setMessage) {
  //start the com with server
  fetch(`${SERVER_URL}api/designs/duplicate`, {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'auth-token': userToken
    },
    body: JSON.stringify({ designID: designID, name: duplicateName })
  }).then(res => res.json())
    .then(res => {
      if (res.error) setMessage(res.error);
      else {
        setShowConfirmation(null);
        setDesigns(res);
      }
    })
    .catch(err =>
      console.log(err)
    )
}
//save design into db
export function updateDesign(userToken, designID, designName, garmentColorID, garmentTypeName, filesArray, setDesignChanged, setMessage) {
  //save new design
  fetch('http://localhost:5000/api/designs/update', {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json',
      'auth-token': userToken
    },
    body: JSON.stringify({
      _id: designID,
      name: designName,
      garmentColor: garmentColorID,
      garmentTypeName: garmentTypeName,
      images: filesArray//.map(file=>file.name)
    })
  }).then(res => res.json())
    .then(res => {
      if (res.error) {
        console.log(res.error);

        setMessage(res.error);
      }
      else {
        console.log("design saved to DB", res);
        setDesignChanged(false);
      }
    })
    .catch(err => console.log(err));
  ;
}
//save design into db
export function saveNewDesign(userToken, designName, garmentColorID, garmentTypeName, filesArray, setDesignChanged, setMessage) {
  //save new design
  fetch('http://localhost:5000/api/designs/add', {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json',
      'auth-token': userToken
    },
    body: JSON.stringify({
      message: "hi from client",
      name: designName,
      details: "details here...",
      garmentColor: garmentColorID,
      garmentTypeName: garmentTypeName,
      images: filesArray//.map(file=>file.name)
    })
  }).then(res => res.json())
    .then(res => {
      console.log("design saved to DB", res);
      setDesignChanged(false);
    })
    .catch(err => setMessage(err));
}

/**
 * ORDERS
 */
//get orders from database for user
export function fetchOrders(userToken, setOrders) {
  console.log("fetching orders..");

  fetch(`${SERVER_URL}api/orders/all`, {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'auth-token': userToken
    },
    body: JSON.stringify({
    })
  }).then(res => res.json())
    .then(res => {
      console.log("authorised access to orders");
      setOrders(res);
      //return { success: res }
    })
    .catch(err => {
      return { error: err }
    })
}

/**
 * CART
 */
//get cart
export function fetchCart(userToken, setCart) {
  console.log("fetching cart..");

  fetch(`${SERVER_URL}api/cart/get`, {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'auth-token': userToken
    },
    body: JSON.stringify({
    })
  }).then(res => res.json())
    .then(res => {
      console.log("authorised access to cart");
      setCart(res);
      //console.log("cart: ", res);
    })
    .catch(err => {
      return { error: err }
    })
}
//add new productline to cart
export function addProductToCart(userToken, newProduct, setCart) {
  console.log("fetching cart..");

  fetch(`${SERVER_URL}api/cart/add`, {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'auth-token': userToken
    },
    body: JSON.stringify({
      newProduct: newProduct
    })
  }).then(res => res.json())
    .then(res => {
      console.log("authorised access to cart");
      console.log("response: ", res);

      if (res.error) {
        console.log(
          "The value " + res.error.cart.message.split("`")[1] + " is invalid!"
        );
        //TODO display error msg
      }
      else
        setCart(res);
    })
    .catch(err => {
      return { error: err }
    })
}

//remove item from cart
export function removeItemFromCart(userToken, productLineID, setCart) {
  console.log("removing product from cart..");

  fetch(`${SERVER_URL}api/cart/remove`, {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'auth-token': userToken
    },
    body: JSON.stringify({
      productLineID: productLineID
    })
  }).then(res => res.json())
    .then(res => {
      console.log("authorised access to cart");
      //console.log("response: ",res);

      if (res.error)
        console.log(res.error);//TODO display error msg
      else
        setCart(res);
    })
    .catch(err => {
      return { error: err }
    })
}

//TODO
//update cart
export function updateCart(userToken, productLineID, key, value, setCart) {
  console.log("updating cart..");

  fetch(`${SERVER_URL}api/cart/update`, {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'auth-token': userToken
    },
    body: JSON.stringify({
      productLineID: productLineID,
      key: key,
      value: value
    })
  }).then(res => res.json())
    .then(res => {
      console.log("authorised access to cart");
      //console.log("response: ",res);
      if (res.error)
        console.log(res.error);//TODO display error msg
      else {
        setCart(res);
        console.log("cart updated in DB!");
      }
    })
    .catch(err => {
      return { error: err }
    })
}

/**
 * STOCK
 */
export function fetchAvailableStock(userToken, setStock) {
  console.log("fetching stock..");

  fetch(`${SERVER_URL}api/stock/all`, {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'auth-token': userToken
    },
    body: JSON.stringify({
      //empty now
    })
  }).then(res => res.json())
    .then(res => {
      console.log("authorised access to stock..");

      if (res.error)
        console.log(res.error);//TODO display error msg
      else {
        //console.log(res);
        setStock(res);
      }
    })
    .catch(err => {
      return { error: err }
    })

}

/**
 * PAYMENT
 */
export function takePayment(userToken, paymentDetails, setTransactionState) {
  console.log("connection to payment transaction page..");

  fetch(`${SERVER_URL}api/payment/`, {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'auth-token': userToken,
      //'secCode': secCode
    },
    body: JSON.stringify({
      paymentDetails
    })
  }).then(res => res.json())
    .then(res => {
      console.log("authorised access to payment transaction page..");

      if (res.error) {
        console.log(res.error);
        setTransactionState(res.error);
      }
      else {
        //console.log(res.success);
        setTransactionState("Success");
      }
    })
    .catch(err => {
      setTransactionState("Failed");
      return { error: err }
    })

}




/*** TUBO's functions */

/**
 * PROFILE DETAILS
 */
//fetch name
//TODO merge profile.js and settings.js routes
export function fetchName(userToken, setName) {
  console.log("fetching name...");

  fetch(`${SERVER_URL}api/profile/name`, {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'auth-token': userToken
    },
    body: JSON.stringify({
    })
  }).then(res => res.json())
    .then(res => {
      console.log("authorised access to name");
      //TODO
      //console.log(res);
      setName(res.success);
    })
    .catch(err =>
      console.log(err)
    )
}
//fetch staff name
export function fetchStaffName(userToken, setName) {
  console.log("fetching name...");

  fetch(`${SERVER_URL}api/profile/staff-name`, {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'auth-token': userToken
    },
    body: JSON.stringify({
    })
  }).then(res => res.json())
    .then(res => {
      console.log("authorised access to name");
      //TODO
      //console.log(res);
      setName(res.success);
    })
    .catch(err =>
      console.log(err)
    )
}
//set user name
export function updateName(userToken, fname, lname, setUserName) {
  console.log("connecting to DB...");

  fetch(`${SERVER_URL}api/settings/name/set`, {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'auth-token': userToken,
    },
    body: JSON.stringify({
      fname: fname,
      lname: lname
    })
  }).then(res => res.json())
    .then(res => {
      if (res.error) console.log(res.error);
      else setUserName(res.success);
    })
    .catch(err => {
      console.log(err);
    })
}

//get user's email
export function fetchEmail(userToken, setEmail) {
  console.log("fetching email...");

  fetch(`${SERVER_URL}api/settings/email`, {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'auth-token': userToken,
    },
    body: JSON.stringify({

    })
  }).then(res => res.json())
    .then(res => {
      if (res.error) console.log(res.error);
      else {
        console.log("authorised access to email");
        setEmail(res.success);
      }
    })
    .catch(err => {
      console.log(err);
    })

}
//set user's email
export function updateEmail(userToken, newEmail, setEmail) {
  console.log("fetching email...");

  fetch(`${SERVER_URL}api/settings/email/set`, {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'auth-token': userToken,
    },
    body: JSON.stringify({
      email: newEmail
    })
  }).then(res => res.json())
    .then(res => {
      if (res.error) console.log(res.error);
      else {
        console.log("authorised access email");
        setEmail(res.success);
      }
    })
    .catch(err => {
      return { error: err }
    })

}

//fetch user's address(es)
export function fetchAddress(userToken, setAddress) {
  console.log("fetching Addresses...");

  fetch(`${SERVER_URL}api/settings/address/get`, {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'auth-token': userToken,
    },
    body: JSON.stringify({

    })
  }).then(res => res.json())
    .then(res => {
      console.log("authorised access address");
      setAddress(res.success)
    })
    .catch(err => {
      setAddress("Failed");
      return { error: err }
    })

}
//add new address to user's addresses array
export function AddAddress(userToken, addName, addLineOne, city, postcode, isBilling, isDeliver) {
  console.log("connectiing to DB...");

  fetch(`${SERVER_URL}api/settings/address/add`, {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'auth-token': userToken,
    },
    body: JSON.stringify({
      addName: addName,
      addLineOne: addLineOne,
      city: city,
      postcode: postcode,
      isBilling: isBilling,
      isDeliver: isDeliver
    })
  }).then(res => res.json())
    .then(res => {
      if (res.error) console.log("Fail", res.error);
      else {
        console.log("Address added");
        console.log(res.success);
      }
    })
    .catch(err => {
      return { error: err }
    })

}

//delete given address
export function deleteAddress(userToken, id, setAddress) {
  console.log("cionnecting to DB...");

  fetch(`${SERVER_URL}api/settings/address/delete`, {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'auth-token': userToken,
    },
    body: JSON.stringify({
      addressID: id
    })
  }).then(res => res.json())
    .then(res => {
      if (res.error) console.log(res.error);
      else {
        console.log("address removed");
        setAddress(res.success)        
      }
    })
    .catch(err => {

      return { error: err }
    })

}


//fetch pm array
export function fetchPaymentMethod(userToken, setPayMethod) {
  console.log("fetching Pay methods...");

  fetch(`${SERVER_URL}api/settings/payment/get`, {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'auth-token': userToken,
      //'secCode': secCode
    },
    body: JSON.stringify({

    })
  }).then(res => res.json())
    .then(res => {
      if (res.error) console.log(res.error);
      else {
        console.log("authorised access pay methods");
        setPayMethod(res.success)
      }
    })
    .catch(err => {
      setPayMethod("Failed");
      return { error: err }
    })

}

//add new payment method to array
export function AddPaymentMethod(userToken, payMethodName, nameOnCard, cardNo, cardType, setPayMethods) {
  console.log("fetching Pay methods...");

  fetch(`${SERVER_URL}api/settings/payment/add`, {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'auth-token': userToken,
    },
    body: JSON.stringify({
      payMethodName: payMethodName,
      nameOnCard: nameOnCard,
      cardNo: cardNo,
      cardType: cardType
    })
  }).then(res => res.json())
    .then(res => {
      if (res.error) console.log(res.error);
      else {
        console.log("pay method added",res);
        //setPayMethod(res.success)
      }
    })
    .catch(err => {
      return { error: err }
    })

}

//delete given pm
export function deletePaymentMethod(userToken, id, setPayMethod) {
  console.log("connnectting to DB...");

  fetch(`${SERVER_URL}api/settings/payment/delete`, {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'auth-token': userToken,
    },
    body: JSON.stringify({
      pmID: id
    })
  }).then(res => res.json())
    .then(res => {
      if (res.error) console.log(res.error);
      else {
        console.log("authorised access pay methods");
        setPayMethod(res.success)
      }
    })
    .catch(err => {
      return { error: err }
    })

}
