import React, {useContext} from 'react'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import {makeStyles} from "@material-ui/core/styles";
import '../../css/AddressContainer.css'
import UserContext from "../../Context/UserContext";
import EmailModal from "../Settings/SettingModals/EmailModal";


const useStyles = makeStyles((theme) => ({
    root: {
        cursor: 'pointer',
        color: '#ADB1BC',
        marginLeft: '55%',
        Top: '5%',
    },
}));

const EmailSettingInput = () =>{
    const { email } = useContext(UserContext);
    const classes = useStyles();

    return(
        <div className='AddressBoxInput'>
            <title>Name</title>
            <div className='centerBox'>
                <span className='SettingInput'>{email}</span>
            </div>
            <div className='boxIcon'>
                <EmailModal/>
            </div>
        </div>
    )
};

export default EmailSettingInput