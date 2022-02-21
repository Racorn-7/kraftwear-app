import React, { useState, useContext } from 'react'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import '../../css/AddressContainer.css'
import '../Payment/Payment.css';
import MastercardIcon from "../../img/icons/MastercardIcon";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { purple } from '@material-ui/core/colors';
import VIcon from '../../img/icons/visa.png'
import DeleteIcon from '../../img/icons/DeleteIcon';
import UserContext from '../../Context/UserContext';
import {deletePaymentMethod} from '../../Functions/liveDBfunctions'

const useStyles = makeStyles((theme) => ({
    root: {
        cursor: 'pointer',
        color: '#ADB1BC',
        top: '-5%',
    },
}));


const chooseIcon = (payType) => {
    switch (payType) {
        case 'visa':
            return <img src={VIcon} alt='visa' height='32' />
        case 'pay-pal':
            return <strong>Paypal</strong>;
    }
}


const CustomSwitch = withStyles({
    switchBase: {
        color: 'white',
        '&$checked': {
            color: 'white',
        },
        '&$checked + $track': {
            backgroundColor: '#2A6EF3',
        },
    },
    checked: {},
    track: {},
})(Switch);

const PayCard = (props) => {
    const classes = useStyles();
    const [primaryPayment, setPrimaryPayment] = useState(true);
    const lastFour = props.payInfo.cardNo.substr(props.payInfo.cardNo.length - 4);
    const { user, setPayMethods } = useContext(UserContext);

    const handleSwitch = () => {
        setPrimaryPayment(!primaryPayment)
    };

    const handleDelete = () => {
        deletePaymentMethod(user, props.payInfo._id, setPayMethods);
    }

    return (
        <li className='list-item'>
            <div className="PaymentBox">
                <h3>{props.payInfo.payMethodName}</h3>
                <div>
                    <div>
                        <h4>{props.payInfo.nameOnCard}</h4>
                        <p>***</p>
                        <p>**** **** **** {lastFour}</p>
                    </div>
                    <div className="AddressBoxButtons">
                        <button onClick={handleDelete}>
                            <DeleteIcon />
                        </button>
                        <p><MastercardIcon /></p>
                    </div>

                </div>
            </div>
        </li>
    )

};

export default PayCard

/*
*<div className='cardHolder-Name'>
                        {props.payInfo.name}
                    </div>
                    <div className='cardHolder-CVC'>
                        * * *
                    </div>
                    <div className='cardHolder-account'>
                        {props.payInfo.accNo}
                    </div>
                    <div className='cardHolder-twelve'>
                        **** **** ****
                    </div>
                    <div className='cardHolder-lastfour'>
                        {props.payInfo.accLastfour}
                    </div>
* */