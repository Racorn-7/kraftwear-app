import React, { useState, useContext } from 'react'
import './Cart.css'
import PsyButton from '../_ReusableComponents/PsyButton'
import List from '../_ReusableComponents/List'
import Payment from '../Payment/Payment'
import ProductListItem from './ProductListItem'
import PageContext from '../../Context/PageContext'
import {
    removeItemFromCart,
} from '../../Functions/liveDBfunctions'
import UserContext from '../../Context/UserContext'
import DesignModalSelect from "../MyDesigns/DesignModalSelect";
/**
* 
*/
const Cart = (props) => {
    const [isPaymentInProgress, setIsPaymentInProgress] = useState(false);
    const {
        cart, setCart,
        stock
    } = useContext(PageContext);
    const { user } = useContext(UserContext);
    
    //TODO
    //filter through cart for design costs
    const designsToBuyArray = [];

    //precompose productLine list
    const productListItemArray =
        cart.items.map(
            (product, i) =>
                <ProductListItem
                    index={i + 1}
                    key={product._id}
                    product={product}
                    onDelete={() => deleteCartItem(product._id)}
                    stock={stock}
                />
        );

    //delete an item from cart with given id
    const deleteCartItem = (id) => {
        removeItemFromCart(user, id, setCart);
    }

    //place order button handler
    const placeOrder = () => {
        setIsPaymentInProgress(true);
    };

    //calculate total cost
    const calcTotal = () => {
        return (cart.items.length > 0) ?
            cart.items.map(item => item.productType.price * item.qtty).reduce(sum)
            : 0.00
    };

    //helper funtion to sum total cost
    const sum = (total, num) => {
        return total + num
    }

    return (
        <div className="Cart page">
            {
                (isPaymentInProgress) ?
                    <Payment cart={cart} total={calcTotal()} closePayment={() => setIsPaymentInProgress(false)} />
                    :
                    <>
                        <div className="CartTop">
                            {//two Lists here
                            }
                            <List
                                title="Products"
                                itemsArray={productListItemArray}
                                messageIfEmpty={"Your Cart is empty"} />
                            <List
                                title="Design Costs"
                                itemsArray={designsToBuyArray}
                                messageIfEmpty={"No designs to pay for"} />
                        </div>
                        <div className="CartMid">
                            <div className="CartSummary">
                                <p>TOTAL</p>
                                <p>{`£${calcTotal().toFixed(2)}`}</p>
                                {
                                    //(cart.items && cart.items !== []) ?
                                    (cart.items.length > 0) ?
                                        <PsyButton
                                            className="PlaceOrderBtn"
                                            text="Place Order"
                                            onClick={placeOrder}
                                        //disabled={true}
                                        />
                                        : null
                                }
                            </div>
                            <div className="CartButtons">
                                <DesignModalSelect />
                            </div>
                        </div>
                    </>
            }
        </div>
    )
}

export default Cart
