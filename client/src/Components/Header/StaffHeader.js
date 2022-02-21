import React, { useContext, useEffect } from 'react'
import PageContext from '../../Context/PageContext'
import './Header.css'
import Logo from '../_ReusableComponents/Logo'
import AnimMenuIcon from './AnimMenuIcon'

/**
* 
*/
const Header = (props) => {
    const {
        headerTitle, setHeaderTitle,
        headerSubTitle, setHeaderSubTitle,
        isMenuOpen, setMenuOpen,
    } = useContext(PageContext);

    // whenever location changes
    // -> update header titles (using context)
    useEffect(() => {
        switch (window.location.pathname) {
            case "/":
                setHeaderTitle("Welcome to your dashboard")
                setHeaderSubTitle("All your job info in one place")
                break;
            case "/myjobs":
                setHeaderTitle("My Jobs")
                setHeaderSubTitle("All that's assigned to you")
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
                <Logo />
            </div>
        </div>
    )
}

export default Header
