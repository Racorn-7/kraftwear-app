import React, { useContext } from 'react'
import Menu from './Menu/Menu'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Header from './Header/Header'
import Home from './Home/Home'
import MyOrders from './MyOrders/MyOrders'
import MyDesigns from './MyDesigns/MyDesigns'
import Designer from './Designer/Designer'
import Settings from './Settings/Settings'
import Cart from './Cart/Cart'
import Artbrowser from './Artbrowser/Artbrowser'
import PageContext from '../Context/PageContext'
/**
* AppContent component
* Used in App component for customer users
*/
const AppContent = (props) => {
    const { isMenuOpen } = useContext(PageContext)

    const menuClosedStyle = {
        marginLeft: "-20em",
        transition: ".5s ease-in-out"
    }

    const menuitems= [
        {text: "Home", to: "/"},
        {text: "My Designs", to: "/mydesigns"},
        {text: "my orders", to: "/myorders"},
        {text: "new design", to: "/designer"},
        {text: "settings", to: "/settings"},
    ];

    return (
        <Router>
            <div className="AppContent">
                <Menu menuitems={menuitems} style={(!isMenuOpen) ? menuClosedStyle : null} />
                
                <div className="AppPages">
                    <Header />
                    <Switch>
                        <Route
                            path="/" exact
                            component={Home} />
                        <Route
                            path="/mydesigns"
                            component={MyDesigns} />
                        <Route
                            path="/myorders"
                            component={MyOrders} />
                        <Route
                            path="/designer"
                            component={Designer} />
                        <Route
                            path="/settings"
                            component={Settings} />
                        <Route
                            path="/cart"
                            component={Cart} />
                        <Route
                            path="/artbrowser"
                            component={Artbrowser} />
                        {/* catch invalid URL path's and redirect to login */}
                        <Route render={() => <Redirect to={{ pathname: "/" }} />} />
                    </Switch>
                </div>
            </div>
        </Router>
    )
}

export default AppContent
