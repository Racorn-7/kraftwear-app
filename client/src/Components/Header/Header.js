import React, { useContext, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import PageContext from '../../Context/PageContext'
import './Header.css'
import CartIcon from './CartIcon'
import Logo from '../_ReusableComponents/Logo'
import AnimMenuIcon from './AnimMenuIcon'
import UserContext from '../../Context/UserContext'
import {
    fetchCart,
  } from '../../Functions/liveDBfunctions'

/**
* 
*/
const Header = (props) => {
    const {
        headerTitle, setHeaderTitle,
        headerSubTitle, setHeaderSubTitle,
        isMenuOpen, setMenuOpen,
        cart, setCart
    } = useContext(PageContext);
    const {user} = useContext(UserContext);    
    const history = useHistory();

    // whenever page location changes
    // -> update header titles (using context)
    useEffect(() => {       
        switch (window.location.pathname) {
            case "/":
                setHeaderTitle("Welcome to your dashboard")
                setHeaderSubTitle("Get your unique look now")
                break;
            case "/mydesigns":
                setHeaderTitle("My Designs")
                setHeaderSubTitle("Collection of all your own designs and designs saved from artists")
                break;
            case "/myorders":
                setHeaderTitle("My Orders")
                setHeaderSubTitle("Click on the name of an order to see more details")
                break;
            case "/designer":
                setHeaderTitle("Design editor")
                setHeaderSubTitle("Create your unique style in matter of minutes.")
                break;
            case "/settings":
                setHeaderTitle("Profile Settings")
                setHeaderSubTitle("Keep it up to date so you never miss anything!")
                break;
            case "/artbrowser":
                setHeaderTitle("Artist-made design browser")
                setHeaderSubTitle("Find your match. add it to your inventory. be unique.")
                break;
            case "/cart":
                setHeaderTitle("Shopping Cart")
                setHeaderSubTitle("You can collect your products here. no payment taken until you place your order.")
                break;
            case "/payment":
                setHeaderTitle("Payment Page")
                setHeaderSubTitle("Secure. Fast. Awesome.")
                break;
            case "/messages":
                setHeaderTitle("Messages")
                setHeaderSubTitle("Order 01234")
                break;
            case "/connectionerror":
                setHeaderTitle("Connection error")
                setHeaderSubTitle("Please call us for help")
                break;
            default:
                return
        }

        return () => {
            //cleanup
            //console.log("3 cleanup");
        }
    }, [window.location.pathname])

    return (
        <div className="Header">
            <AnimMenuIcon
                isMenuOpen={isMenuOpen}
                onClick={() => setMenuOpen(!isMenuOpen)}
            />
            <div className="HeaderTitles">
                <h1>{headerTitle}</h1>
                <h2>{headerSubTitle}</h2>
            </div>
            <div className="HeaderRight">
                <Link
                    to="/cart"
                    onClick={() => {
                        fetchCart(user, setCart);
                        setMenuOpen(false);
                        history.push('/cart');
                    }}
                >
                    <CartIcon className="CartIcon" />
                </Link>
                <Logo />
            </div>
        </div>
    )
}

export default Header
