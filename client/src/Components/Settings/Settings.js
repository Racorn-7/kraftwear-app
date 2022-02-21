import React, { useContext } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import '../../css/AddressContainer.css'
import AddressBox from "../_ReusableComponents/AddressBoxSettngs";
import AddButton from "../_ReusableComponents/AddButtonSettings";
import NameSettingInput from "../_ReusableComponents/NameSettingInput";
import EmailSettingInput from "../_ReusableComponents/EmailSettingInput";
import PayCard from "../_ReusableComponents/PaymentCard";
import AddPaymentM from "../_ReusableComponents/AddPaymentM";
import UserContext from "../../Context/UserContext";
import './Settings.css'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'inline',
        marginLeft: '15%',
        paddingTop: '5%',
        height: '9%',
        width: '9%',
    },
}));

const Settings = () => {
    const classes = useStyles();
    const { address, payMethods } = useContext(UserContext);

    return (
        <div className='Settings page'>
            <div className='genCont'>
                <h2>Profile details</h2>
                <NameSettingInput />
                <EmailSettingInput />
            </div>
            <div className='payCont'>
                <h2>Payment Methods</h2>
                <ul className='payList'>
                    {payMethods.map((value, index) => {
                        return <PayCard key={`PayCard_${index}`} payInfo={value} index={index} />
                    }
                    )}
                    <AddPaymentM />
                </ul>
            </div>
            <div className='addCont'>
                <h2>Address info</h2>
                <ul>
                    {address.map((value, index) => {
                        return <AddressBox key={`AddressBox_${index}`} address={value} index={index} />
                    }
                    )}
                    <AddButton />
                </ul>
            </div>
        </div>
    );
};

export default Settings;



