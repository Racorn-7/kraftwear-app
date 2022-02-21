import React, { useContext, useEffect } from 'react'
import Menu from './Menu/Menu'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import StaffHeader from './Header/StaffHeader'
import Home from './Staff/Home/Home'
import MyJobs from './Staff/MyJobs/MyJobs'
import PageContext from '../Context/PageContext'
import UserContext from '../Context/UserContext'
import {
    fetchJobs,
  } from '../Functions/staffDBfunctions'
/**
* STAFF APPCONTENT component
* used in App component for staff users
*/
const StaffAppContent = (props) => {
    const {staff} = useContext(UserContext);
    const { isMenuOpen, jobs, setJobs } = useContext(PageContext);

    const menuClosedStyle = {
        marginLeft: "-20em",
        transition: ".5s ease-in-out"
    }

    //fetch jobs on component mount
    useEffect(() => {
        console.log("TODO fetch my jobs..");
        fetchJobs(staff, setJobs);
        return () => {
            //
        }
    }, [staff])

    //TESTING
    const staffMenuitems = [
        { text: "Home", to: "/" },
        { text: "my jobs", to: "/myjobs" },
        //{text: "settings", page: "settings", to: "/settings"},
    ];

    return (
        <Router>
            <div className="AppContent">
                <Menu menuitems={staffMenuitems} style={(!isMenuOpen) ? menuClosedStyle : null} />

                <div className="AppPages">
                    <StaffHeader />
                    <Switch>
                        <Route
                            path="/" exact
                            component={Home} />
                        <Route
                            path="/myjobs"
                            component={MyJobs} />
                        {/* catch invalid URL path's and redirect to login */}
                        <Route render={() => <Redirect to={{ pathname: "/" }} />} />
                    </Switch>
                </div>
            </div>
        </Router>
    )
}

export default StaffAppContent
