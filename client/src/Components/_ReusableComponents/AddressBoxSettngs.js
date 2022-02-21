import React, { useContext } from 'react'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { makeStyles } from "@material-ui/core/styles";
import '../../css/AddressContainer.css'
import EditModal from "../Settings/SettingModals/EditModal";
import UserContext from "../../Context/UserContext";
import DeleteIcon from '../../img/icons/DeleteIcon'
import { deleteAddress } from '../../Functions/liveDBfunctions'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'inline',
        marginLeft: '15%',
        paddingTop: '5%',
        height: '9%',
        width: '9%',
        cursor: 'pointer',
        color: '#ADB1BC',
    },
}));

const AddressBox = (props) => {
    const classes = useStyles();
    const { user, setAddress } = useContext(UserContext);

    const handleDelete = () => {
        console.log("add id: ", props.address._id);
        deleteAddress(user, props.address._id, setAddress);
    }

    return (
        <li>
            <div className="AddressBox">
                <div>
                    <h4 className="AddressTitle">{props.address.addName} </h4>
                    <ul className='AddressInfo'>
                        <li className='AddressInfoContent'>{props.address.addLineOne}</li>
                        <li className='AddressInfoContent'>{props.address.postCode}</li>
                        <li className='AddressInfoContent'>{props.address.city}</li>
                        <li className='AddressInfoContent'>{(props.address.billing) ? "Billing address" : null}</li>
                        <li className='AddressInfoContent'>{(props.address.deliver) ? "Delivery address" : null}</li>
                    </ul>
                </div>
                <div className="AddressBoxButtons">
                    <button onClick={handleDelete}>
                        <DeleteIcon />
                    </button>
                    <EditModal address={props.address} />
                </div>
            </div>
        </li>
    )

};

export default AddressBox