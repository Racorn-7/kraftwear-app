import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../_ReusableComponents/Avatar'
import './Menu.css'
import AvatarImg from '../../img/avatarImg.png'
import AvatarImg_2x from '../../img/avatarImg@2x.png'
import MenuItem from './MenuItem'
import UserContext from '../../Context/UserContext'
import Logo from '../_ReusableComponents/Logo'
/**
* MENU component
* used in AppContent and StaffAppContent
*/
const Menu = (props) => {
    const { setUser, setStaff, userName } = useContext(UserContext);

    //precompose react component array
    const menuItemsArray = props.menuitems.map(item=>{
        return <MenuItem key={`menuItem${item.to}`} text={item.text} to={item.to} page={item.page} />
    })

    return (
        <nav className="Menu" style={props.style}>
            <div className="MenuTop">
                <Avatar src_1={AvatarImg} src_2={AvatarImg_2x} />
                <div className="ProfileTitle">
                    <h2>{userName}</h2>
                    <h3>Personal Acccount</h3>
                </div>
            </div>
            <ul className="MenuItems">
                {menuItemsArray}
            </ul>
            <div className="MenuFooter">
                <Logo className="smallLogoIcon" fill="white" />
                <Link
                    to="/" className="LogOutBtn"
                    onClick={() => { 
                        setUser(null);
                        setStaff(null);
                    }}
                >
                    <h3>Logout</h3>
                </Link>
            </div>
        </nav>
    )
}

export default Menu;
