import React, { useContext, useEffect, useState } from 'react'
import List from '../_ReusableComponents/List';
import './MyOrders.css'
import OrderListItem from './OrderListItem';
import PageContext from '../../Context/PageContext';
import {
    fetchOrders,
  } from '../../Functions/liveDBfunctions'
import UserContext from '../../Context/UserContext';
/**
* 
*/
const MyOrders = (props) => {
    const { 
        orders, setOrders,
    } = useContext(PageContext);
    const {user} = useContext(UserContext);
    const [onGoingOrders, setOnGoingOrders] = useState([]);
    const [pastOrders, setPastOrders] = useState([]);
    
    //fetch orders on component mount
    useEffect(() => {     
        fetchOrders(user, setOrders);
        return () => {
            //
        }
    }, [])
    
    //every time orders array changes render it into two component arrays
    useEffect(() => {
        let OGO, PO = [];
        [OGO, PO] =
            (orders) ?
                orders.reduce((splitArray, order) => {
                    splitArray[(order.status !== "Completed") ? 0 : 1].push(
                        <OrderListItem
                            order={order}
                            key={order._id}
                        />
                    );
                    return splitArray;
                }, [[], []])
                : [];
        setOnGoingOrders(OGO);
        setPastOrders(PO);
        return () => {
            //cleanup
        }
    }, [orders]);

    const noOrders = (
        <p>No orders</p>
    )

    return (
        <div className="MyOrders page">
            <div className="OrdersContainer">
                <List
                    title="Ongoing orders" subtitle="All your ongoing orders"
                    itemsArray={onGoingOrders || []}
                    messageIfEmpty={noOrders} />
                <List
                    title="Past orders" subtitle="History of completed orders"
                    itemsArray={pastOrders || []}
                    messageIfEmpty="No past orders" />
            </div>
            <div className="hangerFooter"></div>
        </div>
    )
}

export default MyOrders
