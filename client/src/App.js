import React, { useState, useEffect } from 'react'
import Onboarding from './Components/Onboarding/Onboarding'
import AppContent from './Components/AppContent'
import UserContext from './Context/UserContext'
import PageContext from './Context/PageContext'
import {
  fetchOrders,
  fetchOwnDesigns,
  fetchArtDesigns,
  fetchCart,
  fetchAvailableStock,
  fetchName,
  fetchStaffName,
  fetchEmail,
  fetchAddress,
  fetchPaymentMethod
} from './Functions/liveDBfunctions'
import './css/App.css';
import StaffAppContent from './Components/StaffAppContent'

/**
* Start here!
* The main component that is rendered into the DOM tree
*/
function App() {
  const [user, setUser] = useState(localStorage.getItem("kraftWearUser") || null);
  const [staff, setStaff] = useState(localStorage.getItem("kraftWearStaff") || null);
  const [userName, setUserName] = useState("loading...");
  const [isMenuOpen, setMenuOpen] = useState(null);
  const [headerTitle, setHeaderTitle] = useState(null)
  const [headerSubTitle, setHeaderSubTitle] = useState(null);
  const [designs, setDesigns] = useState([]);
  const [activeDesignID, setActiveDesignID] = useState(null);
  const [artDesigns, setArtDesigns] = useState([]);
  const [orders, setOrders] = useState(null);
  const [cart, setCart] = useState({ id: "", items: [], status: "Empty" });
  const [stock, setStock] = useState({});
  const [jobs, setJobs] = useState([]);
  const [staffName, setStaffName] = useState("operator");
  //TUBO's
  const [email, setEmail] = useState("loading...");
  const [address, setAddress] = useState([]);
  const [payMethods, setPayMethods] = useState([]);

  // if user/staff item is stored in localstorage, that means the user is logged in
  useEffect(() => {
    let userLC = localStorage.getItem("kraftWearUser")
    let staffLC = localStorage.getItem("kraftWearStaff")
    if (userLC){ 
      //to make sure there is no user and staff loggid in at same time
      localStorage.removeItem("kraftWearStaff");
      setUser(userLC);
    }
    else if (staffLC) 
      setStaff(staffLC);

    return () => {
      //console.log("1 cleanup");
    }
  }, []);//empty dependecy array means this only runs once at refresh

  // update user item in localStorage when login status changes
  useEffect(() => {
    if (user) {
      //user just been created, let's store it in Localstorage
      if (!localStorage.getItem("kraftWearUser"))
        localStorage.setItem("kraftWearUser", user)

      fetchName(user, setUserName);
      fetchEmail(user, setEmail);
      fetchAddress(user, setAddress);
      fetchPaymentMethod(user, setPayMethods);

      fetchOrders(user, setOrders);
      fetchAvailableStock(user, setStock);
      fetchOwnDesigns(user, setDesigns);
      fetchArtDesigns(user, setArtDesigns);
      fetchCart(user, setCart);
    }
    else if (staff) {
      //TODO
      if (!localStorage.getItem("kraftWearStaff"))
        localStorage.setItem("kraftWearStaff", staff);

      fetchStaffName(staff, setStaffName);
    }
    else {
      ["kraftWearUser", "isMenuOpen", "kraftWearStaff"].forEach(
        key => localStorage.removeItem(key)
      )
    }
    return () => {
      //cleanup
    }
  }, [user,staff]);

  return (
    <UserContext.Provider
      value={{
        user, setUser,
        staff, setStaff,
        staffName, setStaffName,
        userName, setUserName,
        email, setEmail,
        address, setAddress,
        payMethods, setPayMethods
      }}>
      <PageContext.Provider value={{
        isMenuOpen, setMenuOpen,
        headerTitle, setHeaderTitle,
        headerSubTitle, setHeaderSubTitle,
        designs, setDesigns,
        artDesigns, setArtDesigns,
        orders, setOrders,
        activeDesignID, setActiveDesignID,
        cart, setCart,
        stock, setStock,
        jobs, setJobs
      }}>
        <div className="App">
          {(user) ?
            <AppContent /> :
            (staff) ?
              <StaffAppContent />
              :
              <Onboarding />
          }
        </div>
      </PageContext.Provider>
    </UserContext.Provider >
  )
}

export default App
